Button — primary carries a live WebGL iridescent material; press scales to 0.97; loading keeps the button rendered and runs a light sweep (never a spinner). Heights follow input density: sm/md/lg are 26/30/38px on fine pointers and expand for touch.

```jsx
<Button variant="primary" size="md" onClick={fn}>Deploy</Button>
<Button loading>Syncing</Button>
<Button variant="danger" size="sm">Revoke</Button>
```

Variants: primary / secondary (default) / ghost / danger.
