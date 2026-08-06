import React from "react";
import { useBreakpoint } from "../core/useBreakpoint.js";

/** Tooltip — wraps its child; mono glass tip springs in after a short delay. */
export function Tooltip({ content, side = "top", delay = 250, children, style, ...rest }) {
  const { touch } = useBreakpoint();
  const [show, setShow] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const timer = React.useRef(null);
  const tipRef = React.useRef(null);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: show ? "translateX(-50%)" : "translateX(-50%) translateY(4px)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: show ? "translateX(-50%)" : "translateX(-50%) translateY(-4px)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: show ? "translateY(-50%)" : "translateY(-50%) translateX(4px)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: show ? "translateY(-50%)" : "translateY(-50%) translateX(-4px)" },
  }[side];
  React.useLayoutEffect(() => {
    if (!show) return;
    const clamp = () => {
      const rect = tipRef.current?.getBoundingClientRect();
      if (!rect) return;
      const gutter = 16;
      const shift = rect.left < gutter ? gutter - rect.left : Math.min(0, window.innerWidth - gutter - rect.right);
      if (shift) setOffset(current => current + shift);
    };
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [show, content, side]);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  if (touch) return children;
  return (
    <span {...rest}
      onPointerEnter={() => { setOffset(0); timer.current = setTimeout(() => setShow(true), delay); }}
      onPointerLeave={() => { clearTimeout(timer.current); setShow(false); }}
      style={{ position: "relative", display: "inline-flex", ...style }}>
      {children}
      <span ref={tipRef} style={{ position: "absolute", zIndex: 150, boxSizing: "border-box", maxWidth: "calc(100vw - 2 * var(--sp-4))", minWidth: 0, overflowWrap: "anywhere", whiteSpace: "normal", padding: "4px 8px", pointerEvents: "none",
        background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--edge-2)", borderRadius: "var(--r-1)",
        fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-body)",
        opacity: show ? 1 : 0, visibility: show ? "visible" : "hidden", marginLeft: offset,
        transition: "opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-spring), visibility 0s", ...pos }}>
        {content}
      </span>
    </span>
  );
}
