import React from "react";

/** Tooltip — wraps its child; mono glass tip springs in after a short delay. */
export function Tooltip({ content, side = "top", delay = 250, children, style, ...rest }) {
  const [show, setShow] = React.useState(false);
  const timer = React.useRef(null);
  const pos = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: show ? "translateX(-50%)" : "translateX(-50%) translateY(4px)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: show ? "translateX(-50%)" : "translateX(-50%) translateY(-4px)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: show ? "translateY(-50%)" : "translateY(-50%) translateX(4px)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: show ? "translateY(-50%)" : "translateY(-50%) translateX(-4px)" },
  }[side];
  return (
    <span {...rest}
      onPointerEnter={() => { timer.current = setTimeout(() => setShow(true), delay); }}
      onPointerLeave={() => { clearTimeout(timer.current); setShow(false); }}
      style={{ position: "relative", display: "inline-flex", ...style }}>
      {children}
      <span style={{ position: "absolute", zIndex: 150, whiteSpace: "nowrap", padding: "4px 8px", pointerEvents: "none",
        background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--edge-2)", borderRadius: "var(--r-1)",
        fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-body)",
        opacity: show ? 1 : 0, visibility: show ? "visible" : "hidden",
        transition: "opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-spring), visibility 0s", ...pos }}>
        {content}
      </span>
    </span>
  );
}
