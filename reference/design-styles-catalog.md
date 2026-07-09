# Design Styles Catalog

A parameterized catalog of design styles for the Vibe Design Arena. Each entry provides concrete, actionable parameters that a sub-agent can implement directly. When proposing three styles to a user, mix across categories to ensure differentiation.

---

## Quick-Select: Which Three Styles?

Use this decision matrix to pick three contrasting styles based on the product context. **Never pick two from the same category.**

| Product Type | Target User | Recommended Trio |
|-------------|-------------|------------------|
| SaaS dashboard | Data analysts, ops teams | Swiss International + Dark Mode Professional + Bento Grid |
| SaaS landing page | Decision-makers, managers | Bold Gradient + Editorial Magazine + Swiss International |
| Developer tool | Engineers, developers | Dark Mode Professional + Monospace/Sans + Neubrutalism |
| E-commerce (fashion) | Shoppers, 20-40 | Luxury High-Fashion + Editorial Magazine + Organic Biophilic |
| E-commerce (general) | Consumers, broad | Bold Gradient + Bento Grid + Warm Honey palette |
| Health & wellness | General consumers | Organic Biophilic + Japanese Zen + Glassmorphism |
| Fintech / Banking | Account holders, all ages | Enterprise Data-Dense + Swiss International + Editorial Magazine |
| Education / Learning | Students, teachers | Friendly Rounded (Nunito pairing) + Bento Grid + Organic Biophilic |
| Creative portfolio | Clients, recruiters | Neubrutalism + Editorial Magazine + Japanese Zen |
| Gaming / Entertainment | Gamers, 16-30 | Retro-Futuristic + Bold Gradient + Dark Mode Professional |
| Social / Community | Users, 18-35 | Glassmorphism + Bento Grid + Bold Gradient |
| Enterprise admin | Internal employees | Enterprise Data-Dense + Swiss International + Dark Mode Professional |

**If the product doesn't fit any row:** Default to "Swiss International + Bold Gradient + Organic Biophilic" — this covers professional / creative / warm, giving the user the widest contrast.

**Mixing rule:** At least one style should feel "safe" (what the user expects), at least one should feel "bold" (what surprises them). The third can be a wildcard based on the specific product context.

---

## Category: Professional & Restrained

### 1. Swiss International (Minimalist)

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Content is the interface. Remove everything that isn't information. |
| **Primary** | `#1a1a1a` (near-black) |
| **Secondary** | `#ffffff` (white) |
| **Accent** | `#e94560` (signal red) or `#0066ff` (system blue) |
| **Background** | `#fafafa` (off-white) |
| **Surface** | `#ffffff` |
| **Text** | `#1a1a1a` heading / `#444444` body |
| **Muted** | `#888888` |
| **Font** | System sans-serif stack; headings in bold weights (700+); body at 400 |
| **Heading scale** | 48/32/24/18/16px |
| **Body size** | 16px, line-height 1.6 |
| **Border radius** | 0-4px (sharp to slightly rounded) |
| **Shadows** | None or minimal (0 1px 3px rgba(0,0,0,0.08)) |
| **Spacing scale** | 8/16/24/32/48/64px (strict 8px grid) |
| **Layout** | Asymmetric grid; generous whitespace; single-column content |
| **Interaction** | Hover underlines; instant transitions; no motion flair |
| **Best for** | SaaS dashboards, documentation sites, professional tools, portfolios |
| **References** | Linear, Stripe docs, Helvetica (the film poster) |

### 2. Enterprise Data-Dense

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Maximum information density without sacrificing scanability. |
| **Primary** | `#1e3a5f` (dark navy) |
| **Secondary** | `#f0f4f8` (cool gray) |
| **Accent** | `#0066cc` (corporate blue) |
| **Background** | `#f4f6f8` |
| **Surface** | `#ffffff` |
| **Text** | `#1a2332` heading / `#37474f` body |
| **Muted** | `#90a4ae` |
| **Font** | System sans-serif; tabular numbers for data (`font-variant-numeric: tabular-nums`) |
| **Heading scale** | 28/22/18/16/14px |
| **Body size** | 14px, line-height 1.5 |
| **Border radius** | 2-4px |
| **Shadows** | Subtle: `0 1px 2px rgba(0,0,0,0.06)` for cards; `0 4px 12px rgba(0,0,0,0.1)` for dropdowns |
| **Spacing scale** | 4/8/12/16/24/32px (compact) |
| **Layout** | Multi-column; sticky headers; filter bars; data tables |
| **Interaction** | Row hover highlights; sortable columns; inline editing |
| **Best for** | Admin panels, BI dashboards, CRM systems, data-heavy tools |
| **References** | Salesforce, Tableau, Bloomberg Terminal |

### 3. Dark Mode Professional

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Reduce eye strain for long-duration use. Light on dark, not dark on light. |
| **Primary** | `#90caf9` (light blue — primary on dark) |
| **Secondary** | `#1e1e1e` (dark surface) |
| **Accent** | `#64b5f6` (lighter blue) |
| **Background** | `#0d1117` (deep dark) |
| **Surface** | `#161b22` (card bg) |
| **Text** | `#e6edf3` heading / `#8b949e` body |
| **Muted** | `#484f58` |
| **Font** | System sans-serif; slightly looser letter-spacing (+0.01em) for readability on dark |
| **Heading scale** | 36/28/22/18/16px |
| **Body size** | 15px, line-height 1.65 |
| **Border radius** | 6px |
| **Shadows** | None; use borders instead (`1px solid #30363d`) |
| **Spacing scale** | 8/16/24/32/48px |
| **Layout** | Sidebar + content; split panes; tab-based navigation |
| **Interaction** | Subtle glow on focus; border color changes on hover |
| **Best for** | Developer tools, IDEs, code editors, night-mode dashboards |
| **References** | GitHub dark mode, VS Code, Spotify |

---

## Category: Playful & Creative

### 4. Bold Gradient

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Color IS the interface. Gradients guide the eye and create energy. |
| **Primary** | `#667eea` → `#764ba2` (purple gradient) |
| **Secondary** | `#f093fb` → `#f5576c` (pink gradient) |
| **Accent** | `#ffd700` (gold) |
| **Background** | `#0f0c29` → `#302b63` → `#24243e` (dark gradient) |
| **Surface** | `rgba(255,255,255,0.05)` with `backdrop-filter: blur(10px)` |
| **Text** | `#ffffff` headings / `rgba(255,255,255,0.8)` body |
| **Muted** | `rgba(255,255,255,0.45)` |
| **Font** | Display: Poppins / Body: Inter; headings at 700+ weight |
| **Heading scale** | 56/40/28/22/18px |
| **Body size** | 16px, line-height 1.7 |
| **Border radius** | 16-24px (large, pill-shaped) |
| **Shadows** | Colored glow: `0 0 40px rgba(102,126,234,0.3)` |
| **Spacing scale** | 12/24/36/48/72/96px (generous) |
| **Layout** | Full-screen hero; staggered card grid; floating elements |
| **Interaction** | Scale on hover (1.02x); gradient shift transitions; parallax scroll |
| **Best for** | Landing pages, event sites, creative portfolios, product launches |
| **References** | Stripe (old design), Linear (marketing pages), Vercel |

### 5. Neubrutalism

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Raw, honest, anti-design. Heavy borders and primary colors. |
| **Primary** | `#ffeb3b` (yellow) or `#ff6b6b` (coral red) |
| **Secondary** | `#ffffff` (white) |
| **Accent** | `#00d2ff` (cyan) |
| **Background** | `#fffdf7` (warm white) or `#c8d6e5` (muted blue) |
| **Surface** | `#ffffff` with `border: 3px solid #1a1a1a` |
| **Text** | `#1a1a1a` (black — no gray text allowed) |
| **Muted** | N/A — neubrutalism doesn't mute |
| **Font** | Display: Bebas Neue or Impact / Body: Space Grotesk or system sans-serif |
| **Heading scale** | 64/48/32/24/18px (loud) |
| **Body size** | 18px, line-height 1.4 |
| **Border radius** | 0px (sharp — essential to the style) |
| **Shadows** | Hard offset: `4px 4px 0 #1a1a1a` (no blur) |
| **Spacing scale** | 16/24/32/48/64px |
| **Layout** | Bold sections with thick separators; asymmetric; large typography |
| **Interaction** | Button press: shadow + translate (2px, 2px); hard transitions |
| **Best for** | Creative agencies, personal brands, design tools, Gen Z products |
| **References** | Figma (marketing site), Gumroad, A24 films |

### 6. Glassmorphism

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Depth through transparency. Layers create hierarchy. |
| **Primary** | `#4facfe` → `#00f2fe` (cyan gradient) |
| **Secondary** | `#fa709a` → `#fee140` (warm gradient) |
| **Accent** | `#ffffff` |
| **Background** | Vibrant gradient or image with blur; colored shapes for depth |
| **Surface** | `rgba(255,255,255,0.15)` with `backdrop-filter: blur(20px)` and `border: 1px solid rgba(255,255,255,0.2)` |
| **Text** | `#ffffff` (must pass 4.5:1 on the colored bg behind the glass) |
| **Muted** | `rgba(255,255,255,0.5)` |
| **Font** | Inter or SF Pro Display; semi-bold headings |
| **Heading scale** | 48/36/28/22/18px |
| **Body size** | 16px, line-height 1.6 |
| **Border radius** | 16-24px |
| **Shadows** | Subtle inner highlight + outer glow |
| **Spacing scale** | 16/24/32/48/64px |
| **Layout** | Floating cards over animated backgrounds; layered depth |
| **Interaction** | Scale + blur change on hover; smooth 300ms ease-out transitions |
| **Best for** | Weather apps, music players, lifestyle products, SaaS hero sections |
| **References** | macOS Big Sur, Microsoft Fluent Design, Dribbble shots |

---

## Category: Minimal & Elegant

### 7. Editorial / Magazine

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Typography is the design. The words are the interface. |
| **Primary** | `#1a1a1a` (ink) |
| **Secondary** | `#faf8f5` (paper) |
| **Accent** | `#c41e3a` (editorial red) |
| **Background** | `#faf8f5` (warm paper tone) or `#fffdf9` |
| **Surface** | `#ffffff` with subtle border |
| **Text** | `#1a1a1a` — high contrast; serif body text |
| **Muted** | `#6b6b6b` |
| **Font** | Heading: Playfair Display or Cormorant Garamond / Body: Source Serif 4 or Lora |
| **Heading scale** | 56/42/32/24/18px (dramatic drop) |
| **Body size** | 18px, line-height 1.75 (generous for reading) |
| **Border radius** | 0px |
| **Shadows** | None |
| **Spacing scale** | 16/32/48/64/96/128px (dramatic whitespace) |
| **Layout** | Single column; generous margins; drop caps; pull quotes; horizontal rules |
| **Interaction** | Underline links; subtle fade transitions; no motion |
| **Best for** | Blogs, news sites, long-form content, newsletters, luxury brands |
| **References** | The New Yorker, Medium, Apple News |

### 8. Japanese Zen (Wabi-Sabi)

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Beauty in imperfection. Asymmetric balance. Empty space as active element. |
| **Primary** | `#2d2d2d` (sumi ink) |
| **Secondary** | `#f5f0e8` (washi paper) |
| **Accent** | `#9b6b43` (cedar) or `#c41e3a` (vermillion) |
| **Background** | `#f5f0e8` or `#f8f4ed` (natural paper tones) |
| **Surface** | `#ffffff` with subtle texture (CSS noise) |
| **Text** | `#2d2d2d` heading / `#555555` body |
| **Muted** | `#999999` |
| **Font** | Heading: Noto Serif JP / Body: Noto Sans (or system serif + sans fallback) |
| **Heading scale** | 40/32/24/18/16px |
| **Body size** | 16px, line-height 1.8 (generous — "ma" spacing) |
| **Border radius** | 0-2px |
| **Shadows** | None or extremely subtle |
| **Spacing scale** | Based on 4px; asymmetric — not everything aligns |
| **Layout** | Asymmetric grid; large empty areas; single focal point per view |
| **Interaction** | Slow fade (400ms+); subtle scale; nothing abrupt |
| **Best for** | Wellness apps, tea/ceramics brands, meditation products, architecture portfolios |
| **References** | Muji, Uniqlo, Japanese tea ceremony aesthetics |

### 9. Luxury / High-Fashion

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Restraint signals confidence. Fewer elements, more impact. |
| **Primary** | `#000000` (black) |
| **Secondary** | `#ffffff` (white) |
| **Accent** | `#c9a96e` (gold) or `#b8860b` (dark gold) |
| **Background** | `#000000` or `#f5f0eb` (warm ivory) |
| **Surface** | Slightly lighter/darker than bg (1-2% difference) |
| **Text** | White on black; `#1a1a1a` on light |
| **Muted** | `#666666` |
| **Font** | Heading: Bodoni or Didot (high-contrast serif) / Body: system sans-serif light (300 weight) |
| **Heading scale** | 72/48/32/20/16px (extreme contrast) |
| **Body size** | 14px, line-height 1.8; generous letter-spacing (+0.05em) |
| **Border radius** | 0px |
| **Shadows** | None |
| **Spacing scale** | 24/48/72/96/144px (extreme whitespace) |
| **Layout** | Full-bleed images; text overlays; single column; large margins |
| **Interaction** | Slow crossfades (600ms+); parallax scroll; no bouncing or spring |
| **Best for** | Fashion brands, luxury goods, high-end real estate, premium services |
| **References** | Chanel, Apple, Rolex, Hermès |

---

## Category: Modern & Trend-Forward

### 10. Bento Grid

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Information as objects. Each piece of content gets its own tile. |
| **Primary** | `#1a1a2e` (dark indigo) |
| **Secondary** | `#e8e8f0` (light lavender gray) |
| **Accent** | Gradient per tile (varied — blue, purple, teal, coral) |
| **Background** | `#f0f0f5` (light gray with lilac undertone) |
| **Surface** | `#ffffff` per tile, with rounded corners |
| **Text** | `#1a1a2e` heading / `#4a4a5a` body |
| **Muted** | `#9a9aae` |
| **Font** | System sans-serif; medium weight for tile headings |
| **Heading scale** | 36/24/18/16/14px (compact within tiles) |
| **Body size** | 14px, line-height 1.5 |
| **Border radius** | 20-28px (bento tiles are notably rounded) |
| **Shadows** | Very soft: `0 2px 16px rgba(0,0,0,0.04)` |
| **Spacing scale** | 12/16/20/24px (tight grid gaps) |
| **Layout** | CSS Grid: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`; varied tile spans |
| **Interaction** | Tile scale (1.01x) + shadow lift on hover; smooth 200ms |
| **Best for** | Personal dashboards, product features pages, portfolio cards, app home screens |
| **References** | Apple iOS widgets, Linear features page, Notion templates |

### 11. Retro-Futuristic (Synthwave / Cyberpunk)

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Nostalgic future. 80s aesthetics with modern tech. |
| **Primary** | `#ff006e` (hot pink) |
| **Secondary** | `#8338ec` (purple) |
| **Accent** | `#00f5d4` (cyan/neon teal) |
| **Background** | `#0a0a1a` (deep space) with grid lines overlay |
| **Surface** | `rgba(20,20,40,0.8)` with neon border glow |
| **Text** | `#ffffff` with colored glows for emphasis |
| **Muted** | `rgba(255,255,255,0.4)` |
| **Font** | Display: Orbitron or Audiowide / Body: system monospace or Chakra Petch |
| **Heading scale** | 48/36/28/22/18px (with text-shadow glow) |
| **Body size** | 15px, line-height 1.6 |
| **Border radius** | 0-4px (angular) or 45° cuts |
| **Shadows** | Neon glow: `0 0 10px currentColor, 0 0 40px currentColor` |
| **Spacing scale** | 16/24/32/48/64px |
| **Layout** | Diagonal sections; grid overlay; scanlines effect; terminal-style panels |
| **Interaction** | Glow pulse; typewriter text effects; scanline hover |
| **Best for** | Game UI, music platforms, creative tools, hackathon projects, entertainment |
| **References** | Cyberpunk 2077, Spotify Wrapped, Stranger Things title sequence |

### 12. Organic / Biophilic

| Dimension | Specification |
|-----------|--------------|
| **Philosophy** | Nature-inspired. Curves, not corners. Earth tones, not synthetic colors. |
| **Primary** | `#2d5a27` (forest green) |
| **Secondary** | `#f4e9d8` (sand) |
| **Accent** | `#e8913a` (terracotta) or `#d4a853` (golden hour) |
| **Background** | `#faf7f2` (warm earth) or `#f5f0e6` |
| **Surface** | `#ffffff` with soft shadow |
| **Text** | `#3d3022` (dark earth) heading / `#6b5d4f` (warm gray) body |
| **Muted** | `#a89880` |
| **Font** | Heading: Fraunces or Playfair Display / Body: system sans-serif |
| **Heading scale** | 42/32/24/20/16px |
| **Body size** | 17px, line-height 1.7 |
| **Border radius** | 16-32px (pill-shaped); organic blob shapes for sections |
| **Shadows** | Soft and warm: `0 4px 20px rgba(45,90,39,0.08)` |
| **Spacing scale** | 12/24/36/48/72px |
| **Layout** | Flowing curves between sections (`border-radius` + `clip-path`); organic dividers |
| **Interaction** | Gentle scale; color shifts; leaf/flower micro-animations |
| **Best for** | Wellness apps, eco brands, gardening, sustainability, spa/hotel booking |
| **References** | Headspace, Calm, Allbirds, Patagonia |

---

## How to Use This Catalog

1. **Pick three from different categories.** Never propose two from the same category — they won't feel distinct enough.
2. **Adapt to the product.** A SaaS dashboard → Professional category. A consumer app → Playful category. A brand site → Minimal category.
3. **Fill in real content.** The specs above are parameters. The sub-agent must populate them with the user's actual product content.
4. **Mix a wildcard.** Two expected styles + one bold curveball = more interesting user reaction.
