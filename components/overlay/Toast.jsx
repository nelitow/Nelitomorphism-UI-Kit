import React from "react";

/** Fire a toast from anywhere: toast("Deployed", {tone:"ok", detail:"build 4821 live"}) */
export function toast(message, opts = {}) {
  window.dispatchEvent(new CustomEvent("neli:toast", { detail: { message, ...opts } }));
}

/** Mount once near the app root. Renders the stacking toast rail (bottom-right). */
export function ToastStack({ style, ...rest }) {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    if (!document.getElementById("neli-kf-toast")) {
      const el = document.createElement("style"); el.id = "neli-kf-toast";
      el.textContent = "@keyframes neli-toast-in{from{opacity:0;transform:translateX(24px) scale(0.96)}to{opacity:1;transform:none}}";
      document.head.appendChild(el);
    }
    const on = (e) => {
      const id = Math.random().toString(36).slice(2);
      const item = { id, exiting: false, duration: 4200, ...e.detail };
      setItems(t => [...t, item]);
      setTimeout(() => setItems(t => t.map(x => x.id === id ? { ...x, exiting: true } : x)), item.duration);
      setTimeout(() => setItems(t => t.filter(x => x.id !== id)), item.duration + 320);
    };
    window.addEventListener("neli:toast", on);
    return () => window.removeEventListener("neli:toast", on);
  }, []);
  const tones = { ok: "var(--ok)", warn: "var(--warn)", danger: "var(--danger)", accent: "var(--accent)" };
  return (
    <div {...rest} style={{ position: "fixed", right: 16, bottom: 16, zIndex: 200, display: "grid", gap: 8, width: 300, ...style }}>
      {items.map(t => {
        const c = tones[t.tone] || "var(--accent)";
        return (
          <div key={t.id} style={{
            position: "relative", overflow: "hidden", padding: "10px 12px 12px",
            background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
            border: "1px solid var(--edge-2)", borderRadius: "var(--r-2)", boxShadow: "var(--shadow-overlay)",
            animation: "neli-toast-in var(--dur-3) var(--ease-spring) both",
            opacity: t.exiting ? 0 : 1, transform: t.exiting ? "translateX(24px)" : "none",
            transition: "opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, flexShrink: 0 }} />
              <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)" }}>{t.message}</span>
            </div>
            {t.detail && <div style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--text-faint)", marginTop: 4, paddingLeft: 14 }}>{t.detail}</div>}
            <div style={{ position: "absolute", left: 0, bottom: 0, height: 1.5, background: c, boxShadow: `0 0 6px ${c}`, width: "100%", transformOrigin: "left",
              animation: `neli-toast-timer ${t.duration}ms linear both` }} />
            <ToastTimerKf />
          </div>
        );
      })}
    </div>
  );
}

function ToastTimerKf() {
  React.useEffect(() => {
    if (document.getElementById("neli-kf-toast-timer")) return;
    const el = document.createElement("style"); el.id = "neli-kf-toast-timer";
    el.textContent = "@keyframes neli-toast-timer{from{transform:scaleX(1)}to{transform:scaleX(0)}}";
    document.head.appendChild(el);
  }, []);
  return null;
}
