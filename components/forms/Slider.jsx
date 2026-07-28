import React from "react";

/** Slider — glowing fill, mono value chip that appears while dragging. */
export function Slider({ label, min = 0, max = 100, step = 1, value = 0, onChange, unit = "", style, ...rest }) {
  const [drag, setDrag] = React.useState(false);
  const ref = React.useRef(null);
  const pct = ((value - min) / (max - min)) * 100;
  const setFromEvent = (e) => {
    const r = ref.current.getBoundingClientRect();
    const raw = min + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (max - min);
    onChange?.(Math.round(raw / step) * step);
  };
  return (
    <div {...rest} style={{ display: "grid", gap: 6, ...style }}>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
          <span style={{ letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-dim)" }}>{label}</span>
          <span style={{ color: drag ? "var(--accent)" : "var(--text-body)", transition: "color var(--dur-1) var(--ease-out)" }}>{value}{unit}</span>
        </div>
      )}
      <div ref={ref}
        onPointerDown={(e) => { setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); setFromEvent(e); }}
        onPointerMove={(e) => drag && setFromEvent(e)}
        onPointerUp={() => setDrag(false)}
        style={{ position: "relative", height: 20, cursor: "pointer", touchAction: "none" }}>
        <div style={{ position: "absolute", top: 8, left: 0, right: 0, height: 4, borderRadius: 999, background: "oklch(1 0 0 / 0.08)" }} />
        <div style={{ position: "absolute", top: 8, left: 0, width: pct + "%", height: 4, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 10px oklch(0.82 0.15 195 / 0.5)", transition: drag ? "none" : "width var(--dur-2) var(--ease-out)" }} />
        <div style={{ position: "absolute", top: 3, left: `calc(${pct}% - 7px)`, width: 14, height: 14, borderRadius: "50%",
          background: "var(--fg-1)", border: "2px solid var(--accent)",
          boxShadow: drag ? "0 0 0 5px var(--accent-dim), 0 0 14px var(--accent)" : "0 0 8px oklch(0.82 0.15 195 / 0.4)",
          transform: drag ? "scale(1.15)" : "scale(1)",
          transition: drag ? "box-shadow var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out)" : "all var(--dur-2) var(--ease-spring)" }} />
      </div>
    </div>
  );
}
