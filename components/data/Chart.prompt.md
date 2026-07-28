# Chart

```jsx
<Chart data={values} type="area" height={140} loading={isLoading}/>
<Chart series={[{data:a},{data:b,tone:'accent2'}]} type="line"/>
<Chart data={perYear} labels={years} type="bars" height={150}/>
```

types: line | area | bars. Short series (>=2 points) render at their real length — no padding.
`labels` draws mono x-axis ticks (auto-thinned to fit width).
