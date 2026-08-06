Sidebar — compact nav rail; the glowing active bar springs between items; supports section dividers, counts, badges. Below 900px it becomes a horizontally scrollable top rail: sections become hairlines, the footer is hidden, and the active marker underlines the item. Coarse pointers use 44px item targets.

```jsx
<Sidebar value={page} onChange={setPage} header={<Logo/>} items={[
  {section:'Monitor'},
  {id:'overview', label:'Overview', icon:'◆'},
  {id:'events', label:'Events', count:412},
]}/>
```
