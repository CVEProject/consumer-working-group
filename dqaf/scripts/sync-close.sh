#!/bin/bash
# Sync the Obsidian vault back to GitHub and push.
# Run at the end of a working session after editing in Obsidian.
set -e

REPO=$(cd "$(dirname "$0")/../.." && pwd)
VAULT=~/primary/projects/cve-dqaf
DATE=$(date +%Y-%m-%d)

rsync -av --delete "$VAULT/" "$REPO/dqaf/docs/content/"
cd "$REPO"
git add dqaf/docs/content/
git diff --cached --quiet && echo "No changes to commit." && exit 0
git commit -m "vault sync: $DATE"
git push
echo "GitHub updated."
