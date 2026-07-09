#!/usr/bin/env bash
# =============================================================================
# create-arena.sh — Initialize a Vibe Design Arena project
#
# Usage: bash create-arena.sh <project-name> <style-a-slug> <style-b-slug> <style-c-slug>
#
# Creates:
#   1. A git repository with a skeleton index.html (common ancestor)
#   2. Three git worktrees, each on its own style branch
#   3. Validates all worktrees are ready for sub-agent dispatch
#
# Example:
#   bash create-arena.sh my-app minimal bold elegant
#   → my-app/           (main worktree, skeleton)
#   → my-app-minimal/   (worktree A, branch minimal)
#   → my-app-bold/      (worktree B, branch bold)
#   → my-app-elegant/   (worktree C, branch elegant)
# =============================================================================

set -euo pipefail

# ── Usage ────────────────────────────────────────────────────────────────────

if [ $# -ne 4 ]; then
    echo "Usage: bash create-arena.sh <project-name> <style-a-slug> <style-b-slug> <style-c-slug>"
    echo ""
    echo "Example:"
    echo "  bash create-arena.sh my-app minimal bold elegant"
    exit 1
fi

PROJECT="$1"
STYLE_A="$2"
STYLE_B="$3"
STYLE_C="$4"

# ── Validate inputs ──────────────────────────────────────────────────────────

validate_slug() {
    local slug="$1"
    if ! [[ "$slug" =~ ^[a-z0-9][-a-z0-9]*[a-z0-9]$ ]]; then
        echo "ERROR: Style slug '$slug' is invalid."
        echo "       Use lowercase letters, numbers, and hyphens only."
        echo "       Must start and end with a letter or number."
        exit 1
    fi
}

validate_slug "$STYLE_A"
validate_slug "$STYLE_B"
validate_slug "$STYLE_C"

if [ "$STYLE_A" = "$STYLE_B" ] || [ "$STYLE_A" = "$STYLE_C" ] || [ "$STYLE_B" = "$STYLE_C" ]; then
    echo "ERROR: Style slugs must all be different."
    exit 1
fi

if [ -d "$PROJECT" ]; then
    echo "ERROR: Directory '$PROJECT' already exists."
    exit 1
fi

# ── Step 1: Create project directory and initialize git ──────────────────────

echo "═══ Vibe Design Arena — Initializing ═══"
echo ""
echo "Project:       $PROJECT"
echo "Style A:       $STYLE_A"
echo "Style B:       $STYLE_B"
echo "Style C:       $STYLE_C"
echo ""

echo "[1/4] Creating project directory and initializing git..."
mkdir "$PROJECT"
cd "$PROJECT"
git init

# ── Step 2: Create skeleton files ────────────────────────────────────────────

echo "[2/4] Creating skeleton index.html..."

cat > index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Prototype</title>
  <!-- Styles will be added by sub-agents in each worktree -->
</head>
<body>
  <!-- Semantic skeleton — sub-agents will flesh this out with styles and content -->
  <header role="banner">
    <nav aria-label="Main navigation">
      <!-- Navigation placeholder -->
    </nav>
  </header>

  <main>
    <!-- Main content placeholder -->
  </main>

  <footer role="contentinfo">
    <!-- Footer placeholder -->
  </footer>

  <!-- Scripts will be added by sub-agents in each worktree -->
</body>
</html>
HTMLEOF

# ── Step 3: Create skeleton commit ───────────────────────────────────────────

echo "[3/4] Creating skeleton commit (common ancestor)..."

git add index.html
git commit -m "base: product skeleton (no styles)"

BASE_COMMIT=$(git rev-parse --short HEAD)
echo "       Skeleton commit: $BASE_COMMIT"

# ── Step 4: Create three worktrees ────────────────────────────────────────────

echo "[4/4] Creating three worktrees..."

# Determine the parent directory for worktrees
PARENT_DIR=$(dirname "$(pwd)")

for STYLE in "$STYLE_A" "$STYLE_B" "$STYLE_C"; do
    WORKTREE_PATH="${PARENT_DIR}/${PROJECT}-${STYLE}"
    echo "       Creating worktree: $WORKTREE_PATH (branch: $STYLE)"

    git worktree add "$WORKTREE_PATH" -b "$STYLE"

    # Verify the worktree was created
    if [ ! -f "${WORKTREE_PATH}/index.html" ]; then
        echo "ERROR: Worktree creation failed for $STYLE — index.html not found."
        exit 1
    fi
done

# ── Validation ───────────────────────────────────────────────────────────────

echo ""
echo "═══ Validation ═══"
echo ""

echo "Worktree list:"
git worktree list
echo ""

echo "Branch list:"
git branch --list
echo ""

# Check each worktree has the skeleton commit
for STYLE in "$STYLE_A" "$STYLE_B" "$STYLE_C"; do
    WORKTREE_PATH="${PARENT_DIR}/${PROJECT}-${STYLE}"
    COMMIT_COUNT=$(git -C "$WORKTREE_PATH" rev-list --count HEAD)
    if [ "$COMMIT_COUNT" -ne 1 ]; then
        echo "WARNING: Worktree '$STYLE' has $COMMIT_COUNT commits (expected 1)."
    else
        echo "       [$STYLE] OK — 1 commit on branch"
    fi
done

# ── Summary ──────────────────────────────────────────────────────────────────

echo ""
echo "═══ Arena Ready ═══"
echo ""
echo "Main worktree:   $(pwd)"
echo "Worktree A:      ${PARENT_DIR}/${PROJECT}-${STYLE_A}  (branch: $STYLE_A)"
echo "Worktree B:      ${PARENT_DIR}/${PROJECT}-${STYLE_B}  (branch: $STYLE_B)"
echo "Worktree C:      ${PARENT_DIR}/${PROJECT}-${STYLE_C}  (branch: $STYLE_C)"
echo ""
echo "Next step: Dispatch 3 sub-agents, each targeting one worktree."
echo "           Use the template in reference/subagent-prompt-template.md"
