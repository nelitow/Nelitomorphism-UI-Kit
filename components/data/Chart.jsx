import React from "react";

const HUES = { accent: "oklch(0.82 0.15 195", accent2: "oklch(0.82 0.15 305", ok: "oklch(0.8 0.15 160", warn: "oklch(0.82 0.15 85", danger: "oklch(0.72 0.19 25" };

/**
 * Canvas chart with morph animation: while loading it draws live noise waves;
 * when data arrives the noise morphs into the real series. type: line | area | bars.
 */
export function Chart({ data, series, type = "area", height = 120, loading = false, grid = true, style, ...rest }) {
  const ref = React.useRef(null);
  const stateRef = React.useRef({ pts: null });
  const all = series || [{ data: data || [], tone: "accent" }];
  const key = JSON.stringify(all.map(s => s.data)) + type + loading;
  React.useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let raf, visible = true, w = 0, h = 0;
    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
    const N = Math.max(...all.map(s => s.data.length), 24);
    const st = stateRef.current;
    if (!st.pts || st.pts.length !== all.length || st.pts[0].length !== N)
      st.pts = all.map(() => new Array(N).fill(0.5));
    const maxV = Math.max(1e-9, ...all.flatMap(s => s.data));
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !w) return;
      const t = now / 1000;
      all.forEach((s, si) => {
        const cur = st.pts[si];
        for (let i = 0; i < N; i++) {
          const target = loading || !s.data.length
            ? 0.45 + 0.2 * Math.sin(i * 0.55 + t * 2.2 + si * 2) + 0.08 * Math.sin(i * 1.7 - t * 3.1)
            : (s.data[Math.min(i, s.data.length - 1)] / maxV);
          cur[i] += (target - cur[i]) * 0.09;
        }
      });
      ctx.clearRect(0, 0, w, h);
      if (grid) {
        ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1;
        for (let g = 1; g < 4; g++) { const y = (h - 14) * g / 4 + 4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      }
      all.forEach((s, si) => {
        const hue = HUES[s.tone || (si === 0 ? "accent" : "accent2")] || HUES.accent;
        const cur = st.pts[si];
        const X = (i) => (i / (N - 1)) * w;
        const Y = (v) => 4 + (1 - Math.max(0, Math.min(1, v))) * (h - 18);
        const alpha = loading ? 0.45 : 1;
        if (type === "bars") {
          const bw = Math.max(2, w / N - 3);
          for (let i = 0; i < N; i++) {
            const y = Y(cur[i]);
            const gr = ctx.createLinearGradient(0, y, 0, h - 10);
            gr.addColorStop(0, `${hue} / ${0.9 * alpha})`); gr.addColorStop(1, `${hue} / ${0.15 * alpha})`);
            ctx.fillStyle = gr;
            ctx.beginPath(); ctx.roundRect(X(i) - bw / 2 + (i === 0 ? bw / 2 : 0), y, bw, h - 10 - y, 2); ctx.fill();
          }
        } else {
          ctx.beginPath();
          for (let i = 0; i < N; i++) i ? ctx.lineTo(X(i), Y(cur[i])) : ctx.moveTo(X(0), Y(cur[0]));
          if (type === "area") {
            const fill = ctx.createLinearGradient(0, 0, 0, h);
            fill.addColorStop(0, `${hue} / ${0.28 * alpha})`); fill.addColorStop(1, `${hue} / 0)`);
            ctx.save(); ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.restore();
            ctx.beginPath();
            for (let i = 0; i < N; i++) i ? ctx.lineTo(X(i), Y(cur[i])) : ctx.moveTo(X(0), Y(cur[0]));
          }
          ctx.strokeStyle = `${hue} / ${alpha})`; ctx.lineWidth = 1.5;
          ctx.shadowColor = `${hue} / ${0.5 * alpha})`; ctx.shadowBlur = 8;
          ctx.stroke(); ctx.shadowBlur = 0;
        }
      });
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [key]);
  return <canvas {...rest} ref={ref} style={{ display: "block", width: "100%", height, ...style }} />;
}
