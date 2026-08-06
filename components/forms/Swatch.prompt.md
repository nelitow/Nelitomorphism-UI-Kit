Swatch — circular colour control. Physical colour is the one place the kit lets something other than cyan glow: the selected swatch blooms in its own colour. Fine swatches stay 16px; touch keeps the visual swatch compact inside a 44px transparent hit area.

```jsx
<Swatch color={[80,225,255]} active onChange={setRgb}/>
<SwatchGroup label="Colour" colors={[[255,64,40],[255,168,64],[90,225,150],[80,225,255],[180,130,255]]} value={rgb} onChange={setRgb}/>
```

Accepts `"#0af"`/`"var(--accent)"` or `[r,g,b]`; selection is compared by resolved CSS value. Pair with Chip rows for white-balance presets.
