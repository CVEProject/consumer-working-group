#!/bin/bash
# Create issue labels in the CVEProject/consumer-working-group repo.
# Run once after cloning. Requires: gh auth login
REPO="CVEProject/consumer-working-group"

gh label create "doc:process"         --color "0075ca" --description "Feedback on process.md"         --repo "$REPO"
gh label create "doc:roles"           --color "0075ca" --description "Feedback on roles.md"           --repo "$REPO"
gh label create "doc:canonical-tasks" --color "0075ca" --description "Feedback on canonical-tasks.md" --repo "$REPO"
gh label create "doc:task-purposes"   --color "0075ca" --description "Feedback on task-purposes.md"   --repo "$REPO"
gh label create "accepted"            --color "0e8a16" --description "Document updated based on this issue"       --repo "$REPO"
gh label create "deferred"            --color "e4e669" --description "Valid point; addressed in a later revision" --repo "$REPO"
gh label create "duplicate"           --color "cfd3d7" --description "Same concern raised in another issue"       --repo "$REPO"
gh label create "wording-only"        --color "cfd3d7" --description "Not substantive; resolved at co-chairs' discretion" --repo "$REPO"
gh label create "question"            --color "cfd3d7" --description "Asking for clarification; no document change needed"  --repo "$REPO"

echo "Labels created."
