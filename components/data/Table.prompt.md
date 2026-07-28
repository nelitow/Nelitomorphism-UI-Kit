Table — compact sortable data table; rows cascade in with 40ms stagger; loading shows real rows with scrambling glyph cells.

```jsx
<Table
  columns={[{key:'name',label:'Service'},{key:'p95',label:'P95',align:'right',mono:true}]}
  rows={data} loading={isLoading} onRowClick={open}/>
```

Set `mono: true` on numeric/id columns. Click a header to sort.
