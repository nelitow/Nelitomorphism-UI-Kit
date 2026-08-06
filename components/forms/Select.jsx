import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Custom select: glass popover, options cascade in with stagger. options: [{value,label}] or strings. */
export function Select({ label, options = [], value, onChange, placeholder = "Select…", style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const { touch } = useBreakpoint();
  const d = density(touch);
  const opts = options.map(o => typeof o === "string" ? { value: o, label: o } : o);
  const sel = opts.find(o => o.value === value);
  React.useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  React.useEffect(() => {
    if (document.getElementById("neli-kf-opt")) return;
    const el = document.createElement("style"); el.id = "neli-kf-opt";
    el.textContent = "@keyframes neli-opt{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}@keyframes neli-pop{from{opacity:0;transform:scale(0.97) translateY(-4px)}to{opacity:1;transform:none}}";
    document.head.appendChild(el);
  }, []);
  return (
    <div ref={ref} style={{ display: "grid", gap: 5, position: "relative", ...style }} {...rest}>
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: open ? "var(--accent)" : "var(--text-dim)", transition: "color var(--dur-1) var(--ease-out)" }}>{label}</span>}
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        height: d.control, padding: "var(--pad-control)", borderRadius: "var(--r-1)", textAlign: "left",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, cursor: "pointer",
        background: "var(--bg-1)", color: sel ? "var(--text-body)" : "var(--text-faint)",
        border: `1px solid ${open ? "var(--edge-focus)" : "var(--edge-1)"}`, boxShadow: open ? "var(--focus-ring)" : "none",
        fontFamily: "var(--font-ui)", fontSize: d.field,
        transition: "border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)" }}>
        {sel ? sel.label : placeholder}
        <span style={{ color: "var(--text-faint)", fontSize: 10, transform: open ? "rotate(180deg)" : "none", transition: "transform var(--dur-2) var(--ease-spring)" }}>▼</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, width: "min(100%, calc(100vw - var(--safe-left) - var(--safe-right)))", boxSizing: "border-box", marginTop: 4, zIndex: 50, padding: 4,
          background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--edge-2)", borderRadius: "var(--r-2)", boxShadow: "var(--shadow-overlay)",
          animation: "neli-pop var(--dur-2) var(--ease-spring) both", maxHeight: "min(50dvh, 320px)", overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" }}>
          {opts.map((o, i) => (
            <div key={o.value} onClick={() => { onChange?.(o.value); setOpen(false); }}
              style={{ minHeight: d.control, padding: "0 10px", display: "flex", alignItems: "center", borderRadius: "var(--r-1)", cursor: "pointer", fontSize: d.field,
                color: o.value === value ? "var(--accent)" : "var(--text-body)",
                background: o.value === value ? "var(--accent-dim)" : "transparent",
                animation: `neli-opt var(--dur-2) var(--ease-out) both ${i * 25}ms`, transition: "background var(--dur-1) var(--ease-out)" }}
              onPointerEnter={(e) => { if (o.value !== value) e.currentTarget.style.background = "oklch(1 0 0 / 0.06)"; }}
              onPointerLeave={(e) => { if (o.value !== value) e.currentTarget.style.background = "transparent"; }}>
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
