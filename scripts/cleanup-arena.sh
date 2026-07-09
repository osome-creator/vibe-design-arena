#!/usr/bin/env bash
# =============================================================================
# cleanup-arena.sh — Merge selected style and remove unused worktrees
#
# Usage: bash cleanup-arena.sh <project-name> <selected-style-slug>
#
# What it does:
#   1. Merges the selected style branch into main (inside the main worktree)
#   2. Removes the unused worktrees
#   3. Keeps all branches in git history for future reference
#
# Example:
#   bash cleanup-arena.sh my-app bold
#   → Merges 'bold' branch into main
#   → Removes the other two worktrees
#   → Branches 'minimal' and 'elegant' remain in git history
# =============================================================================

set -euo pipefail

# ── Usage ────────────────────────────────────────────────────────────────────

if [ $# -ne 2 ]; then
    echo "Usage: bash cleanup-arena.sh <project-name> <selected-style-slug>"
    echo ""
    echo "Example:"
    echo "  bash cleanup-arena.sh my-app bold"
    exit 1
fi

PROJECT="$1"
SELECTED="$2"

# ── Validate ─────────────────────────────────────────────────────────────────

MAIN_WORKTREE="$(pwd)/$PROJECT"

if [ ! -d "$MAIN_WORKTREE" ]; then
    echo "ERROR: Main project directory '$MAIN_WORKTREE' not found."
    echo "       Run this from the parent directory of the project."
    exit 1
fi

if [ ! -d "${MAIN_WORKTREE}/.git" ]; then
    echo "ERROR: '$MAIN_WORKTREE' is not a git repository."
    exit 1
fi

# ── Discover worktrees ───────────────────────────────────────────────────────

echo "═══ Vibe Design Arena — Cleanup ═══"
echo ""

cd "$MAIN_WORKTREE"

# Get list of worktrees (skip the first line which is the header)
WORKTREE_LIST=$(git worktree list --porcelain | grep "^worktree " | sed 's/^worktree //')

# Identify the selected worktree and the unused ones
SELECTED_PATH=""
UNUSED_PATHS=()
UNUSED_BRANCHES=()

while IFS= read -r wt_path; do
    # Get the branch for this worktree
    WT_BRANCH=$(git -C "$wt_path" branch --show-current 2>/dev/null || echo "detached")

    if [ "$WT_BRANCH" = "$SELECTED" ]; then
        SELECTED_PATH="$wt_path"
    elif [ "$wt_path" != "$MAIN_WORKTREE" ]; then
        UNUSED_PATHS+=("$wt_path")
        UNUSED_BRANCHES+=("$WT_BRANCH")
    fi
done <<< "$WORKTREE_LIST"

if [ -z "$SELECTED_PATH" ]; then
    echo "ERROR: No worktree found on branch '$SELECTED'."
    echo ""
    echo "Available worktrees:"
    git worktree list
    exit 1
fi

# ── Step 1: Merge selected style ─────────────────────────────────────────────

echo "[1/3] Merging branch '$SELECTED' into main..."
echo "       Selected worktree: $SELECTED_PATH"

# Make sure we're on the main branch (or master)
CURRENT_BRANCH=$(git branch --show-current)
MAIN_BRANCH=$(git branch --list | grep -oE '(main|master)' | head -1)

if [ -z "$MAIN_BRANCH" ]; then
    echo "ERROR: Could not find 'main' or 'master' branch."
    exit 1
fi

if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    git switch "$MAIN_BRANCH"
fi

if git merge "$SELECTED" --no-edit; then
    echo "       Merge successful."
else
    echo ""
    echo "ERROR: Merge conflict detected."
    echo "       This is unusual — all styles should be independent."
    echo "       Resolve conflicts manually, then re-run this script."
    exit 1
fi

# ── Step 2: Remove unused worktrees ──────────────────────────────────────────

echo "[2/3] Removing unused worktrees..."

for wt_path in "${UNUSED_PATHS[@]}"; do
    echo "       Removing: $wt_path"
    git worktree remove "$wt_path" --force || {
        echo "       WARNING: Could not remove worktree at $wt_path."
        echo "                You may need to remove it manually: rm -rf $wt_path && git worktree prune"
    }
done

# ── Step 3: Report ───────────────────────────────────────────────────────────

echo "[3/3] Cleanup complete."
echo ""

# List remaining worktrees
echo "Remaining worktrees:"
git worktree list
echo ""

# List all branches (the unused ones are preserved in history)
echo "All branches (all preserved for reference):"
git branch --list
echo ""

echo "═══ Done ═══"
echo ""
echo "Branch '$SELECTED' merged into '$MAIN_BRANCH'."
echo "Unused worktrees removed."
echo "All style branches preserved in git history."

if [ ${#UNUSED_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo "To revisit unused styles later:"
    for branch in "${UNUSED_BRANCHES[@]}"; do
        if [ "$branch" != "detached" ]; then
            echo "  git worktree add ../${PROJECT}-${branch} $branch"
        fi
    done
fi
