# Neli·Ops — Analytics dashboard showcase

The reference composition for Nelitomorphism: an ops/analytics dashboard where every component family appears in real use.

What to look for:
- On load, structure renders instantly; KPIs scramble→count up, charts draw noise→morph into data, table cells resolve. No skeletons.
- `Deploy` → dialog → progress in the header + toasts on queue/complete.
- ⌘K opens the command palette; sidebar/tabs markers spring between items.
- Hero "Edge capacity" card runs the WebGL material.
- Change the range select to re-trigger the materialize cycle.
- The composition is fully responsive: sidebar rail, single-column stack, stacked table records, and bottom-sheet dialog; it is the reference for how app layouts consume `useBreakpoint()`.

Single-file (`index.html`) using the compiled bundle; resize to any width — grids collapse gracefully.
