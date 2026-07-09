#!/usr/bin/env bash
# =============================================================================
# preview-arena.sh — Generate a side-by-side comparison page and start a server
#
# Usage: bash preview-arena.sh <project-name>
#
# What it does:
#   1. Discovers all worktrees for the project
#   2. Generates an HTML comparison page with iframes
#   3. Starts a simple HTTP server (Python or Node.js)
#   4. Prints the URL to open in browser
#
# Example:
#   bash preview-arena.sh my-app
#   → Serves comparison page at http://localhost:8899
# =============================================================================

set -euo pipefail

# ── Usage ────────────────────────────────────────────────────────────────────

if [ $# -ne 1 ]; then
    echo "Usage: bash preview-arena.sh <project-name>"
    echo ""
    echo "Example:"
    echo "  bash preview-arena.sh my-app"
    exit 1
fi

PROJECT="$1"
MAIN_WORKTREE="$(pwd)/$PROJECT"

if [ ! -d "$MAIN_WORKTREE" ]; then
    echo "ERROR: Project directory '$MAIN_WORKTREE' not found."
    exit 1
fi

cd "$MAIN_WORKTREE"

# ── Discover worktrees ───────────────────────────────────────────────────────

echo "═══ Vibe Design Arena — Preview ═══"
echo ""

# Get all worktree paths and branches
WORKTREE_INFO=$(git worktree list --porcelain)

WORKTREES=()
BRANCHES=()
LABELS=()

while IFS= read -r line; do
    if [[ "$line" =~ ^worktree\ (.*) ]]; then
        WORKTREES+=("${BASH_REMATCH[1]}")
    fi
    if [[ "$line" =~ ^branch\ refs/heads/(.*) ]]; then
        BRANCHES+=("${BASH_REMATCH[1]}")
    fi
done <<< "$WORKTREE_INFO"

# Generate display labels from branch names
for branch in "${BRANCHES[@]}"; do
    # Convert hyphens to spaces and capitalize words
    label=$(echo "$branch" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
    LABELS+=("$label")
done

# Filter out the main worktree (it only has the skeleton)
STYLE_WORKTREES=()
STYLE_BRANCHES=()
STYLE_LABELS=()

for i in "${!WORKTREES[@]}"; do
    if [ "${WORKTREES[$i]}" != "$MAIN_WORKTREE" ]; then
        STYLE_WORKTREES+=("${WORKTREES[$i]}")
        STYLE_BRANCHES+=("${BRANCHES[$i]:-style-$i}")
        STYLE_LABELS+=("${LABELS[$i]:-Style $i}")
    fi
done

NUM_STYLES=${#STYLE_WORKTREES[@]}

if [ "$NUM_STYLES" -eq 0 ]; then
    echo "ERROR: No style worktrees found."
    echo "       Run create-arena.sh first."
    exit 1
fi

echo "Found $NUM_STYLES style worktrees:"
for i in "${!STYLE_WORKTREES[@]}"; do
    echo "  ${STYLE_LABELS[$i]}: ${STYLE_WORKTREES[$i]}"
done
echo ""

# ── Generate comparison page ─────────────────────────────────────────────────

PREVIEW_DIR="${MAIN_WORKTREE}/.arena-preview"
mkdir -p "$PREVIEW_DIR"

COMPARISON_PAGE="${PREVIEW_DIR}/index.html"

echo "Generating comparison page..."

# Determine the iframe column width
if [ "$NUM_STYLES" -eq 1 ]; then
    COL_WIDTH="100%"
elif [ "$NUM_STYLES" -eq 2 ]; then
    COL_WIDTH="50%"
else
    COL_WIDTH="33.333%"
fi

cat > "$COMPARISON_PAGE" << HTMLEOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibe Design Arena — Comparison</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0d0d0d;
      color: #e0e0e0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    header {
      background: #1a1a1a;
      border-bottom: 1px solid #2a2a2a;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    header h1 {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }

    header .hint {
      font-size: 12px;
      color: #888;
    }

    .arena {
      display: flex;
      flex: 1;
      gap: 2px;
      background: #2a2a2a;
      overflow: hidden;
    }

    .arena-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #1a1a1a;
      min-width: 0;
    }

    .arena-label {
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      background: #222;
      border-bottom: 1px solid #2a2a2a;
      flex-shrink: 0;
      color: #ccc;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .arena-label.active {
      color: #fff;
      border-bottom-color: #4a90d9;
    }

    .arena-frame {
      flex: 1;
      border: none;
      width: 100%;
      background: #fff; /* iframe content background */
    }

    @media (max-width: 900px) {
      .arena {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Vibe Design Arena — Side-by-Side Comparison</h1>
    <span class="hint">Scroll each panel independently • Resize to compare</span>
  </header>
  <div class="arena">
HTMLEOF

# Add a column for each style worktree
for i in "${!STYLE_WORKTREES[@]}"; do
    WT_PATH="${STYLE_WORKTREES[$i]}"
    WT_LABEL="${STYLE_LABELS[$i]}"
    WT_INDEX="${WT_PATH}/index.html"

    if [ ! -f "$WT_INDEX" ]; then
        echo "WARNING: No index.html found in ${WT_PATH} — column will be empty."
    fi

    cat >> "$COMPARISON_PAGE" << HTMLEOF
    <div class="arena-column">
      <div class="arena-label">${WT_LABEL}</div>
      <iframe class="arena-frame" src="file://${WT_INDEX}" title="${WT_LABEL}"></iframe>
    </div>
HTMLEOF
done

cat >> "$COMPARISON_PAGE" << HTMLEOF
  </div>
</body>
</html>
HTMLEOF

echo "       Comparison page: $COMPARISON_PAGE"
echo ""

# ── Start local server ───────────────────────────────────────────────────────

PORT=8899

echo "Starting local preview server on port $PORT..."

# Try Python first, fall back to Node.js
if command -v python3 &> /dev/null; then
    echo ""
    echo "═══ Open in browser ═══"
    echo ""
    echo "  → http://localhost:$PORT"
    echo ""
    echo "Press Ctrl+C to stop the server."
    echo ""
    cd "$PREVIEW_DIR"
    python3 -m http.server "$PORT" 2>&1 || true
elif command -v python &> /dev/null; then
    echo ""
    echo "═══ Open in browser ═══"
    echo ""
    echo "  → http://localhost:$PORT"
    echo ""
    echo "Press Ctrl+C to stop the server."
    echo ""
    cd "$PREVIEW_DIR"
    python -m http.server "$PORT" 2>&1 || true
elif command -v npx &> /dev/null; then
    echo ""
    echo "═══ Open in browser ═══"
    echo ""
    echo "  → http://localhost:$PORT"
    echo ""
    echo "Press Ctrl+C to stop the server."
    echo ""
    cd "$PREVIEW_DIR"
    npx serve . -p "$PORT" --no-clipboard 2>&1 || true
else
    echo ""
    echo "No HTTP server found (tried python3, python, npx)."
    echo ""
    echo "Open the comparison page directly:"
    echo "  file://${COMPARISON_PAGE}"
    echo ""
    echo "Or install a simple server and run:"
    echo "  cd ${PREVIEW_DIR} && python3 -m http.server $PORT"
fi
