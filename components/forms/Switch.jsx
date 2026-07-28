import React from "react";

/** Switch — springy thumb, glowing track when on. */
export function Switch({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label {...rest} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, userSelect: "none", ...style }}>
      <span onClick={() => !disabled && onChange?.(!checked)} style={{
        position: "relative", width: 32, height: 18, borderRadius: 999, flexShrink: 0,
        background: checked ? "var(--accent)" : "oklch(1 0 0 / 0.1)",
        border: "1px solid " + (checked ? "var(--accent)" : "var(--edge-2)"),
        boxShadow: checked ? "0 0 12px oklch(0.82 0.15 195 / 0.45)" : "none",
        transition: "background var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)" }}>
        <span style={{ position: "absolute", top: 1.5, left: 1.5, width: 13, height: 13, borderRadius: "50%",
          background: checked ? "var(--on-accent)" : "var(--fg-2)",
          transform: checked ? "translateX(14px)" : "translateX(0)",
          transition: "transform var(--dur-3) var(--ease-spring), background var(--dur-2) var(--ease-out)" }} />
      </span>
      {label && <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
