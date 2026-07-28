import React from "react";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
const FRAG = `precision mediump float;
uniform vec2 u_res;uniform float u_time;uniform vec2 u_mouse;uniform float u_hue;uniform float u_hue2;uniform float u_int;
vec3 h2rgb(float h,float s,float l){vec3 k=mod(vec3(0.,8.,4.)+h/30.,12.);return l-s*min(l,1.-l)*clamp(min(k-3.,9.-k),-1.,1.);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 p=uv*3.0;float t=u_time*0.35;
  float v=sin(p.x*1.7+t)+sin(p.y*2.3+t*1.31)+sin(p.x+p.y+t*0.7);
  v+=1.4*sin(length(uv-u_mouse)*6.0-t*1.8);
  float m=v*0.25+0.5;
  float hue=mix(u_hue,u_hue2,smoothstep(0.15,0.85,m));
  float edge=1.0-smoothstep(0.0,0.45,min(min(uv.x,1.0-uv.x),min(uv.y,1.0-uv.y)));
  float l=(0.10+0.10*m+0.22*edge*edge)*u_int;
  vec3 c=h2rgb(hue,0.85,l);
  c+=h2rgb(hue,0.9,0.5)*pow(max(0.,1.0-length(uv-u_mouse)*1.6),3.0)*0.35*u_int;
  gl_FragColor=vec4(c,1.0);
}`;

/** WebGL iridescent surface. Fills its (position:relative) parent; pointer-reactive. */
export function NeliMaterial({ hue = 195, hue2 = 305, intensity = 1, speed = 1, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext("webgl", { antialias: false, depth: false });
    if (!gl) return;
    const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const uRes = U("u_res"), uT = U("u_time"), uM = U("u_mouse"), uH = U("u_hue"), uH2 = U("u_hue2"), uI = U("u_int");
    gl.uniform1f(uH, hue); gl.uniform1f(uH2, hue2); gl.uniform1f(uI, intensity);
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5, raf, visible = true, t0 = performance.now();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr); canvas.height = Math.max(1, r.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
    const host = canvas.parentElement || canvas;
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      tmx = (e.clientX - r.left) / r.width; tmy = 1 - (e.clientY - r.top) / r.height;
    };
    host.addEventListener("pointermove", onMove);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(canvas);
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      mx += (tmx - mx) * 0.08; my += (tmy - my) * 0.08;
      gl.uniform1f(uT, (now - t0) / 1000 * speed);
      gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); host.removeEventListener("pointermove", onMove); };
  }, [hue, hue2, intensity, speed]);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "inherit", pointerEvents: "none", ...style }} />;
}
