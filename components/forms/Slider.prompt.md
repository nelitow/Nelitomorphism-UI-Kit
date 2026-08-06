Slider — pointer-driven track with glowing fill; thumb blooms while dragging; mono readout lights up. Its touch hit strip grows to 32px without thickening the 4px track.

```jsx
<Slider label="Timeout" min={0} max={5000} step={100} value={v} onChange={setV} unit="ms"/>
```

`disabled` dims the track and ignores pointer input — use it when the target is off or unreachable, never a spinner.
