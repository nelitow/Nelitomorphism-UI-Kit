import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Topbar — slim glass app bar: breadcrumb path, center slot, right actions. */
export function Topbar({ path = [], center, actions, style, ...rest }) {
  const { compact, tight, touch } = useBreakpoint();
  const d = density(touch);
  const breadcrumb = tight ? path.slice(-1) : path;
  return (
    <header {...rest} style={{ display: "flex", alignItems: "center", gap: compact ? "0 var(--sp-4)" : "var(--sp-4)", flexWrap: compact ? "wrap" : undefined,
      height: compact ? "auto" : 44, minHeight: touch ? d.control : undefined, padding: "0 var(--sp-4)", flexShrink: 0,
      background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
      borderBottom: "1px solid var(--edge-1)", position: "sticky", top: 0, zIndex: 40, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", minWidth: 0,
        flex: compact ? "1 1 0" : undefined, overflow: compact ? "hidden" : undefined, whiteSpace: compact ? "nowrap" : undefined }}>
        {breadcrumb.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: "var(--text-faint)" }}>/</span>}
            <span style={{ color: i === breadcrumb.length - 1 ? "var(--text-body)" : "var(--text-faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ flex: compact ? "1 0 100%" : 1, order: compact ? 2 : undefined, display: "flex", justifyContent: "center", minWidth: 0, minHeight: compact && center ? (touch ? d.control : 44) : undefined }}>{center}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", flexShrink: 0 }}>{actions}</div>
    </header>
  );
}
