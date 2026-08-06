Topbar — 44px sticky glass bar: mono breadcrumb left, center slot, actions right. Below 900px the center moves to its own row and the path truncates; below 560px only the current page segment is shown. Coarse pointers use touch-density rows.

```jsx
<Topbar path={['acme','prod']} center={<SearchTrigger/>} actions={<><Badge tone="ok" dot pulse>Live</Badge><Button size="sm" variant="primary">Deploy</Button></>}/>
```
