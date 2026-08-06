import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

const css = (c) => (Array.isArray(c) ? "rgb(" + c.join(",") + ")" : c);

/** Swatch — circular colour control. The selected swatch blooms with its own light, not the accent. */
export function Swatch({ color, active = false, size, disabled = false, onChange, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const { touch } = useBreakpoint();
  const d = density(touch);
  const fill = css(color);
  const diameter = size ?? d.swatch;
  const hit = touch ? Math.max(44, diameter) : diameter;
  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      aria-pressed={active}
      title={typeof color === "string" ? color : fill}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => !disabled && onChange?.(color)}
      style={{
        width: hit, height: hit, padding: (hit - diameter) / 2, border: "none", borderRadius: "50%", background: "transparent",
        display: "inline-grid", placeItems: "center", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1,
      }}
    >
      <span style={{
        display: "block", width: diameter, height: diameter, borderRadius: "50%", background: fill,
        border: "1px solid " + (active ? "var(--fg-1)" : "oklch(1 0 0 / 0.2)"),
        boxShadow: active ? "0 0 12px " + fill : hover && !disabled ? "0 0 8px " + fill : "none",
        transform: active ? "scale(1.12)" : hover && !disabled ? "scale(1.06)" : "scale(1)",
        transition: "transform var(--dur-2) var(--ease-spring), box-shadow var(--dur-2) var(--ease-out), border-color var(--dur-1) var(--ease-out)",
        ...style,
      }} />
    </button>
  );
}

/** SwatchGroup — labelled row of swatches with a single selected value. */
export function SwatchGroup({ label, colors = [], value, size, disabled = false, onChange, style, ...rest }) {
  const { touch } = useBreakpoint();
  const d = density(touch);
  const selected = css(value);
  const swatchSize = size ?? d.swatch;
  return (
    <div {...rest} style={{ display: "grid", gap: 6, ...style }}>
      {label && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-dim)" }}>{label}</div>
      )}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        {colors.map((c, i) => (
          <Swatch key={i} color={c} size={swatchSize} disabled={disabled} active={value != null && css(c) === selected} onChange={onChange} />
        ))}
      </div>
    </div>
  );
}
