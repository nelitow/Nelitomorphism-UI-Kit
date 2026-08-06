Chip — compact uppercase mono toggle for presets, filters and quick values. It is 22px tall on fine pointers and 30px on touch; the selected chip is the glowing one.

```jsx
<Chip active onClick={() => set(2200)}>2200K</Chip>
<Chip onClick={() => set(4000)}>4000K</Chip>
<Chip tone="accent2" active>Traces</Chip>
```

Use for mutually exclusive presets in a row. For status use Badge, for keys use Kbd, for a real form control use Select.
