Dialog — glass modal that springs in while the page defocuses behind it. Esc / backdrop click close.

```jsx
<Dialog open={open} title="Revoke key" onClose={close}
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger">Revoke</Button></>}>
  This action is immediate.
</Dialog>
```
