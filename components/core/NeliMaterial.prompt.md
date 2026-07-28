WebGL iridescent material layer — absolutely fills its `position:relative` parent; use behind content in primary Buttons and hero Cards.

```jsx
<div style={{position:'relative', borderRadius:'var(--r-2)', overflow:'hidden'}}>
  <NeliMaterial intensity={0.8}/>
  <div style={{position:'relative'}}>content</div>
</div>
```

Props: `hue`/`hue2` (degrees, defaults 195/305), `intensity`, `speed`. Pauses offscreen automatically.
