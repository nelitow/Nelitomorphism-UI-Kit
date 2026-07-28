Sidebar — compact nav rail; the glowing active bar springs between items; supports section dividers, counts, badges.

```jsx
<Sidebar value={page} onChange={setPage} header={<Logo/>} items={[
  {section:'Monitor'},
  {id:'overview', label:'Overview', icon:'◆'},
  {id:'events', label:'Events', count:412},
]}/>
```
