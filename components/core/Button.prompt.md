Button — the primary variant carries a live WebGL iridescent material; press scales to 0.97; loading keeps the button fully rendered and runs a light sweep (never a spinner).

```jsx
<Button variant="primary" size="md" onClick={fn}>Deploy</Button>
<Button loading>Syncing</Button>
<Button variant="danger" size="sm">Revoke</Button>
```

Variants: primary / secondary (default) / ghost / danger. Sizes: sm 24px, md 30px, lg 38px.
