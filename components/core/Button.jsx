import React from "react";
import { NeliMaterial } from "./NeliMaterial.jsx";
import { useBreakpoint, density } from "./useBreakpoint.js";

const SIZES = {
  sm: { fineHeight: 26, finePadding: 10, fontSize: "var(--text-xs)" },
  md: { fineHeight: 30, finePadding: 12, fontSize: "var(--text-sm)" },
  lg: { fineHeight: 38, finePadding: 18, fontSize: "var(--text-base)" },
};

/** Nelitomorphism button. variant: primary | secondary | ghost | danger */
export function Button({ variant = "secondary", size = "md", children, disabled, loading, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const { touch } = useBreakpoint();
  const d = density(touch);
  const preset = SIZES[size] || SIZES.md;
  const height = size === "sm" ? d.controlSm : size === "lg" ? Math.max(d.control + 8, 38) : d.control;
  const s = { height, padding: `0 ${Math.round(preset.finePadding * height / preset.fineHeight)}px`, fontSize: preset.fontSize };
  const base = {
    position: "relative", overflow: "hidden", isolation: "isolate",
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    fontFamily: "var(--font-ui)", fontWeight: "var(--weight-medium)", letterSpacing: "0.01em",
    borderRadius: "var(--r-1)", cursor: disabled ? "not-allowed" : "pointer", userSelect: "none",
    border: "1px solid var(--edge-1)", background: "var(--bg-2)", color: "var(--text-body)",
    transform: down ? "scale(0.97)" : "scale(1)", opacity: disabled ? 0.45 : 1,
    transition: "transform var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)",
    ...s,
  };
  const variants = {
    primary: { border: "1px solid oklch(0.82 0.15 195 / 0.4)", background: "oklch(0.2 0.04 220)", color: "var(--fg-1)", boxShadow: hover ? "var(--glow-accent)" : "0 0 0 1px transparent" },
    secondary: { background: hover ? "var(--bg-3)" : "var(--bg-2)", borderColor: hover ? "var(--edge-2)" : "var(--edge-1)" },
    ghost: { background: hover ? "oklch(1 0 0 / 0.06)" : "transparent", border: "1px solid transparent", color: "var(--text-dim)" },
    danger: { background: "var(--danger-dim)", border: "1px solid oklch(0.72 0.19 25 / 0.4)", color: "var(--danger)", boxShadow: hover ? "0 0 0 1px oklch(0.72 0.19 25 / 0.35), 0 0 20px oklch(0.72 0.19 25 / 0.2)" : "none" },
  };
  return (
    <button
      {...rest} disabled={disabled} onClick={loading ? undefined : onClick}
      onPointerEnter={() => setHover(true)} onPointerLeave={() => { setHover(false); setDown(false); }}
      onPointerDown={() => setDown(true)} onPointerUp={() => setDown(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {variant === "primary" && !disabled && <NeliMaterial intensity={hover ? 1.15 : 0.75} style={{ zIndex: -1 }} />}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 8, opacity: loading ? 0.5 : 1, transition: "opacity var(--dur-2) var(--ease-out)" }}>{children}</span>
      {loading && <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1.5, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", animation: "neli-sweep 1.1s var(--ease-in-out) infinite" }} />}
      <NeliBtnKeyframes />
    </button>
  );
}

function NeliBtnKeyframes() {
  React.useEffect(() => {
    if (document.getElementById("neli-kf-btn")) return;
    const el = document.createElement("style"); el.id = "neli-kf-btn";
    el.textContent = "@keyframes neli-sweep{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}";
    document.head.appendChild(el);
  }, []);
  return null;
}
