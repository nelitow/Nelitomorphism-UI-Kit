useBreakpoint — the kit is responsive by computation, not by media queries: components style themselves inline, so they read layout and input density from this hook.

```jsx
const { tight, compact, touch } = useBreakpoint();
const d = density(touch);
<div style={{gridTemplateColumns: compact ? '1fr' : 'minmax(0,1.7fr) minmax(0,1fr)'}}/>
<button style={{height: d.control}}/>
```

Breakpoints: `tight` < 560 (phone portrait, stack everything) · `compact` < 900 (sidebar → rail, tables → stacked records) · `wide` ≥ 1280 (full two-column composition). `touch` is input density, not width: coarse pointers get 44px hit areas and 16px fields so iOS never zooms on focus.

Every kit component already applies this internally — reach for it in app layouts, not to re-style components.
