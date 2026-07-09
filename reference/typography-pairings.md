# Typography Pairings

Recommended font pairings for production frontend projects. Each pairing includes a Google Fonts import (when applicable), CSS variable setup, and a system font fallback stack.

---

## Pairing Principle

**Pair on contrast, not similarity.** Two geometric sans-serifs look like a mistake. A serif heading + sans-serif body creates intentional hierarchy.

Contrast axes to pair on:
- **Serif ↔ Sans-serif** (classic, most reliable)
- **Geometric ↔ Humanist** (both sans-serif, but different skeletons)
- **Display ↔ Text** (high-personality heading + neutral body)
- **Monospace ↔ Proportional** (code/data + reading text)

---

## System Font Stacks (Zero Dependency)

These work everywhere, load instantly, and are the default for most projects.

### Sans-Serif (Default Body)
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji';
```

### Serif (Editorial Body)
```css
--font-serif: 'Iowan Old Style', 'Apple Garamond', 'Baskerville',
              'Times New Roman', 'Droid Serif', 'Times',
              'Source Serif Pro', serif;
```

### Monospace (Code / Data)
```css
--font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
             'Menlo', 'Courier New', monospace;
```

### System Font Pairing (No Imports)
```css
--font-heading: var(--font-sans);    /* Bold system sans-serif */
--font-body:    var(--font-sans);    /* Regular system sans-serif */
--font-code:    var(--font-mono);
```
**Best for:** SaaS, dashboards, tools — anywhere performance and native feel matter.

---

## Google Fonts Pairings

### Pairing 1: Editorial Classic
```
Heading: Playfair Display (serif, 400/700)
Body:    Source Serif 4 (serif, 400/600)
Code:    JetBrains Mono
```
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Source Serif 4', 'Iowan Old Style', serif;
```
**Best for:** Blogs, magazines, newsletters, long-form content, luxury brands.

### Pairing 2: Modern Professional
```
Heading: Inter (sans-serif, 600/700/800)
Body:    Inter (sans-serif, 400/500)
Code:    Fira Code
```
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Inter', -apple-system, sans-serif;
--font-body:    'Inter', -apple-system, sans-serif;
```
**Best for:** SaaS products, dashboards, developer tools, B2B — the "serious product" default of 2024-2026.

### Pairing 3: Warm & Human
```
Heading: Fraunces (serif, 400/600)
Body:    DM Sans (sans-serif, 400/500)
Code:    IBM Plex Mono
```
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Fraunces', Georgia, serif;
--font-body:    'DM Sans', -apple-system, sans-serif;
```
**Best for:** Wellness, lifestyle, food/beverage, personal brands, creative services.

### Pairing 4: Geometric + Clean
```
Heading: Poppins (geometric sans, 600/700)
Body:    Inter (sans-serif, 400/500)
Code:    Fira Code
```
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Poppins', -apple-system, sans-serif;
--font-body:    'Inter', -apple-system, sans-serif;
```
**Best for:** Landing pages, marketing sites, consumer apps — the "friendly startup" look.

### Pairing 5: Bold Display + Neutral Body
```
Heading: Bebas Neue (display, 400)
Body:    Source Sans 3 (sans-serif, 400/600)
Code:    JetBrains Mono
```
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Bebas Neue', 'Arial Narrow', sans-serif;
--font-body:    'Source Sans 3', -apple-system, sans-serif;
```
**Best for:** Neubrutalist designs, creative agencies, event pages, portfolios.

### Pairing 6: Elegant Serif + Clean Sans
```
Heading: Cormorant Garamond (serif, 500/700)
Body:    Inter (sans-serif, 400)
Code:    Source Code Pro
```
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=Inter:wght@400&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Cormorant Garamond', Garamond, serif;
--font-body:    'Inter', -apple-system, sans-serif;
```
**Best for:** High-end e-commerce, fashion, beauty, luxury hospitality.

### Pairing 7: Monospace + Sans (Developer Aesthetic)
```
Heading: Space Mono (monospace, 700)
Body:    Inter (sans-serif, 400/500)
Code:    Space Mono
```
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Space Mono', 'Courier New', monospace;
--font-body:    'Inter', -apple-system, sans-serif;
--font-code:    'Space Mono', 'Courier New', monospace;
```
**Best for:** Developer tools, tech blogs, CLI-style UIs, API documentation.

### Pairing 8: Friendly Rounded
```
Heading: Nunito (rounded sans, 700/800)
Body:    Nunito Sans (sans-serif, 400/600)
Code:    Fira Code
```
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600&display=swap" rel="stylesheet">
```
```css
--font-heading: 'Nunito', -apple-system, sans-serif;
--font-body:    'Nunito Sans', -apple-system, sans-serif;
```
**Best for:** EdTech, children's products, community platforms, friendly consumer apps.

---

## CJK (Chinese / Japanese / Korean) Font Stacks

### Chinese (Simplified) — Sans-Serif
```css
--font-cjk-sans: 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB',
                 'WenQuanYi Micro Hei', -apple-system, sans-serif;
```

### Chinese (Simplified) — Serif
```css
--font-cjk-serif: 'Noto Serif SC', 'Source Han Serif SC', 'SimSun',
                  'STSong', 'Songti SC', serif;
```

### Japanese — Sans-Serif
```css
--font-jp-sans: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN',
                'Noto Sans JP', 'Yu Gothic', 'MS PGothic', sans-serif;
```

### Japanese — Serif
```css
--font-jp-serif: 'Hiragino Mincho ProN', 'Noto Serif JP',
                 'Yu Mincho', 'MS PMincho', serif;
```

### Korean — Sans-Serif
```css
--font-kr-sans: 'Noto Sans KR', 'Nanum Gothic', 'Malgun Gothic',
                'Apple SD Gothic Neo', sans-serif;
```

---

## Size Scale Reference

Use a consistent type scale. Choose one:

### Minor Third (1.2) — Compact, data-dense UIs
```
12 / 14 / 16 / 19 / 23 / 28 / 33 / 40 / 48px
```

### Major Third (1.25) — General purpose (recommended default)
```
12 / 15 / 19 / 24 / 30 / 38 / 48 / 60 / 75px
```

### Perfect Fourth (1.333) — Editorial, spacious
```
14 / 19 / 25 / 33 / 44 / 59 / 79 / 105 / 140px
```

### Golden Ratio (1.618) — Dramatic, luxury
```
12 / 19 / 31 / 50 / 81 / 131px
```

---

## CSS Setup Template

```css
:root {
  /* ── Font families ── */
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body:    'DM Sans', -apple-system, sans-serif;
  --font-code:    'JetBrains Mono', 'Fira Code', monospace;

  /* ── Type scale (Major Third) ── */
  --text-xs:   0.75rem;    /* 12px */
  --text-sm:   0.875rem;   /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg:   1.25rem;    /* 20px */
  --text-xl:   1.5rem;     /* 24px */
  --text-2xl:  1.875rem;   /* 30px */
  --text-3xl:  2.375rem;   /* 38px */
  --text-4xl:  3rem;       /* 48px */
  --text-5xl:  3.75rem;    /* 60px */

  /* ── Line heights ── */
  --leading-tight:  1.2;   /* Headings */
  --leading-normal: 1.5;   /* UI body */
  --leading-relaxed: 1.7;  /* Long-form reading */

  /* ── Font weights ── */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

/* ── Apply ── */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  font-weight: var(--weight-normal);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);
}

h1 { font-size: var(--text-4xl); font-weight: var(--weight-bold); }
h2 { font-size: var(--text-3xl); font-weight: var(--weight-bold); }
h3 { font-size: var(--text-2xl); font-weight: var(--weight-semibold); }
h4 { font-size: var(--text-xl);  font-weight: var(--weight-semibold); }

code, pre {
  font-family: var(--font-code);
}
```

---

## How to Use

1. **Pick pairing first, then palette.** Typography sets the tone; color reinforces it.
2. **Start with system fonts.** If the design works with system fonts, keep them — zero latency, native rendering.
3. **Load Google Fonts with `display=swap`.** Prevents invisible text during load (FOIT).
4. **Two families maximum.** Heading + body. Adding a third (e.g., for quotes) is usually unnecessary complexity.
5. **For CJK projects:** Test rendering. Noto fonts are safest for cross-platform; platform-native fonts (PingFang, Hiragino) look best on their target OS.
