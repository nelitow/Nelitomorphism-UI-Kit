import React from "react";
import { Badge } from "../core/Badge.jsx";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/**
 * Sidebar — compact nav rail. items: [{id, label, icon?, count?, badge?}] with optional {section} dividers.
 * The active marker is a glowing bar that springs between items.
 */
export function Sidebar({ items = [], value, onChange, header, footer, width = 216, style, ...rest }) {
  const { compact, touch } = useBreakpoint();
  const d = density(touch);
  const refs = React.useRef({});
  const scrolledRail = React.useRef(false);
  const [mark, setMark] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = refs.current[value];
    if (el) setMark(compact ? { left: el.offsetLeft, width: el.offsetWidth } : { top: el.offsetTop, height: el.offsetHeight });
    else setMark(null);
  }, [compact, value, items.length]);
  React.useEffect(() => {
    if (!compact) {
      scrolledRail.current = false;
      return;
    }
    if (!scrolledRail.current) {
      scrolledRail.current = true;
      return;
    }
    refs.current[value]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [compact, value]);
  return (
    <nav {...rest} style={{ width: compact ? "100%" : width, maxWidth: compact ? "100%" : undefined, boxSizing: compact ? "border-box" : undefined,
      flexShrink: 0, display: "flex", flexDirection: compact ? "row" : "column", alignItems: compact ? "stretch" : undefined, gap: 2, padding: "var(--sp-3)",
      background: "var(--surface-panel)", borderRight: compact ? "none" : "1px solid var(--edge-1)", borderBottom: compact ? "1px solid var(--edge-1)" : undefined, position: "relative", minHeight: 0, ...style }}>
      {header && <div style={{ flex: compact ? "0 0 auto" : undefined, padding: compact ? "4px 8px" : "4px 8px 12px", whiteSpace: compact ? "nowrap" : undefined }}>{header}</div>}
      <div style={{ position: "relative", display: "flex", flexDirection: compact ? "row" : "column", alignItems: compact ? "center" : undefined, gap: 2,
        overflow: compact ? "hidden" : "auto", overflowX: compact ? "auto" : undefined, overflowY: compact ? "hidden" : undefined, WebkitOverflowScrolling: compact ? "touch" : undefined,
        scrollbarWidth: compact ? "none" : undefined, whiteSpace: compact ? "nowrap" : undefined, flex: 1, minWidth: compact ? 0 : undefined, minHeight: 0 }}>
        {mark && (compact ? (
          <span style={{ position: "absolute", bottom: 0, height: 2, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
            left: mark.left, width: mark.width, transition: "left var(--dur-3) var(--ease-spring), width var(--dur-3) var(--ease-spring)" }} />
        ) : (
          <span style={{ position: "absolute", left: 0, width: 2, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
            top: mark.top, height: mark.height, transition: "top var(--dur-3) var(--ease-spring), height var(--dur-3) var(--ease-spring)" }} />
        ))}
        {items.map((it, i) => it.section ? (
          compact ? (
            <div key={"s" + i} aria-hidden="true" style={{ flex: "0 0 1px", width: 1, height: 18, alignSelf: "center", margin: "0 var(--sp-2)", background: "var(--edge-1)" }} />
          ) : (
            <div key={"s" + i} style={{ padding: "14px 8px 4px", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{it.section}</div>
          )
        ) : (
          <button key={it.id} type="button" ref={(el) => (refs.current[it.id] = el)} onClick={() => onChange?.(it.id)}
            onPointerEnter={(e) => { if (it.id !== value) e.currentTarget.style.background = "oklch(1 0 0 / 0.05)"; }}
            onPointerLeave={(e) => { if (it.id !== value) e.currentTarget.style.background = "transparent"; }}
            style={{ display: "flex", flex: compact ? "0 0 auto" : undefined, alignItems: "center", gap: 9, height: compact ? d.control : undefined, minHeight: !compact && touch ? d.control : undefined,
              padding: compact ? "0 12px" : "6px 10px", borderRadius: "var(--r-1)", border: "none", cursor: "pointer", textAlign: "left",
              background: it.id === value ? "var(--accent-dim)" : "transparent",
              color: it.id === value ? "var(--text-body)" : "var(--text-dim)",
              fontFamily: compact ? "var(--font-mono)" : "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: it.id === value ? "var(--weight-medium)" : "var(--weight-body)",
              transition: "background var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out)" }}>
            {it.icon && <span style={{ width: 15, display: "inline-flex", justifyContent: "center", color: it.id === value ? "var(--accent)" : "var(--text-faint)", transition: "color var(--dur-2) var(--ease-out)" }}>{it.icon}</span>}
            <span style={{ flex: compact ? undefined : 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label}</span>
            {it.count != null && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)" }}>{it.count}</span>}
            {it.badge && <Badge tone={it.badge.tone || "accent"}>{it.badge.label}</Badge>}
          </button>
        ))}
      </div>
      {!compact && footer && <div style={{ padding: "12px 8px 4px", borderTop: "1px solid var(--edge-1)", marginTop: 8 }}>{footer}</div>}
    </nav>
  );
}
