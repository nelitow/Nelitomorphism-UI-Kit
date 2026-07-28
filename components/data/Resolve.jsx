import React from "react";

const GLYPHS = "▓▒░<>/\\|=+*#%&@$0123456789ABCDEF";

/**
 * The Nelitomorphism loader: structure is never loading — content materializes in place.
 * Text scrambles while loading, then locks in left-to-right. Numbers count up.
 */
export function Resolve({ loading = false, children, format, duration = 900, style, ...rest }) {
  const target = typeof children === "number" && format ? String(format(children)) : toText(children);
  const isNum = typeof children === "number" && !format;
  const [out, setOut] = React.useState(loading ? scramble(target.length || 6) : target);
  const stateRef = React.useRef({ locked: 0, t0: 0 });
  React.useEffect(() => {
    let raf, last = 0;
    const st = stateRef.current;
    st.t0 = performance.now(); st.locked = loading ? 0 : st.locked;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 40) return; last = now;
      if (loading) { setOut(scramble(target.length || 6)); return; }
      const p = Math.min(1, (now - st.t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      if (isNum) {
        const v = children * e;
        setOut(p >= 1 ? String(children) : (Number.isInteger(children) ? Math.round(v).toLocaleString("en-US") : v.toFixed(String(children).split(".")[1]?.length || 1)));
      } else {
        const n = Math.floor(target.length * e);
        setOut(target.slice(0, n) + scramble(target.length - n));
      }
      if (p >= 1) { setOut(target); cancelAnimationFrame(raf); }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loading, target, children, isNum, duration]);
  return <span {...rest} style={{ fontVariantNumeric: "tabular-nums", opacity: loading ? 0.55 : 1, transition: "opacity var(--dur-2) var(--ease-out)", ...style }}>{out}</span>;
}

function toText(c) { if (c == null || c === false || c === true) return ""; if (Array.isArray(c)) return c.map(toText).join(""); if (typeof c === "object") return toText(c.props && c.props.children); return String(c); }
function scramble(n) { let s = ""; for (let i = 0; i < n; i++) s += GLYPHS[(Math.random() * GLYPHS.length) | 0]; return s; }

/** Block-level resolve: children render at final size, defocused + desaturated until loaded. */
export function ResolveBlock({ loading = false, children, style, ...rest }) {
  return (
    <div {...rest} style={{
      filter: loading ? "blur(10px) saturate(0.2) brightness(0.8)" : "none",
      transition: "filter var(--dur-4) var(--ease-out)", willChange: "filter", ...style,
    }}>{children}</div>
  );
}
