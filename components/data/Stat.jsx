import React from "react";
import { useBreakpoint } from "../core/useBreakpoint.js";
import { Resolve } from "./Resolve.jsx";

/** Stat tile — uppercase mono micro-label + large mono metric, optional delta. The dashboard KPI primitive. */
export function Stat({ label, value, format, delta, up = true, hint, loading = false, glow = false, style, ...rest }) {
  const { tight } = useBreakpoint();
  return (
    <div {...rest} style={{
      background: "var(--bg-1)", border: "1px solid var(--edge-1)", borderRadius: "var(--r-2)",
      boxShadow: glow ? "var(--shadow-raise), var(--glow-accent)" : "var(--shadow-raise)",
      padding: "var(--sp-3) var(--sp-4)", minWidth: 0, ...style,
    }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{label}</div>
      <div style={{ minWidth: 0, fontFamily: "var(--font-mono)", fontSize: "var(--text-xl)", fontWeight: 600, marginTop: 4, whiteSpace: "nowrap", ...(tight ? { overflow: "hidden", textOverflow: "ellipsis" } : {}) }}>
        <Resolve loading={loading} format={format}>{value}</Resolve>
      </div>
      {(delta || hint) && (
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", marginTop: 2, display: "flex", gap: 6, alignItems: "baseline", minWidth: 0, ...(tight ? { overflow: "hidden" } : {}) }}>
          {delta && <span style={{ minWidth: 0, ...(tight ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : {}), color: up ? "var(--ok)" : "var(--danger)" }}>{up ? "↑" : "↓"} <Resolve loading={loading}>{delta}</Resolve></span>}
          {hint && <span style={{ minWidth: 0, color: "var(--text-faint)", ...(tight ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : {}) }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}
