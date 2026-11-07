from __future__ import annotations

import importlib.util
import subprocess
import sys
import unittest
from argparse import Namespace
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "motion_budget.py"
SPEC = importlib.util.spec_from_file_location("motion_budget", MODULE_PATH)
assert SPEC and SPEC.loader
MOTION_BUDGET = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = MOTION_BUDGET
SPEC.loader.exec_module(MOTION_BUDGET)


def arguments(**overrides: object) -> Namespace:
    values: dict[str, object] = {
        "frames": 96,
        "display": (240, 240),
        "dpr": 1.0,
        "max_texture": 4096,
        "driver": "pointer",
        "time_control": "scrub",
        "parameter_space": "circular",
        "access": "auto",
        "background_owner": "page",
        "atlas_max_memory_mib": 192.0,
        "linear_video_min_frames": 180,
        "source": None,
        "cell": None,
        "scroll_pages": None,
        "frames_per_page": 24.0,
    }
    values.update(overrides)
    return Namespace(**values)


class MotionBudgetSelectionTests(unittest.TestCase):
    def test_cli_requires_explicit_background_owner(self) -> None:
        completed = subprocess.run(
            [
                sys.executable,
                str(MODULE_PATH),
                "--frames",
                "240",
                "--display",
                "1280x720",
                "--strict",
            ],
            capture_output=True,
            text=True,
        )

        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("--background-owner", completed.stderr)

    def test_small_random_sequence_selects_alpha_atlas(self) -> None:
        report = MOTION_BUDGET.build_report(arguments())

        self.assertEqual(report["delivery"]["selected"], "alpha-atlas")
        self.assertEqual(report["runtime"]["renderer"], "css-alpha-atlas")
        self.assertEqual(report["runtime"]["controller"], "frame-scrub")
        self.assertTrue(report["passes"])

    def test_large_circular_sequence_falls_back_to_chroma_video(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=48,
                display=(640, 640),
                parameter_space="circular",
            )
        )

        self.assertEqual(report["texture"]["columnsPerSheet"], 6)
        self.assertEqual(report["texture"]["rowsPerSheet"], 6)
        self.assertEqual(report["texture"]["framesPerSheet"], 36)
        self.assertEqual(report["texture"]["sheetCount"], 2)
        self.assertEqual(report["delivery"]["selected"], "chroma-video")
        self.assertIn(
            "atlas-budget-exceeded",
            report["delivery"]["reasonCodes"],
        )
        self.assertTrue(report["passes"])

    def test_large_linear_scroll_selects_chroma_video(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=551,
                display=(1536, 864),
                driver="scroll",
                parameter_space="linear",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "chroma-video")
        self.assertEqual(report["runtime"]["renderer"], "webgl-chroma-video")
        self.assertEqual(report["runtime"]["controller"], "frame-scrub")
        self.assertIn("long-linear-sequence", report["delivery"]["reasonCodes"])
        self.assertTrue(report["passes"])

    def test_two_dimensional_input_is_never_flattened_to_video(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=400,
                display=(900, 900),
                parameter_space="2d",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "alpha-atlas")
        self.assertIn(
            "two-dimensional-parameter-needs-discrete-frames",
            report["delivery"]["reasonCodes"],
        )
        self.assertTrue(
            any(
                "拆分参数轴" in failure and "用户确认" in failure
                for failure in report["failures"]
            )
        )
        self.assertFalse(report["passes"])

    def test_discrete_states_are_split_instead_of_flattened(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=400,
                display=(900, 900),
                driver="state",
                parameter_space="discrete",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "alpha-atlas")
        self.assertIn(
            "discrete-states-need-independent-assets",
            report["delivery"]["reasonCodes"],
        )
        self.assertFalse(report["passes"])

    def test_baked_scene_video_when_background_belongs_to_video(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=551,
                display=(1536, 864),
                driver="scroll",
                parameter_space="linear",
                background_owner="video",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "baked-video")
        self.assertEqual(report["runtime"]["renderer"], "baked-video")
        self.assertEqual(report["runtime"]["controller"], "frame-scrub")
        self.assertIn(
            "background-baked-into-video",
            report["delivery"]["reasonCodes"],
        )
        self.assertIn("long-linear-sequence", report["delivery"]["reasonCodes"])
        self.assertEqual(report["backgroundOwner"], "video")
        self.assertTrue(report["passes"])

    def test_scroll_segment_play_is_not_misclassified_as_scrub(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=240,
                display=(1280, 720),
                driver="scroll",
                time_control="segment-play",
                parameter_space="linear",
                background_owner="video",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "baked-video")
        self.assertEqual(report["runtime"]["controller"], "segment-playback")
        self.assertEqual(report["access"], "sequential")

    def test_cli_requires_explicit_time_control(self) -> None:
        completed = subprocess.run(
            [
                sys.executable,
                str(MODULE_PATH),
                "--frames",
                "240",
                "--display",
                "1280x720",
                "--background-owner",
                "video",
            ],
            capture_output=True,
            text=True,
        )

        self.assertNotEqual(completed.returncode, 0)
        self.assertIn("--time-control", completed.stderr)

    def test_baked_video_is_not_failed_by_atlas_budget(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=900,
                display=(900, 900),
                parameter_space="circular",
                background_owner="video",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "baked-video")
        self.assertTrue(report["passes"])

    def test_baked_video_rejects_flattened_two_dimensional_input(self) -> None:
        report = MOTION_BUDGET.build_report(
            arguments(
                frames=400,
                display=(900, 900),
                parameter_space="2d",
                background_owner="video",
            )
        )

        self.assertEqual(report["delivery"]["selected"], "baked-video")
        self.assertIn(
            "baked-video-needs-independent-clips",
            report["delivery"]["reasonCodes"],
        )
        self.assertFalse(report["passes"])


if __name__ == "__main__":
    unittest.main()
