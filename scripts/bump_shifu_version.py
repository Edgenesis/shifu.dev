#!/usr/bin/env python3
"""Bump Shifu version references in documentation files."""
import argparse
import pathlib
import re
import sys

TARGET_FILES = [
    "docs/guides/install/install-shifu-prod.md",
    "docs/guides/telemetryservice/installtelemetryservice.md",
    "i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/install/install-shifu-prod.md",
    "i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/telemetryservice/installtelemetryservice.md",
    "src/components/home/News/index.js",
]

VERSION_PATTERN = re.compile(r"v\d+\.\d+\.\d+")


def main() -> int:
    parser = argparse.ArgumentParser(description="Bump Shifu version references.")
    parser.add_argument("--tag", required=True, help="Shifu tag (e.g., v0.88.0)")
    args = parser.parse_args()

    tag = args.tag.strip()
    if not re.fullmatch(r"v\d+\.\d+\.\d+", tag):
        print(f"Invalid tag format: {tag}", file=sys.stderr)
        return 1

    for file_path in TARGET_FILES:
        path = pathlib.Path(file_path)
        if not path.exists():
            print(f"Warning: {file_path} not found, skipping", file=sys.stderr)
            continue

        original = path.read_text(encoding="utf-8")
        updated = VERSION_PATTERN.sub(tag, original)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"Updated: {file_path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
