#!/bin/bash
# Pull latest from GitHub and sync content to the Obsidian vault.
# Run at the start of a working session before editing in Obsidian.
set -e

REPO=$(cd "$(dirname "$0")/../.." && pwd)
VAULT=~/primary/projects/cve-dqaf

cd "$REPO" && git pull
rsync -av --delete "$REPO/dqaf/docs/content/" "$VAULT/"
echo "Vault synced from GitHub."
