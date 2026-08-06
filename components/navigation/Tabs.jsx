import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Tabs — springy glowing indicator slides between items; content owned by consumer. */
export function Tabs({ items = [], value, onChange, style, ...rest }) {
  const { compact, touch } = useBreakpoint();
  const d = density(touch);
  const stripRef = React.useRef(null);
  const refs = React.useRef({});
  const [bar, setBar] = React.useState(null);
  const tabs = items.map(t => typeof t === "string" ? { value: t, label: t } : t);
  React.useLayoutEffect(() => {
    const el = refs.current[value];
    const strip = stripRef.current;
    if (el && strip) {
      const tabBox = el.getBoundingClientRect();
      const stripBox = strip.getBoundingClientRect();
      setBar({ left: tabBox.left - stripBox.left + strip.scrollLeft, width: tabBox.width });
    } else setBar(null);
  }, [value, items.length]);
  return (
    <div {...rest} ref={stripRef} style={{ position: "relative", display: "flex", flexWrap: "nowrap", gap: 2, borderBottom: "1px solid var(--edge-1)",
      maxWidth: compact ? "100%" : undefined, minWidth: 0, overflowX: compact ? "auto" : undefined, overflowY: compact ? "hidden" : undefined,
      WebkitOverflowScrolling: compact ? "touch" : undefined, scrollbarWidth: compact ? "none" : undefined, ...style }}>
      {tabs.map(t => (
        <button key={t.value} type="button" ref={(el) => (refs.current[t.value] = el)} onClick={() => onChange?.(t.value)}
          style={{ flex: compact ? "0 0 auto" : undefined, minHeight: touch ? d.control : undefined, background: "none", border: "none", cursor: "pointer", padding: "8px 12px",
            fontFamily: "var(--font-ui)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)",
            color: t.value === value ? "var(--text-body)" : "var(--text-faint)",
            transition: "color var(--dur-2) var(--ease-out)" }}>
          {t.label}
          {t.count != null && <span style={{ marginLeft: 6, fontFamily: "var(--font-mono)", fontSize: 10, color: t.value === value ? "var(--accent)" : "var(--text-faint)" }}>{t.count}</span>}
        </button>
      ))}
      {bar && <span style={{ position: "absolute", bottom: -1, height: 2, borderRadius: 2, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)",
        left: bar.left, width: bar.width, transition: "left var(--dur-3) var(--ease-spring), width var(--dur-3) var(--ease-spring)" }} />}
    </div>
  );
}
