import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Switch — springy thumb, glowing track when on. */
export function Switch({ label, checked = false, onChange, disabled, style, ...rest }) {
  const { touch } = useBreakpoint();
  const d = density(touch);
  const inset = 1.5;
  const thumb = d.switchH - inset * 2;
  const travel = d.switchW - thumb - inset * 2;
  return (
    <label {...rest} onClick={(e) => { rest.onClick?.(e); if (!e.defaultPrevented && !disabled) onChange?.(!checked); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: touch ? d.control : undefined, padding: touch ? `${(d.control - d.switchH) / 2}px 0` : undefined, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, userSelect: "none", ...style }}>
      <span style={{
        position: "relative", width: d.switchW, height: d.switchH, borderRadius: 999, flexShrink: 0,
        background: checked ? "var(--accent)" : "oklch(1 0 0 / 0.1)",
        border: "1px solid " + (checked ? "var(--accent)" : "var(--edge-2)"),
        boxShadow: checked ? "0 0 12px oklch(0.82 0.15 195 / 0.45)" : "none",
        transition: "background var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)" }}>
        <span style={{ position: "absolute", top: inset, left: inset, width: thumb, height: thumb, borderRadius: "50%",
          background: checked ? "var(--on-accent)" : "var(--fg-2)",
          transform: checked ? `translateX(${travel}px)` : "translateX(0)",
          transition: "transform var(--dur-3) var(--ease-spring), background var(--dur-2) var(--ease-out)" }} />
      </span>
      {label && <span style={{ fontSize: "var(--text-sm)", color: "var(--text-body)" }}>{label}</span>}
    </label>
  );
}
