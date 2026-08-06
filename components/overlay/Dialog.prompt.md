Dialog — glass modal that springs in while the page defocuses behind it. Esc / backdrop click close.

On tight screens it becomes a safe-area-aware bottom sheet with a scrolling body and stacked footer actions.

```jsx
<Dialog open={open} title="Revoke key" onClose={close}
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger">Revoke</Button></>}>
  This action is immediate.
</Dialog>
```
