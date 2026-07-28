import React from "react";
import { Progress } from "../data/Progress.jsx";

/** Drop zone — border lights on drag-over; files list in with progress bars (simulated unless onFiles handles real upload). */
export function FileUpload({ label = "Drop files", hint = "or click to browse", accept, multiple = true, onFiles, style, ...rest }) {
  const [over, setOver] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const inputRef = React.useRef(null);
  const add = (list) => {
    const items = [...list].map(f => ({ name: f.name, size: f.size, p: 0 }));
    setFiles(fs => [...fs, ...items]);
    onFiles?.(list);
    items.forEach((it) => {
      const tick = () => setFiles(fs => fs.map(f => f === it ? { ...f, p: Math.min(100, f.p + 3 + Math.random() * 9) } : (f.name === it.name && f.p < 100 ? { ...f, p: Math.min(100, f.p + 3 + Math.random() * 9) } : f)));
      const iv = setInterval(() => { tick(); }, 120);
      setTimeout(() => clearInterval(iv), 4000);
    });
  };
  const kb = (n) => n > 1e6 ? (n / 1e6).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1e3)) + " KB";
  return (
    <div style={{ display: "grid", gap: 8, ...style }} {...rest}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        style={{ display: "grid", placeItems: "center", gap: 2, padding: "var(--sp-6) var(--sp-4)", cursor: "pointer", textAlign: "center",
          border: `1px dashed ${over ? "var(--accent)" : "var(--edge-2)"}`, borderRadius: "var(--r-2)",
          background: over ? "var(--accent-dim)" : "var(--bg-1)",
          boxShadow: over ? "var(--glow-accent)" : "none",
          transform: over ? "scale(1.01)" : "scale(1)",
          transition: "all var(--dur-2) var(--ease-out)" }}>
        <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: over ? "var(--accent)" : "var(--text-body)" }}>{label}</span>
        <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>{hint}</span>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => add(e.target.files)} style={{ display: "none" }} />
      </div>
      {files.map((f, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 12px", alignItems: "baseline", padding: "8px 12px", background: "var(--bg-1)", border: "1px solid var(--edge-1)", borderRadius: "var(--r-1)" }}>
          <span style={{ fontSize: "var(--text-sm)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: f.p >= 100 ? "var(--ok)" : "var(--text-faint)" }}>{f.p >= 100 ? "done" : kb(f.size)}</span>
          <Progress value={f.p} showValue={false} style={{ gridColumn: "1 / -1" }} tone={f.p >= 100 ? "ok" : "accent"} />
        </div>
      ))}
    </div>
  );
}
