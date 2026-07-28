import React from "react";

/** Topbar — slim glass app bar: breadcrumb path, center slot, right actions. */
export function Topbar({ path = [], center, actions, style, ...rest }) {
  return (
    <header {...rest} style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)", height: 44, padding: "0 var(--sp-4)", flexShrink: 0,
      background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
      borderBottom: "1px solid var(--edge-1)", position: "sticky", top: 0, zIndex: 40, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", minWidth: 0 }}>
        {path.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: "var(--text-faint)" }}>/</span>}
            <span style={{ color: i === path.length - 1 ? "var(--text-body)" : "var(--text-faint)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p}</span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>{center}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)" }}>{actions}</div>
    </header>
  );
}
