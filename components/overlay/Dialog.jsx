import React from "react";
import { Button } from "../core/Button.jsx";
import { useBreakpoint, density } from "../core/useBreakpoint.js";

/** Modal dialog — glass panel springs in over a dimmed, blurred page. */
export function Dialog({ open = false, title, children, footer, onClose, width = 420, style, ...rest }) {
  const { tight, touch } = useBreakpoint();
  const sizes = density(touch);
  const [show, setShow] = React.useState(open);
  const [anim, setAnim] = React.useState(open);
  React.useEffect(() => {
    if (open) { setShow(true); requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true))); }
    else { setAnim(false); const t = setTimeout(() => setShow(false), 300); return () => clearTimeout(t); }
  }, [open]);
  React.useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);
  if (!show) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, display: "grid", placeItems: tight ? "end stretch" : "center", padding: tight ? 0 : 24,
      background: "oklch(0.08 0.01 250 / 0.6)", backdropFilter: anim ? "blur(6px)" : "blur(0px)", WebkitBackdropFilter: anim ? "blur(6px)" : "blur(0px)",
      opacity: anim ? 1 : 0, transition: "opacity var(--dur-2) var(--ease-out), backdrop-filter var(--dur-3) var(--ease-out)" }}>
      <div {...rest} onClick={(e) => e.stopPropagation()} style={{
        width: tight ? "100%" : `min(${width}px, calc(100vw - 2 * var(--sp-4)))`, maxHeight: "85dvh", display: "flex", flexDirection: "column", overflow: "hidden",
        paddingBottom: tight ? "var(--safe-bottom)" : undefined,
        background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--edge-2)", borderRadius: tight ? "var(--r-3) var(--r-3) 0 0" : "var(--r-3)", boxShadow: "var(--shadow-overlay)",
        transform: anim ? "translateY(0)" : (tight ? "translateY(100%)" : "scale(0.94) translateY(14px)"), opacity: tight ? 1 : (anim ? 1 : 0),
        transition: "transform var(--dur-3) var(--ease-spring), opacity var(--dur-2) var(--ease-out)", ...style }}>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--sp-4) var(--sp-5)", borderBottom: "1px solid var(--edge-1)" }}>
          <span style={{ fontSize: "var(--text-md)", fontWeight: "var(--weight-strong)", letterSpacing: "var(--track-tight)" }}>{title}</span>
          <Button variant="ghost" size="sm" onClick={onClose} style={{ padding: "0 8px", ...(touch ? { minWidth: sizes.control, minHeight: sizes.control } : {}) }}>✕</Button>
        </div>
        <div style={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "var(--sp-5)" }}>{children}</div>
        {footer && <div style={{ flexShrink: 0, display: "flex", flexDirection: tight ? "column" : "row", alignItems: tight ? "stretch" : undefined, justifyContent: "flex-end", gap: "var(--sp-2)", padding: "var(--sp-3) var(--sp-5) var(--sp-5)" }}>{footer}</div>}
      </div>
    </div>
  );
}
