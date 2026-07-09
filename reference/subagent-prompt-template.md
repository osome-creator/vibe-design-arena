# Sub-Agent Prompt Template

Use this template when dispatching sub-agents to build frontend styles in parallel worktrees. Fill in the `[PLACEHOLDERS]` before sending. Dispatch all three sub-agents in ONE response for true parallelism.

---

## Template

```
You are building a complete frontend implementation for a product prototype.
You will work in an ISOLATED git worktree. Your changes will not affect other
design variants being built in parallel.

## Worktree Location

Your worktree is at: [WORKTREE_PATH]

All your work MUST stay inside this directory. Do not read or write files
outside this path.

## Product Context

- **Product:** [PRODUCT_NAME]
- **Description:** [PRODUCT_ONE_LINER]
- **Target audience:** [TARGET_AUDIENCE]
- **Pages to build:** [PAGE_LIST]

## Your Design Assignment

You are building **Style: [STYLE_NAME]**.

Design parameters:
- **Philosophy:** [DESIGN_PHILOSOPHY]
- **Color palette:**
  - Primary: [PRIMARY_COLOR]
  - Secondary: [SECONDARY_COLOR]
  - Accent: [ACCENT_COLOR]
  - Background: [BACKGROUND_COLOR]
  - Surface: [SURFACE_COLOR]
  - Text: [TEXT_COLOR]
  - Muted: [MUTED_COLOR]
- **Typography:**
  - Headings: [HEADING_FONT] at [HEADING_WEIGHTS]
  - Body: [BODY_FONT] at [BODY_SIZE] / line-height [BODY_LINE_HEIGHT]
- **Component style:**
  - Border radius: [BORDER_RADIUS]
  - Shadows: [SHADOW_STYLE]
  - Spacing scale: [SPACING_SCALE]
- **Layout tendency:** [LAYOUT_APPROACH]
- **Interaction style:** [INTERACTION_PATTERNS]

## Technical Requirements

1. Use **plain HTML + CSS + vanilla JavaScript** (no frameworks, no build step).
   [ALTERNATIVE: Use [FRAMEWORK] — make sure to npm install inside the worktree.]
2. All pages must open directly in a browser as static files.
3. Implement ALL of these pages: [PAGE_LIST]
4. Each page should be a separate `.html` file, with shared CSS in a `styles.css` file.
5. Ensure responsive design — pages must look good at 375px, 768px, and 1440px widths.
6. Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
7. Meet WCAG AA contrast: body text ≥ 4.5:1 on background.

## What "Complete" Means

- Every page has real, realistic content (no lorem ipsum — use plausible product-specific text).
- Navigation between pages works (relative links).
- All interactive elements have hover/focus/active states.
- The design is production-quality — not a wireframe, not a placeholder.
- The three styles being built in parallel are DESIGNED TO BE DIFFERENT from yours.
  Your style should stand confidently on its own.

## When Done

Run these commands inside your worktree:

```bash
git add .
git commit -m "style: [STYLE_NAME] — complete implementation"
```

Then report: "Style [STYLE_NAME] complete. [N] pages built. Ready for review."

## Constraints

- Do NOT modify any files outside [WORKTREE_PATH].
- Do NOT merge branches or interact with other worktrees.
- Do NOT add external dependencies beyond what's specified (no npm packages unless
  using a framework build).
- Keep total CSS + JS under 500KB (no heavy libraries without reason).

Begin by reading the existing index.html skeleton, then build your complete design.
```

---

## Usage Notes

### Filling Placeholders

Replace every `[PLACEHOLDER]` with concrete values derived from Phase 2 (style proposals). The more specific you are, the more coherent the output.

Example filled values:

```
- **Style:** Swiss Minimalism
- **Color palette:**
  - Primary: #1a1a1a
  - Secondary: #ffffff
  - Accent: #e94560
  - Background: #fafafa
  - Surface: #ffffff
  - Text: #1a1a1a (heading) / #444444 (body)
  - Muted: #888888
- **Typography:**
  - Headings: Inter at 700/800 weight
  - Body: Inter at 16px / line-height 1.6
- **Component style:**
  - Border radius: 4px
  - Shadows: minimal — 0 1px 3px rgba(0,0,0,0.08)
  - Spacing scale: 8/16/24/32/48/64px
- **Layout tendency:** Asymmetric grid, single-column content, generous whitespace
- **Interaction style:** Hover underlines, instant transitions, no motion flair
```

### Tech Stack Variants

**Plain HTML+CSS (default):** Use the template as-is.

**React:** Replace the "Technical Requirements" section with:
```
1. Use React with Vite. Run `npm create vite@latest . -- --template react` inside the worktree.
2. Then run `npm install`.
3. Build all pages as React components with React Router for navigation.
```

**Vue:** Replace with:
```
1. Use Vue 3 with Vite. Run `npm create vite@latest . -- --template vue` inside the worktree.
2. Then run `npm install`.
3. Build all pages as Vue SFCs with Vue Router for navigation.
```

### Parallel Dispatch

Dispatch all three in ONE response — the Agent tool calls run concurrently:

```
Agent 1 → "Build Style A (Swiss Minimalism) at [worktree-a-path]" (fill template)
Agent 2 → "Build Style B (Neubrutalism) at [worktree-b-path]" (fill template)
Agent 3 → "Build Style C (Glassmorphism) at [worktree-c-path]" (fill template)
```

All three sub-agents work simultaneously. Typical completion: 2-5 minutes for all three.
