Toast — mount `<ToastStack/>` once, then call `toast()` from anywhere. Glass cards spring in bottom-right with a glowing timer line.

The stack respects safe areas and expands between tight-screen gutters.

```jsx
<ToastStack/>
toast("Deploy complete", { tone: "ok", detail: "build 4821 → production" });
```
