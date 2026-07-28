import React from "react";
import { Resolve } from "./Resolve.jsx";

/**
 * Dense data table: sortable mono headers, staggered row entrance, hover trace.
 * loading renders real row structure with scrambling cells — no skeletons.
 */
export function Table({ columns, rows = [], loading = false, loadingRows = 5, onRowClick, style, ...rest }) {
  const [sort, setSort] = React.useState(null);
  const [hovered, setHovered] = React.useState(-1);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const r = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * (sort.dir ? 1 : -1));
    return r;
  }, [rows, sort]);
  const body = loading ? Array.from({ length: loadingRows }, () => null) : sorted;
  React.useEffect(() => {
    if (document.getElementById("neli-kf-row")) return;
    const el = document.createElement("style"); el.id = "neli-kf-row";
    el.textContent = "@keyframes neli-row{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}";
    document.head.appendChild(el);
  }, []);
  const cellPad = "7px 12px";
  return (
    <div {...rest} style={{ overflow: "auto", border: "1px solid var(--edge-1)", borderRadius: "var(--r-2)", background: "var(--surface-panel)", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} onClick={() => setSort(s => ({ key: c.key, dir: s?.key === c.key ? !s.dir : true }))}
                style={{ padding: cellPad, textAlign: c.align || "left", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
                  fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--track-wide)",
                  textTransform: "uppercase", color: sort?.key === c.key ? "var(--accent)" : "var(--text-faint)",
                  borderBottom: "1px solid var(--edge-1)", transition: "color var(--dur-1) var(--ease-out)" }}>
                {c.label}{sort?.key === c.key ? (sort.dir ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri}
              onPointerEnter={() => setHovered(ri)} onPointerLeave={() => setHovered(-1)}
              onClick={row && onRowClick ? () => onRowClick(row) : undefined}
              style={{ background: hovered === ri && row ? "oklch(1 0 0 / 0.045)" : "transparent", cursor: row && onRowClick ? "pointer" : "default",
                animation: `neli-row var(--dur-3) var(--ease-out) both ${ri * 40}ms`, transition: "background var(--dur-1) var(--ease-out)" }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: cellPad, textAlign: c.align || "left", whiteSpace: "nowrap",
                  fontFamily: c.mono ? "var(--font-mono)" : "var(--font-ui)", color: "var(--text-body)",
                  borderBottom: ri < body.length - 1 ? "1px solid oklch(1 0 0 / 0.04)" : "none" }}>
                  {row ? (c.render ? c.render(row[c.key], row) : row[c.key]) : <Resolve loading style={{ color: "var(--text-faint)" }}>{"——————".slice(0, 3 + ((ri + c.key.length) % 4))}</Resolve>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
