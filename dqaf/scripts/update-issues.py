#!/usr/bin/env python3
"""Update paragraph-issues.json when a DQAF issue is opened, closed, reopened, or deleted."""

import json
import sys
from pathlib import Path


def main():
    if len(sys.argv) != 5:
        print(f"Usage: {sys.argv[0]} <doc> <para> <issue_number> <action>", file=sys.stderr)
        sys.exit(1)

    doc         = sys.argv[1]
    para        = sys.argv[2]
    issue_num   = int(sys.argv[3])
    action      = sys.argv[4]  # opened | closed | reopened | deleted

    data_file = (
        Path(__file__).resolve().parents[2]
        / "dqaf" / "docs" / "_data" / "paragraph-issues.json"
    )

    data = json.loads(data_file.read_text()) if data_file.exists() else {}

    data.setdefault(doc, {})
    data[doc].setdefault(para, {"open": [], "closed": []})
    entry = data[doc][para]

    if action in ("opened", "reopened"):
        if issue_num not in entry["open"]:
            entry["open"].append(issue_num)
        if issue_num in entry["closed"]:
            entry["closed"].remove(issue_num)
    elif action in ("closed", "deleted"):
        if issue_num not in entry["closed"]:
            entry["closed"].append(issue_num)
        if issue_num in entry["open"]:
            entry["open"].remove(issue_num)
    else:
        print(f"Unknown action: {action}", file=sys.stderr)
        sys.exit(1)

    data_file.write_text(json.dumps(data, indent=2) + "\n")
    print(f"Updated {data_file}: {doc} ¶{para} issue #{issue_num} → {action}")


if __name__ == "__main__":
    main()
