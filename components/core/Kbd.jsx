import React from "react";

/** Keyboard chip — the same affordance CommandPalette renders internally. <Kbd>⌘K</Kbd> */
export function Kbd({ children, style, ...rest }) {
  return (
    <kbd {...rest} style={{
      fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1, color: "var(--text-dim)",
      border: "1px solid var(--edge-1)", borderBottomColor: "var(--edge-2)", borderRadius: 4,
      background: "oklch(1 0 0 / 0.04)", padding: "3px 5px 4px", display: "inline-block", verticalAlign: "middle", ...style,
    }}>{children}</kbd>
  );
}
