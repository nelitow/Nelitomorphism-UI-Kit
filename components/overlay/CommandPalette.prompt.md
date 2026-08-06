CommandPalette — ⌘K glass overlay; fuzzy filter, arrow-key nav, 20ms result stagger. Mount once; it manages its own hotkey unless `open` is controlled.

On touch screens it docks below the safe area, uses a 16px search field, and hides keyboard hint chips.

```jsx
<CommandPalette commands={[
  {group:'nav', label:'Go to Deployments', action:go},
  {group:'run', label:'Trigger deploy', hint:'⌘D', action:deploy},
]}/>
```
