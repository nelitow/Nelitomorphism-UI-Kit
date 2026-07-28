import React from "react";
import { Resolve } from "./Resolve.jsx";

const TONE = { accent: "var(--accent)", "accent-2": "var(--accent-2)", ok: "var(--ok)", warn: "var(--warn)", danger: "var(--danger)", neutral: "var(--text-faint)" };

/**
 * Timeline — vertical hairline rail with glowing dots. Entries stagger in.
 * items: [{ meta, title, detail?, tone? }] — meta is mono (time/date), tone colors the dot.
 */
export function Timeline({ items = [], loading = false, style, ...rest }) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { const r = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(r); }, []);
  return (
    <div {...rest} style={{ display: "grid", gap: 0, minWidth: 0, ...style }}>
      {items.map((it, i) => {
        const c = TONE[it.tone] || TONE.neutral;
        const last = i === items.length - 1;
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "9px 1fr", gap: "0 var(--sp-3)", minWidth: 0,
            opacity: on ? 1 : 0, transform: on ? "none" : "translateY(6px)",
            transition: `opacity var(--dur-3) var(--ease-out) ${i * 40}ms, transform var(--dur-3) var(--ease-spring) ${i * 40}ms`,
          }}>
            <div style={{ display: "grid", justifyItems: "center", gridTemplateRows: "14px 1fr" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, alignSelf: "center" }}></span>
              {!last && <span style={{ width: 1, background: "var(--edge-1)", justifySelf: "center", minHeight: 12 }}></span>}
            </div>
            <div style={{ paddingBottom: last ? 0 : "var(--sp-3)", minWidth: 0 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "baseline", minWidth: 0 }}>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-body)" }}><Resolve loading={loading}>{it.title}</Resolve></span>
                {it.meta && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-faint)", whiteSpace: "nowrap", marginLeft: "auto" }}>{it.meta}</span>}
              </div>
              {it.detail && <div style={{ fontSize: "var(--text-xs)", color: "var(--text-dim)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis" }}><Resolve loading={loading}>{it.detail}</Resolve></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
