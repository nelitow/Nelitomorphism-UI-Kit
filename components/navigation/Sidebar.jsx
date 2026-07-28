import React from "react";
import { Badge } from "../core/Badge.jsx";

/**
 * Sidebar — compact nav rail. items: [{id, label, icon?, count?, badge?}] with optional {section} dividers.
 * The active marker is a glowing bar that springs between items.
 */
export function Sidebar({ items = [], value, onChange, header, footer, width = 216, style, ...rest }) {
  const refs = React.useRef({});
  const [mark, setMark] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setMark({ top: el.offsetTop, height: el.offsetHeight });
  }, [value, items.length]);
  return (
    <nav {...rest} style={{ width, flexShrink: 0, display: "flex", flexDirection: "column", gap: 2, padding: "var(--sp-3)",
      background: "var(--surface-panel)", borderRight: "1px solid var(--edge-1)", position: "relative", minHeight: 0, ...style }}>
      {header && <div style={{ padding: "4px 8px 12px" }}>{header}</div>}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 2, overflow: "auto", flex: 1, minHeight: 0 }}>
        {mark && <span style={{ position: "absolute", left: 0, width: 2, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
          top: mark.top, height: mark.height, transition: "top var(--dur-3) var(--ease-spring), height var(--dur-3) var(--ease-spring)" }} />}
        {items.map((it, i) => it.section ? (
          <div key={"s" + i} style={{ padding: "14px 8px 4px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{it.section}</div>
        ) : (
          <button key={it.id} type="button" ref={(el) => (refs.current[it.id] = el)} onClick={() => onChange?.(it.id)}
            onPointerEnter={(e) => { if (it.id !== value) e.currentTarget.style.background = "oklch(1 0 0 / 0.05)"; }}
            onPointerLeave={(e) => { if (it.id !== value) e.currentTarget.style.background = "transparent"; }}
            style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 10px", borderRadius: "var(--r-1)", border: "none", cursor: "pointer", textAlign: "left",
              background: it.id === value ? "var(--accent-dim)" : "transparent",
              color: it.id === value ? "var(--text-body)" : "var(--text-dim)",
              fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: it.id === value ? "var(--weight-medium)" : "var(--weight-body)",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out)" }}>
            {it.icon && <span style={{ width: 15, display: "inline-flex", justifyContent: "center", color: it.id === value ? "var(--accent)" : "var(--text-faint)", transition: "color var(--dur-2) var(--ease-out)" }}>{it.icon}</span>}
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
            {it.count != null && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>{it.count}</span>}
            {it.badge && <Badge tone={it.badge.tone || "accent"}>{it.badge.label}</Badge>}
          </button>
        ))}
      </div>
      {footer && <div style={{ padding: "12px 8px 4px", borderTop: "1px solid var(--edge-1)", marginTop: 8 }}>{footer}</div>}
    </nav>
  );
}
