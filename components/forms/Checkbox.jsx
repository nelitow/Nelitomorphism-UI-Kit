import React from "react";

/** Checkbox with animated check-path draw and glow when checked. */
export function Checkbox({ label, checked = false, onChange, disabled, style, ...rest }) {
  return (
    <label {...rest} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, userSelect: "none", ...style }}>
      <span onClick={() => !disabled && onChange?.(!checked)} style={{
        width: 16, height: 16, borderRadius: 4, display: "grid", placeItems: "center", flexShrink: 0,
        background: checked ? "var(--accent)" : "var(--bg-1)",
        border: `1px solid ${checked ? "var(--accent)" : "var(--edge-2)"}`,
        boxShadow: checked ? "0 0 10px oklch(0.82 0.15 195 / 0.5)" : "none",
        transition: "background var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), border-color var(--dur-1) var(--ease-out)" }}>
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: "block" }}>
          <path d="M1.5 5.2 L4 7.6 L8.5 2.4" fill="none" stroke="var(--on-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 12, strokeDashoffset: checked ? 0 : 12, transition: "stroke-dashoffset var(--dur-3) var(--ease-spring)" }} />
        </svg>
      </span>
      {label && <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
