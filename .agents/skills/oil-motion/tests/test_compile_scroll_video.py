from __future__ import annotations

import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image


SCRIPT_DIR = Path(__file__).resolve().parents[1] / "scripts"
sys.path.insert(0, str(SCRIPT_DIR))
SPEC = importlib.util.spec_from_file_location(
    "compile_scroll_video",
    SCRIPT_DIR / "compile_scroll_video.py",
)
assert SPEC and SPEC.loader
COMPILE = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = COMPILE
SPEC.loader.exec_module(COMPILE)

from chroma_key import analyze_frame, default_parameters, key_image


class ChromaVideoCompileTests(unittest.TestCase):
    def test_compiler_requires_explicit_background_owner(self) -> None:
        with self.assertRaises(SystemExit):
            COMPILE.parser().parse_args(
                ["source.mp4", "build", "--budget-report", "budget.json"]
            )

    def test_compiler_requires_frame_policy_and_timeline_output(self) -> None:
        with self.assertRaises(SystemExit):
            COMPILE.parser().parse_args(
                [
                    "source.mp4",
                    "build",
                    "--background-owner",
                    "video",
                    "--budget-report",
                    "budget.json",
                ]
            )

    def test_timeline_keeps_hold_separate_from_exclusive_end(self) -> None:
        specs = COMPILE.parse_segment_specs(
            ["first=0:2:3", "second=3:5:6"]
        )

        timeline = COMPILE.build_timeline(
            specs,
            [0, 1, 2, 4, 5, 6],
            7,
            24,
            {"type": "constant", "rate": 1.0},
        )

        first = timeline["segments"][0]
        self.assertEqual(timeline["initialState"], "state-0")
        self.assertEqual(
            [state["id"] for state in timeline["states"]],
            ["state-0", "first", "second"],
        )
        self.assertEqual(first["from"], "state-0")
        self.assertEqual(first["to"], "first")
        self.assertEqual(first["frames"]["hold"], 2)
        self.assertEqual(first["frames"]["endExclusive"], 3)
        self.assertLess(first["hold"], first["endExclusive"])

    def test_representative_frames_include_both_ends(self) -> None:
        paths = [Path(f"frame_{index:05d}.png") for index in range(100)]

        sampled = COMPILE.representative_frames(paths)

        self.assertEqual(len(sampled), 48)
        self.assertEqual(sampled[0], paths[0])
        self.assertEqual(sampled[-1], paths[-1])

    def test_representative_indices_include_both_ends(self) -> None:
        sampled = COMPILE.representative_indices(323)

        self.assertEqual(len(sampled), 48)
        self.assertEqual(sampled[0], 0)
        self.assertEqual(sampled[-1], 322)

    def test_uniform_green_frames_pass_key_validation(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            paths: list[Path] = []
            for index in range(3):
                path = Path(directory) / f"frame_{index:05d}.png"
                image = Image.new("RGB", (32, 32), (0, 255, 0))
                image.paste((255, 0, 0), (8, 8, 24, 24))
                image.save(path)
                paths.append(path)

            result = COMPILE.validate_key_source(paths, (0, 255, 0))

            self.assertEqual(result["kind"], "green")
            self.assertEqual(result["borderSpreadP95Max"], 0)

    def test_non_chroma_background_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "frame.png"
            Image.new("RGB", (32, 32), (255, 255, 255)).save(path)

            with self.assertRaisesRegex(ValueError, "绿色或洋红色键背景"):
                COMPILE.validate_key_source([path], (255, 255, 255))

    def test_dark_green_region_and_green_edge_are_removed(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source.png"
            output = Path(directory) / "output.png"
            image = Image.new("RGB", (64, 64), (0, 235, 10))
            image.paste((18, 82, 24), (8, 8, 56, 56))
            image.paste((220, 40, 30), (24, 24, 40, 40))
            image.save(source)
            parameters = default_parameters((0, 235, 10))

            key_image(source, output, parameters)

            with Image.open(output) as result:
                alpha = result.getchannel("A")
                self.assertLessEqual(alpha.getpixel((12, 12)), 2)
                self.assertGreaterEqual(alpha.getpixel((32, 32)), 250)
            metrics = analyze_frame(source, parameters)
            self.assertLessEqual(metrics["keyLikeAlphaP99"], 0.01)

    def test_magenta_key_mode_removes_magenta_background(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "source.png"
            output = Path(directory) / "output.png"
            image = Image.new("RGB", (32, 32), (240, 0, 235))
            image.paste((30, 180, 220), (8, 8, 24, 24))
            image.save(source)
            parameters = default_parameters((240, 0, 235))

            key_image(source, output, parameters)

            self.assertEqual(parameters.mode, "magenta")
            with Image.open(output) as result:
                alpha = result.getchannel("A")
                self.assertLessEqual(alpha.getpixel((2, 2)), 2)
                self.assertGreaterEqual(alpha.getpixel((16, 16)), 250)

    def test_source_anchor_maps_to_nearest_retained_frame(self) -> None:
        kept = [0, 1, 4, 9, 20, 48, 90, 248, 251]

        self.assertEqual(COMPILE.map_source_frame(248, kept), 7)
        self.assertEqual(COMPILE.map_source_frame(47, kept), 5)

    def test_anchor_parser_rejects_duplicates(self) -> None:
        with self.assertRaisesRegex(ValueError, "重复"):
            COMPILE.parse_anchors(["center=20", "center=21"])

    def test_runtime_shader_implements_manifest_contract(self) -> None:
        shader = (
            SCRIPT_DIR.parent / "assets" / "chroma-video-renderer.ts"
        ).read_text(encoding="utf-8")

        for token in (
            'algorithm: "dominance-v2"',
            "uDominanceStart",
            "uDominanceEnd",
            "uSpillStart",
            "uSpillEnd",
            "keying.keyColor",
        ):
            self.assertIn(token, shader)

    def test_video_compiler_rejects_atlas_budget_report(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "budget.json"
            path.write_text(
                json.dumps(
                    {
                        "passes": True,
                        "delivery": {"selected": "alpha-atlas"},
                    }
                ),
                encoding="utf-8",
            )

            with self.assertRaisesRegex(ValueError, "没有选择 chroma-video"):
                COMPILE.load_budget_report(path)

    def test_baked_compiler_accepts_baked_budget_report(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "budget.json"
            path.write_text(
                json.dumps(
                    {
                        "passes": True,
                        "delivery": {"selected": "baked-video"},
                    }
                ),
                encoding="utf-8",
            )

            report = COMPILE.load_budget_report(path, "baked-video")

            self.assertEqual(report["delivery"]["selected"], "baked-video")
            with self.assertRaisesRegex(ValueError, "没有选择 chroma-video"):
                COMPILE.load_budget_report(path)

if __name__ == "__main__":
    unittest.main()
