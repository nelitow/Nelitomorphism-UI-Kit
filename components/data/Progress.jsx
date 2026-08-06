import React from "react";
import { Resolve } from "./Resolve.jsx";

/** Linear progress with glowing head and mono percent. Indeterminate = loading sweep. */
export function Progress({ value, max = 100, label, tone = "accent", showValue = true, style, ...rest }) {
  const indeterminate = value == null;
  const pct = indeterminate ? 0 : Math.min(100, (value / max) * 100);
  const color = tone === "accent2" ? "var(--accent-2)" : tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warn)" : tone === "danger" ? "var(--danger)" : "var(--accent)";
  React.useEffect(() => {
    if (document.getElementById("neli-kf-prog")) return;
    const el = document.createElement("style"); el.id = "neli-kf-prog";
    el.textContent = "@keyframes neli-indet{0%{left:-30%}100%{left:100%}}";
    document.head.appendChild(el);
  }, []);
  return (
    <div {...rest} style={{ display: "grid", gap: 6, ...style }}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", minWidth: 0, gap: "var(--sp-2)", fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)" }}>
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-dim)", letterSpacing: "var(--track-wide)", textTransform: "uppercase" }}>{label}</span>
          {showValue && !indeterminate && <span style={{ flex: "0 0 auto", color: "var(--text-body)" }}><Resolve loading={false}>{Math.round(pct)}</Resolve>%</span>}
        </div>
      )}
      <div style={{ position: "relative", height: 4, borderRadius: 999, background: "oklch(1 0 0 / 0.07)", overflow: "hidden" }}>
        {indeterminate ? (
          <div style={{ position: "absolute", top: 0, bottom: 0, width: "30%", borderRadius: 999, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, animation: "neli-indet 1.2s var(--ease-in-out) infinite" }} />
        ) : (
          <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: pct + "%", borderRadius: 999, background: `linear-gradient(90deg, ${color} 60%, oklch(0.95 0.05 195))`, boxShadow: `0 0 10px ${color}`, transition: "width var(--dur-3) var(--ease-spring)" }} />
        )}
      </div>
    </div>
  );
}
