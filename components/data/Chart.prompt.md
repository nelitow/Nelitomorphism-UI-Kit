Chart — canvas line/area/bars with glow stroke. Its loading state IS the chart: animated noise waves at final size that morph into the real series when data lands (never a placeholder box).

```jsx
<Chart data={values} type="area" height={140} loading={isLoading}/>
<Chart series={[{data:a},{data:b,tone:'accent2'}]} type="line"/>
```
