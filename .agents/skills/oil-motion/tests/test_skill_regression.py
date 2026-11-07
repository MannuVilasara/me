from __future__ import annotations

import importlib.util
import json
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from argparse import Namespace
from pathlib import Path
from unittest import mock

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_DIR = ROOT / "scripts"
sys.path.insert(0, str(SCRIPT_DIR))

SPEC = importlib.util.spec_from_file_location(
    "video_job",
    SCRIPT_DIR / "video_job.py",
)
assert SPEC and SPEC.loader
VIDEO = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = VIDEO
SPEC.loader.exec_module(VIDEO)

FFMPEG = shutil.which("ffmpeg")

# 拆开拼接，避免本测试文件自己被冲突标记扫描命中
CONFLICT_MARKER = re.compile(
    r"^(?:{lt}|{gt}|{pipe}|{eq})$".format(
        lt="<" * 7 + r".*",
        gt=">" * 7 + r".*",
        pipe=r"\|" * 7 + r".*",
        eq="=" * 7,
    )
)
SKIPPED_DIRS = {".git", "__pycache__", ".venv", "node_modules"}


class VideoResolutionTests(unittest.TestCase):
    def test_h3_max_accepts_supported_resolutions_and_normalizes_case(self) -> None:
        args = VIDEO.parser().parse_args(["--prompt", "测试", "--output", "out.mp4"])
        self.assertEqual(VIDEO.build_payload(args)["resolution"], "768P")
        for resolution in ("480P", "480p", "768P", "768p"):
            with self.subTest(resolution=resolution):
                args.resolution = resolution
                self.assertEqual(
                    VIDEO.build_payload(args)["resolution"], resolution.upper()
                )

    def test_h3_max_rejects_unsupported_resolutions_before_credentials_or_submit(self) -> None:
        for resolution in ("2K", "1080P", "4K", "720p"):
            with self.subTest(resolution=resolution):
                args = VIDEO.parser().parse_args(
                    ["--prompt", "测试", "--resolution", resolution, "--output", "out.mp4"]
                )
                with (
                    mock.patch.object(VIDEO, "require_api_key") as credentials,
                    mock.patch.object(VIDEO, "request_json") as request,
                    self.assertRaises(ValueError) as raised,
                ):
                    VIDEO.generate(args)
                self.assertIn(VIDEO.DEFAULT_MODEL, str(raised.exception))
                self.assertIn(resolution, str(raised.exception))
                self.assertIn("--resolution 768P", str(raised.exception))
                self.assertIn("--resolution 480P", str(raised.exception))
                credentials.assert_not_called()
                request.assert_not_called()

    def test_other_models_keep_their_native_resolution(self) -> None:
        args = VIDEO.parser().parse_args(
            [
                "--prompt", "测试", "--output", "out.mp4",
                "--model", "minimax/minimax-h3", "--resolution", "2K",
            ]
        )
        self.assertEqual(VIDEO.build_payload(args)["resolution"], "2K")


class ConflictMarkerTests(unittest.TestCase):
    def test_no_git_conflict_markers_anywhere_in_skill(self) -> None:
        offenders: list[str] = []
        for path in sorted(ROOT.rglob("*")):
            if not path.is_file():
                continue
            if SKIPPED_DIRS & set(path.relative_to(ROOT).parts):
                continue
            data = path.read_bytes()
            if b"\x00" in data[:8192]:
                continue
            text = data.decode("utf-8", errors="ignore")
            for number, line in enumerate(text.splitlines(), start=1):
                if CONFLICT_MARKER.match(line):
                    relative = path.relative_to(ROOT)
                    offenders.append(f"{relative}:{number}")
        self.assertEqual(
            offenders,
            [],
            "Skill 内不得残留 Git 冲突标记：" + ", ".join(offenders),
        )


def make_test_video(path: Path, frames: int = 24) -> None:
    subprocess.run(
        [
            FFMPEG or "ffmpeg",
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-f",
            "lavfi",
            "-i",
            f"testsrc=duration={frames / 12}:size=64x64:rate=12",
            "-pix_fmt",
            "yuv420p",
            str(path),
        ],
        check=True,
    )


def decode_rgb(path: Path) -> list[tuple[int, int, int]]:
    with Image.open(path) as opened:
        image = opened.convert("RGB")
    if hasattr(image, "get_flattened_data"):
        return list(image.get_flattened_data())
    return list(image.getdata())


@unittest.skipUnless(FFMPEG, "需要 ffmpeg 才能验证尾帧提取")
class LastFrameFallbackTests(unittest.TestCase):
    def setUp(self) -> None:
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.video = self.root / "master.mp4"
        make_test_video(self.video)

    def tearDown(self) -> None:
        self.directory.cleanup()

    def test_extract_last_frame_returns_real_tail(self) -> None:
        output = self.root / "tail.jpg"

        VIDEO.extract_last_frame(self.video, output)

        self.assertTrue(output.is_file())
        self.assertGreater(output.stat().st_size, 0)
        tail = decode_rgb(output)
        reference = self.root / "reference.png"
        subprocess.run(
            [
                FFMPEG or "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-sseof",
                "-0.2",
                "-i",
                str(self.video),
                "-frames:v",
                "1",
                str(reference),
            ],
            check=True,
        )
        first = self.root / "first.png"
        subprocess.run(
            [
                FFMPEG or "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-i",
                str(self.video),
                "-frames:v",
                "1",
                str(first),
            ],
            check=True,
        )

        def mean_delta(a: list[tuple[int, int, int]], b: list[tuple[int, int, int]]) -> float:
            return sum(
                abs(pixel_a[channel] - pixel_b[channel])
                for pixel_a, pixel_b in zip(a, b, strict=True)
                for channel in range(3)
            ) / (len(a) * 3)

        # 提取结果接近真实尾帧，而不是被静默替换成首帧
        self.assertLess(mean_delta(tail, decode_rgb(reference)), 12)
        self.assertGreater(mean_delta(tail, decode_rgb(first)), 1)

    def run_generate(self, final_response: dict) -> tuple[Path, Path, dict]:
        output = self.root / "out.mp4"
        last_frame_output = self.root / "tail-out.jpg"
        metadata = self.root / "meta.json"
        args = Namespace(
            prompt="测试",
            prompt_file=None,
            first_frame=None,
            last_frame=None,
            loop_frame=False,
            reference_image=[],
            model="minimax/minimax-h3",
            resolution="768p",
            ratio=None,
            duration=5,
            seed=None,
            frames=None,
            stage="pilot",
            segment_index=1,
            pilot_approval=None,
            continuity_mode=None,
            previous_tail=None,
            frame_chain_manifest=None,
            output=str(output),
            last_frame_output=str(last_frame_output),
            metadata=str(metadata),
            poll_interval=0.01,
            timeout=30.0,
            force=False,
        )

        def fake_request(method: str, url: str, api_key: str, payload=None) -> dict:
            if method == "POST":
                return {"id": "job-1"}
            return final_response

        def fake_download(url: str, target: Path) -> None:
            if "last-frame" in url:
                target.write_bytes((self.root / "api-tail.png").read_bytes())
            else:
                shutil.copy2(self.video, target)

        api_tail = Image.new("RGB", (64, 64), (12, 34, 56))
        api_tail.save(self.root / "api-tail.png")

        with (
            mock.patch.object(VIDEO, "request_json", side_effect=fake_request),
            mock.patch.object(VIDEO, "download", side_effect=fake_download),
            mock.patch.object(VIDEO, "require_api_key", return_value="key"),
        ):
            VIDEO.generate(args)
        return output, last_frame_output, json.loads(
            metadata.read_text(encoding="utf-8")
        )

    def test_api_last_frame_is_preferred(self) -> None:
        _, last_frame_output, metadata = self.run_generate(
            {
                "status": "succeeded",
                "video_url": "https://example.com/video.mp4",
                "last_frame_url": "https://example.com/last-frame.jpg",
            }
        )

        self.assertTrue(last_frame_output.is_file())
        self.assertEqual(decode_rgb(last_frame_output)[0], (12, 34, 56))
        self.assertEqual(metadata["lastFrame"]["source"], "api")
        self.assertEqual(
            metadata["lastFrame"]["path"], str(last_frame_output.resolve())
        )

    def test_missing_api_last_frame_falls_back_to_video(self) -> None:
        _, last_frame_output, metadata = self.run_generate(
            {
                "status": "succeeded",
                "video_url": "https://example.com/video.mp4",
            }
        )

        self.assertTrue(last_frame_output.is_file())
        with Image.open(last_frame_output) as image:
            self.assertEqual(image.size, (64, 64))
        self.assertEqual(metadata["lastFrame"]["source"], "video-fallback")

    def test_default_last_frame_output_is_always_produced(self) -> None:
        output = self.root / "default.mp4"
        metadata = self.root / "default.meta.json"
        args = Namespace(
            prompt="测试",
            prompt_file=None,
            first_frame=None,
            last_frame=None,
            loop_frame=False,
            reference_image=[],
            model="minimax/minimax-h3",
            resolution="768p",
            ratio=None,
            duration=5,
            seed=None,
            frames=None,
            stage="pilot",
            segment_index=1,
            pilot_approval=None,
            continuity_mode=None,
            previous_tail=None,
            frame_chain_manifest=None,
            output=str(output),
            last_frame_output=None,
            metadata=str(metadata),
            poll_interval=0.01,
            timeout=30.0,
            force=False,
        )
        with (
            mock.patch.object(
                VIDEO,
                "request_json",
                side_effect=[
                    {"id": "job-1"},
                    {
                        "status": "succeeded",
                        "video_url": "https://example.com/video.mp4",
                    },
                ],
            ),
            mock.patch.object(
                VIDEO,
                "download",
                side_effect=lambda url, target: shutil.copy2(self.video, target),
            ),
            mock.patch.object(VIDEO, "require_api_key", return_value="key"),
        ):
            VIDEO.generate(args)

        default_tail = self.root / "default-last-frame.jpg"
        self.assertTrue(default_tail.is_file())
        payload = json.loads(metadata.read_text(encoding="utf-8"))
        self.assertEqual(payload["lastFrame"]["source"], "video-fallback")
        self.assertEqual(
            payload["lastFrame"]["path"], str(default_tail.resolve())
        )


if __name__ == "__main__":
    unittest.main()
