import React from "react";
import { NeliMaterial } from "./NeliMaterial.jsx";

/** Surface card. material=true adds the WebGL iridescent layer + scanline texture (hero cards). */
export function Card({ title, meta, material = false, glow = false, padding = "var(--sp-4)", children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      {...rest}
      onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}
      style={{
        position: "relative", overflow: "hidden", isolation: "isolate",
        background: "var(--surface-card)", border: `1px solid ${hover ? "var(--edge-2)" : "var(--edge-1)"}`,
        borderRadius: "var(--r-2)", boxShadow: glow && hover ? "var(--glow-accent)" : "var(--shadow-raise)",
        transition: "border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)",
        ...style,
      }}
    >
      {material && <NeliMaterial intensity={hover ? 0.55 : 0.35} style={{ zIndex: -1 }} />}
      {material && <div style={{ position: "absolute", inset: 0, background: "var(--scanline)", pointerEvents: "none" }} />}
      {(title || meta) && (
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--sp-3)", padding: `var(--sp-3) ${typeof padding === "string" ? padding : padding + "px"} 0` }}>
          {title && <div style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", fontWeight: "var(--weight-strong)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-dim)" }}>{title}</div>}
          {meta && <div style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{meta}</div>}
        </div>
      )}
      <div style={{ position: "relative", padding }}>{children}</div>
    </div>
  );
}
