Toast — mount `<ToastStack/>` once, then call `toast()` from anywhere. Glass cards spring in bottom-right with a glowing timer line.

```jsx
<ToastStack/>
toast("Deploy complete", { tone: "ok", detail: "build 4821 → production" });
```
