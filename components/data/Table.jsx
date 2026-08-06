import React from "react";
import { useBreakpoint, density } from "../core/useBreakpoint.js";
import { Resolve } from "./Resolve.jsx";

/**
 * Dense data table: sortable mono headers, staggered row entrance, hover trace.
 * loading renders real row structure with scrambling cells — no skeletons.
 */
export function Table({ columns, rows = [], loading = false, loadingRows = 5, onRowClick, primaryKey, style, ...rest }) {
  const { compact, touch } = useBreakpoint();
  const { control } = density(touch);
  const [sort, setSort] = React.useState(null);
  const [hovered, setHovered] = React.useState(-1);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const r = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * (sort.dir ? 1 : -1));
    return r;
  }, [rows, sort]);
  const body = loading ? Array.from({ length: loadingRows }, () => null) : sorted;
  const primaryColumn = columns.find((column) => column.key === primaryKey) || columns[0];
  const recordColumns = primaryColumn ? columns.filter((column) => column.key !== primaryColumn.key) : columns;
  React.useEffect(() => {
    if (document.getElementById("neli-kf-row")) return;
    const el = document.createElement("style"); el.id = "neli-kf-row";
    el.textContent = "@keyframes neli-row{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}";
    document.head.appendChild(el);
  }, []);
  const cellPad = "7px 12px";
  const cellValue = (row, column, rowIndex) => row
    ? (column.render ? column.render(row[column.key], row) : row[column.key])
    : <Resolve loading style={{ color: "var(--text-faint)" }}>{"——————".slice(0, 3 + ((rowIndex + column.key.length) % 4))}</Resolve>;

  if (compact) {
    return (
      <div {...rest} style={{ overflow: "hidden", border: "1px solid var(--edge-1)", borderRadius: "var(--r-2)", background: "var(--surface-panel)", ...style }}>
        <div style={{ display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch", borderBottom: "1px solid var(--edge-1)" }}>
          {columns.map((column) => (
            <button key={column.key} type="button" onClick={() => setSort((current) => ({ key: column.key, dir: current?.key === column.key ? !current.dir : true }))}
              style={{ flex: "0 0 auto", minHeight: touch ? control : undefined, padding: cellPad, border: 0, background: "transparent", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap",
                fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", letterSpacing: "var(--track-wide)",
                textTransform: "uppercase", color: sort?.key === column.key ? "var(--accent)" : "var(--text-faint)", transition: "color var(--dur-1) var(--ease-out)" }}>
              {column.label}{sort?.key === column.key ? (sort.dir ? " ↑" : " ↓") : ""}
            </button>
          ))}
        </div>
        <div>
          {body.map((row, rowIndex) => (
            <div key={rowIndex}
              onPointerEnter={() => setHovered(rowIndex)} onPointerLeave={() => setHovered(-1)}
              onClick={row && onRowClick ? () => onRowClick(row) : undefined}
              style={{ minHeight: touch ? control : undefined, padding: cellPad, background: hovered === rowIndex && row ? "oklch(1 0 0 / 0.045)" : "transparent", cursor: row && onRowClick ? "pointer" : "default",
                animation: `neli-row var(--dur-3) var(--ease-out) both ${rowIndex * 40}ms`, transition: "background var(--dur-1) var(--ease-out)",
                borderBottom: rowIndex < body.length - 1 ? "1px solid oklch(1 0 0 / 0.04)" : "none" }}>
              {primaryColumn && <div style={{ minWidth: 0, color: "var(--text-body)", fontFamily: primaryColumn.mono ? "var(--font-mono)" : "var(--font-ui)", fontWeight: "var(--weight-medium)", overflowWrap: "anywhere" }}>{cellValue(row, primaryColumn, rowIndex)}</div>}
              {recordColumns.map((column) => (
                <div key={column.key} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "var(--sp-3)", alignItems: "baseline", minWidth: 0, marginTop: primaryColumn ? 4 : 0 }}>
                  <span style={{ minWidth: 0, color: "var(--text-faint)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", overflowWrap: "anywhere" }}>{column.label}</span>
                  <span style={{ minWidth: 0, textAlign: column.align || "right", color: "var(--text-body)", fontFamily: column.mono ? "var(--font-mono)" : "var(--font-ui)", overflowWrap: "anywhere" }}>{cellValue(row, column, rowIndex)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div {...rest} style={{ overflow: "auto", WebkitOverflowScrolling: "touch", border: "1px solid var(--edge-1)", borderRadius: "var(--r-2)", background: "var(--surface-panel)", ...style }}>
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
