# Stat

```jsx
<Stat label="Requests" value={2841203} format={v=>(v/1e6).toFixed(2)+'M'} delta="8.2%" up loading={loading}/>
<Stat label="P95 latency" value={86} format={v=>v+'ms'} delta="4.1%" up={false} hint="vs prev 24h"/>
```

The dashboard KPI primitive. Numbers count up via Resolve; structure never loads. Tight layouts use fluid metric sizing and truncate delta and hint text.
