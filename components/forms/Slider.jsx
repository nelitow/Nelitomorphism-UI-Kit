import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Slider — glowing fill, mono value chip that appears while dragging. */
export function Slider({ label, min = 0, max = 100, step = 1, value = 0, onChange, unit = "", disabled = false, style, ...rest }) {
  const [drag, setDrag] = React.useState(false);
  const ref = React.useRef(null);
  const { touch } = useBreakpoint();
  const d = density(touch);
  const pct = ((value - min) / (max - min)) * 100;
  const setFromEvent = (e) => {
    if (disabled) return;
    const r = ref.current.getBoundingClientRect();
    const raw = min + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (max - min);
    onChange?.(Math.round(raw / step) * step);
  };
  return (
    <div {...rest} style={{ display: "grid", gap: 6, opacity: disabled ? 0.45 : 1, ...style }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
          <span style={{ letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-dim)" }}>{label}</span>
          <span style={{ color: drag ? "var(--accent)" : "var(--text-body)", transition: "color var(--dur-1) var(--ease-out)" }}>{value}{unit}</span>
        </div>
      )}
      <div ref={ref}
        onPointerDown={(e) => { if (disabled) return; setDrag(true); try { e.currentTarget.setPointerCapture(e.pointerId); } catch {} setFromEvent(e); }}
        onPointerMove={(e) => drag && setFromEvent(e)}
        onPointerUp={() => setDrag(false)}
        onPointerCancel={() => setDrag(false)}
        style={{ position: "relative", height: d.hit, cursor: disabled ? "not-allowed" : "pointer", touchAction: "none" }}>
        <div style={{ position: "absolute", top: (d.hit - 4) / 2, left: 0, right: 0, height: 4, borderRadius: 999, background: "oklch(1 0 0 / 0.08)" }} />
        <div style={{ position: "absolute", top: (d.hit - 4) / 2, left: 0, width: pct + "%", height: 4, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 10px oklch(0.82 0.15 195 / 0.5)", transition: drag ? "none" : "width var(--dur-2) var(--ease-out)" }} />
        <div style={{ position: "absolute", top: (d.hit - d.thumb) / 2, left: `calc(${pct}% - ${d.thumb / 2}px)`, width: d.thumb, height: d.thumb, borderRadius: "50%",
          background: "var(--fg-1)", border: "2px solid var(--accent)",
          boxShadow: drag ? "0 0 0 5px var(--accent-dim), 0 0 14px var(--accent)" : "0 0 8px oklch(0.82 0.15 195 / 0.4)",
          transform: drag ? "scale(1.15)" : "scale(1)",
          transition: drag ? "box-shadow var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out)" : "all var(--dur-2) var(--ease-spring)" }} />
      </div>
    </div>
  );
}
