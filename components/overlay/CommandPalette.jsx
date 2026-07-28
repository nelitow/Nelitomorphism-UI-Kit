import React from "react";

/**
 * Command palette — ⌘K glass overlay with fuzzy filter and staggered results.
 * commands: [{id, label, group?, hint?, action?}]
 */
export function CommandPalette({ commands = [], open, onClose, onRun, hotkey = "k", placeholder = "Type a command…", style, ...rest }) {
  const controlled = open !== undefined;
  const [selfOpen, setSelfOpen] = React.useState(false);
  const isOpen = controlled ? open : selfOpen;
  const close = () => (controlled ? onClose?.() : setSelfOpen(false));
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);
  const filtered = React.useMemo(() => {
    const needle = q.toLowerCase();
    return commands.filter(c => !needle || fuzzy(c.label.toLowerCase(), needle)).slice(0, 12);
  }, [commands, q]);
  React.useEffect(() => {
    const on = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === hotkey) { e.preventDefault(); controlled ? onClose?.() : setSelfOpen(o => !o); }
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(filtered.length - 1, i + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setIdx(i => Math.max(0, i - 1)); }
      if (e.key === "Enter" && filtered[idx]) { run(filtered[idx]); }
    };
    document.addEventListener("keydown", on);
    return () => document.removeEventListener("keydown", on);
  });
  React.useEffect(() => { if (isOpen) { setQ(""); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [isOpen]);
  React.useEffect(() => {
    if (document.getElementById("neli-kf-opt")) return;
    const el = document.createElement("style"); el.id = "neli-kf-opt";
    el.textContent = "@keyframes neli-opt{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}@keyframes neli-pop{from{opacity:0;transform:scale(0.97) translateY(-4px)}to{opacity:1;transform:none}}";
    document.head.appendChild(el);
  }, []);
  const run = (c) => { close(); (c.action || (() => onRun?.(c)))(); };
  if (!isOpen) return null;
  return (
    <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: 120, display: "grid", justifyItems: "center", alignItems: "start", paddingTop: "16vh",
      background: "oklch(0.08 0.01 250 / 0.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}>
      <div {...rest} onClick={(e) => e.stopPropagation()} style={{ width: "min(92vw, 560px)", overflow: "hidden",
        background: "var(--glass-bg)", backdropFilter: "blur(var(--glass-blur))", WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--edge-2)", borderRadius: "var(--r-3)", boxShadow: "var(--shadow-overlay), var(--glow-accent)",
        animation: "neli-pop var(--dur-2) var(--ease-spring) both", ...style }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--edge-1)" }}>
          <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>❯</span>
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }} placeholder={placeholder}
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text-body)", fontFamily: "var(--font-mono)", fontSize: "var(--text-base)" }} />
          <kbd style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", border: "1px solid var(--edge-1)", borderRadius: 4, padding: "2px 5px" }}>esc</kbd>
        </div>
        <div style={{ maxHeight: 320, overflow: "auto", padding: 6 }}>
          {filtered.length === 0 && <div style={{ padding: "18px 12px", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>No match. Try fewer characters.</div>}
          {filtered.map((c, i) => (
            <div key={c.id || c.label} onClick={() => run(c)} onPointerEnter={() => setIdx(i)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "8px 10px", borderRadius: "var(--r-1)", cursor: "pointer",
                background: i === idx ? "var(--accent-dim)" : "transparent",
                animation: `neli-opt var(--dur-2) var(--ease-out) both ${i * 20}ms`, transition: "background var(--dur-1) var(--ease-out)" }}>
              <span style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                {c.group && <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{c.group}</span>}
                <span style={{ fontSize: "var(--text-sm)", color: i === idx ? "var(--accent)" : "var(--text-body)" }}>{c.label}</span>
              </span>
              {c.hint && <kbd style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-faint)", border: "1px solid var(--edge-1)", borderRadius: 4, padding: "1px 5px" }}>{c.hint}</kbd>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function fuzzy(hay, needle) { let i = 0; for (const ch of hay) if (ch === needle[i]) i++; return i >= needle.length; }
