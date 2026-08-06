# Nelitomorphism

A highly opinionated, dark-only, computer-native UI kit. Built from scratch (no source codebase or Figma) for SaaS, CRUD apps, and dashboards. React-compatible; consumers link `styles.css` and import components from the bundle.

## The idea
Nelitomorphism refuses to imitate physical materials. It is what a computer does best: precise light, instant structure, choreographed state. Its defining law: **structure is never loading**. Components render fully formed — final layout, final chrome — and only their *content* materializes in place (text resolves from scrambled glyphs, numbers count up, charts draw in). No skeletons, no spinners, ever.

## Principles
1. **Structure first** — a loading component is the finished component with resolving content.
2. **Choreographed state** — every transition is intentional: spring easings, per-item stagger, directional motion.
3. **Computer-native light** — glow, refraction, and scanline texture instead of fake leather and drop shadows pretending to be sunlight.
4. **Compact & dense** — density adapts without abandoning the 4px grid: fine pointers use 30px controls and 13.5px body; coarse pointers use 44px hit areas and 16px fields so iOS never zooms.
5. **No retro-compat, no a11y compromise constraints** — latest CSS (oklch, linear() springs, backdrop-filter), WebGL where it earns its cost (button/card materials).

## Content fundamentals
- Tone: confident, futuristic, technical. Short declaratives. "Deploy", "Resolve", "Synced 4s ago".
- Sentence case everywhere; UPPERCASE only for micro-labels (tracked +0.08em, 11px, mono).
- Numbers and metadata are always mono (`--font-mono`).
- Direct address: "Your key expires in 3 days." No exclamation marks, no emoji.
- Empty states state a fact + one action: "No events yet. Connect a source."

## Visual foundations
- **Color**: cool near-blacks (hue 250) in 4 elevation steps (`--bg-0…3`). Text in 3 steps. Two accents at equal L/C — cyan `--accent` (h195, primary) and violet `--accent-2` (h305, secondary/data). Status: ok/warn/danger. Every accent has a `-dim` 14%-alpha wash.
- **Type**: Geist (UI) + Geist Mono (numbers, labels, code). Compact scale, 13.5px base.
- **Edges**: 1px white-alpha borders (`--edge-1/2`), not shadow-defined. Focus = cyan double ring (`--focus-ring`).
- **Elevation**: raised surfaces get an inset top-light hairline + soft black shadow (`--shadow-raise`); overlays use `--glass-bg` + `backdrop-filter: blur(16px)`.
- **Radii**: tight — 6/10/14px. Pills only for badges/switches.
- **Glow**: accent glow (`--glow-accent`) marks the active/primary thing. One glowing element per view region.
- **Texture**: optional `--scanline` overlay on hero surfaces; WebGL iridescent refraction (see `components/webgl-material.js`) on primary buttons and hero cards.
- **Motion**: `--ease-spring` (linear() spring) for enters, `--ease-out` for hovers, 120/260/480/900ms durations, 40ms stagger. Hover = lighten + hairline brighten; press = scale(0.97). Content materialize = per-character glyph resolve or count-up over `--dur-4`.
- **Imagery**: none. Data, glyphs, and light are the imagery.
- **Responsive**: components style themselves inline, so responsiveness is computed rather than expressed in media queries. Every component reads `useBreakpoint()` from `components/core/useBreakpoint.js` for `{tight, compact, wide, touch}`: `tight` is <560px, `compact` is <900px, `wide` is >=1280px, and `touch` is `(pointer: coarse)` independent of width. Below `compact`, Sidebar becomes a horizontal rail, Tables become stacked records, and two-column compositions collapse to one; below `tight`, Dialogs become bottom sheets and CommandPalette docks to the top. `--text-lg`, `--text-xl`, and `--text-display` are fluid `clamp()` tokens; `--safe-*` carries `env(safe-area-inset-*)`. Screens ship `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.

## Iconography
No brand icon set was provided. The kit uses **Lucide** (CDN, stroke 1.5) as a placeholder system — flagged as a substitution; swap in a proprietary set when one exists. No emoji, ever. Unicode arrows/glyphs (→, ↗, ◆) are allowed in copy as micro-icons.

## Logo
No logo provided; render "NELITOMORPHISM" or "NELI" in Geist Mono 600, tracked wide, wherever a mark would go.

## Index
- `styles.css` → imports `tokens/` (colors, typography, spacing, motion, effects, fonts, base).
- `components/` — core/ (Button, Card, Badge, Kbd, Chip, SectionLabel, useBreakpoint) · forms/ (Input, Select, Checkbox, Switch, Slider, Swatch, DatePicker, FileUpload) · overlay/ (Dialog, Toast, Tooltip, CommandPalette) · data/ (Table, Chart, Progress, Resolve, Stat, Timeline) · navigation/ (Sidebar, Topbar, Tabs) · `webgl-material.js` (shader helper).
- `guidelines/` — foundation specimen cards.
- `ui_kits/dashboard/` — analytics dashboard showcase.
- `SKILL.md` — agent skill entry point.

## Intentional additions
- **Resolve** (replaces Skeleton): the transitional-loader primitive that materializes content inside already-final structure — the kit's signature.
- **webgl-material.js**: shared WebGL iridescent material used by Button/Card hero variants.
