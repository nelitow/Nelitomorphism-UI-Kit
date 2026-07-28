import React from "react";

/** Compact text input with animated focus underline + ring. */
export function Input({ label, hint, error, mono = false, size = "md", style, inputStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const h = size === "lg" ? "var(--control-h-lg)" : "var(--control-h)";
  return (
    <label style={{ display: "grid", gap: 5, ...style }}>
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", letterSpacing: "var(--track-wide)", textTransform: "uppercase", color: focus ? "var(--accent)" : "var(--text-dim)", transition: "color var(--dur-1) var(--ease-out)" }}>{label}</span>}
      <span style={{ position: "relative", display: "block" }}>
        <input
          {...rest}
          onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
          style={{
            width: "100%", height: h, padding: "var(--pad-control)", borderRadius: "var(--r-1)",
            background: "var(--bg-1)", color: "var(--text-body)", outline: "none",
            border: `1px solid ${error ? "var(--danger)" : focus ? "var(--edge-focus)" : "var(--edge-1)"}`,
            boxShadow: focus ? "var(--focus-ring)" : "none",
            fontFamily: mono ? "var(--font-mono)" : "var(--font-ui)", fontSize: "var(--text-sm)",
            transition: "border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)",
            ...inputStyle,
          }}
        />
        <span style={{ position: "absolute", left: "50%", bottom: 0, height: 1.5, background: "var(--accent)", width: focus ? "100%" : "0%", transform: "translateX(-50%)", borderRadius: 2, transition: "width var(--dur-3) var(--ease-spring)", boxShadow: "0 0 8px var(--accent)" }} />
      </span>
      {(error || hint) && <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: error ? "var(--danger)" : "var(--text-faint)" }}>{error || hint}</span>}
    </label>
  );
}
