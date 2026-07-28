import React from "react";

const TONES = {
  neutral: { bg: "oklch(1 0 0 / 0.07)", fg: "var(--text-dim)", dot: "var(--text-faint)" },
  accent: { bg: "var(--accent-dim)", fg: "var(--accent)", dot: "var(--accent)" },
  accent2: { bg: "var(--accent-2-dim)", fg: "var(--accent-2)", dot: "var(--accent-2)" },
  ok: { bg: "var(--ok-dim)", fg: "var(--ok)", dot: "var(--ok)" },
  warn: { bg: "var(--warn-dim)", fg: "var(--warn)", dot: "var(--warn)" },
  danger: { bg: "var(--danger-dim)", fg: "var(--danger)", dot: "var(--danger)" },
};

/** Status badge — mono uppercase micro-label. */
export function Badge({ tone = "neutral", dot = false, pulse = false, children, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  React.useEffect(() => {
    if (document.getElementById("neli-kf-badge")) return;
    const el = document.createElement("style"); el.id = "neli-kf-badge";
    el.textContent = "@keyframes neli-pulse{0%,100%{opacity:1}50%{opacity:0.35}}";
    document.head.appendChild(el);
  }, []);
  return (
    <span {...rest} style={{
      display: "inline-flex", alignItems: "center", gap: 6, height: 20, padding: "0 8px",
      borderRadius: "var(--r-pill)", background: t.bg, color: t.fg,
      fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--track-wide)", textTransform: "uppercase", whiteSpace: "nowrap", ...style,
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.dot, boxShadow: `0 0 6px ${t.dot}`, animation: pulse ? "neli-pulse 1.6s var(--ease-in-out) infinite" : "none" }} />}
      {children}
    </span>
  );
}
