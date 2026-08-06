import React from "react";
import { useBreakpoint, density } from "./useBreakpoint.js";

/** Chip — compact mono toggle for presets and filters. Active state carries the accent glow. */
export function Chip({ active = false, tone = "accent", disabled = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const { touch } = useBreakpoint();
  const d = density(touch);
  const accent = tone === "accent2" ? "var(--accent-2)" : "var(--accent)";
  const wash = tone === "accent2" ? "var(--accent-2-dim)" : "var(--accent-dim)";
  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      style={{
        height: d.chip, padding: `0 ${touch ? 12 : 8}px`, borderRadius: "var(--r-1)",
        fontFamily: "var(--font-mono)", fontSize: touch ? 11 : 10, lineHeight: 1,
        letterSpacing: "var(--track-wide)", textTransform: "uppercase",
        background: active ? wash : "transparent",
        border: "1px solid " + (active ? accent : hover && !disabled ? "var(--edge-2)" : "var(--edge-1)"),
        color: active ? accent : hover && !disabled ? "var(--text-body)" : "var(--text-dim)",
        boxShadow: active ? "0 0 10px " + wash : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: hover && !disabled && !active ? "translateY(-1px)" : "none",
        transition: "color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out), transform var(--dur-1) var(--ease-out)",
        ...style,
      }}
    >{children}</button>
  );
}
