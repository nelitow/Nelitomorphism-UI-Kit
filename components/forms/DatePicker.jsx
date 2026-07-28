import React from "react";
import { Input } from "./Input.jsx";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fmt = (d) => d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` : "";

/** Date picker — mono ISO field + glass calendar popover with staggered day grid. */
export function DatePicker({ label = "Date", value, onChange, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState(() => value || new Date());
  const ref = React.useRef(null);
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
  const y = view.getFullYear(), m = view.getMonth();
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const count = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  const navBtn = { width: 24, height: 24, display: "grid", placeItems: "center", borderRadius: "var(--r-1)", cursor: "pointer", color: "var(--text-dim)", background: "transparent", border: "none", fontSize: 12 };
  return (
    <div ref={ref} style={{ position: "relative", ...style }} {...rest}>
      <div onClick={() => setOpen(true)}>
        <Input label={label} mono readOnly value={fmt(value)} placeholder="YYYY-MM-DD" style={{ cursor: "pointer" }} inputStyle={{ cursor: "pointer" }} />
      </div>
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 50, width: 232, padding: 10,
          background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--edge-2)", borderRadius: "var(--r-2)", boxShadow: "var(--shadow-overlay)",
          animation: "neli-pop var(--dur-2) var(--ease-spring) both" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <button type="button" style={navBtn} onClick={() => setView(new Date(y, m - 1, 1))}>◀</button>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-body)" }}>{MONTHS[m]} {y}</span>
            <button type="button" style={navBtn} onClick={() => setView(new Date(y, m + 1, 1))}>▶</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {DAYS.map((d, i) => <span key={i} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", padding: "2px 0" }}>{d}</span>)}
            {cells.map((d, i) => {
              const isSel = d && value && value.getFullYear() === y && value.getMonth() === m && value.getDate() === d;
              return (
                <span key={i}
                  onClick={d ? () => { onChange?.(new Date(y, m, d)); setOpen(false); } : undefined}
                  onPointerEnter={(e) => { if (d && !isSel) e.currentTarget.style.background = "oklch(1 0 0 / 0.07)"; }}
                  onPointerLeave={(e) => { if (d && !isSel) e.currentTarget.style.background = "transparent"; }}
                  style={{ textAlign: "center", padding: "4px 0", borderRadius: "var(--r-1)", cursor: d ? "pointer" : "default",
                    fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)",
                    color: isSel ? "var(--on-accent)" : "var(--text-body)",
                    background: isSel ? "var(--accent)" : "transparent",
                    boxShadow: isSel ? "0 0 10px oklch(0.82 0.15 195 / 0.5)" : "none",
                    animation: `neli-opt var(--dur-2) var(--ease-out) both ${i * 8}ms`,
                    transition: "background var(--dur-1) var(--ease-out)" }}>
                  {d || ""}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
