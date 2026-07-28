Resolve — the kit's signature loader, replacing skeletons and spinners. The component's structure is always final; only content materializes: text scrambles then locks in left-to-right, numbers count up, blocks defocus then sharpen.

```jsx
<Resolve loading={isLoading}>Payments synced</Resolve>
<Resolve loading={isLoading} format={v => `$${v.toLocaleString()}`}>{48210}</Resolve>
<ResolveBlock loading={isLoading}><Chart data={points}/></ResolveBlock>
```

Never pair with a spinner. Use `Resolve` for text/numbers, `ResolveBlock` for charts and rich regions.
