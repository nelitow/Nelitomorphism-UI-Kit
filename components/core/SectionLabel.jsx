import React from "react";

/** Section heading — uppercase tracked mono micro-label with optional meta and hairline rule. */
export function SectionLabel({ children, meta, rule = false, style, ...rest }) {
  return (
    <div {...rest} style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-3)", minWidth: 0, ...style }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-dim)", whiteSpace: "nowrap" }}>{children}</span>
      {rule && <span style={{ flex: 1, height: 1, background: "var(--edge-1)", alignSelf: "center" }}></span>}
      {meta && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-faint)", whiteSpace: "nowrap", marginLeft: rule ? 0 : "auto" }}>{meta}</span>}
    </div>
  );
}
