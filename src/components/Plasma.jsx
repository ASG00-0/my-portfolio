// Plasma.jsx
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;

out vec4 fragColor;

vec3 tanhApprox(vec3 x) {
  vec3 x2 = x * x;
  return clamp(x * (27.0 + x2) / (27.0 + 9.0 * x2), -1.0, 1.0);
}

float fixNaN(float v) { return (v == v) ? v : 0.0; }
vec3 fixNaN3(vec3 v) { return vec3(fixNaN(v.x), fixNaN(v.y), fixNaN(v.z)); }

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float d = 0.0;
  float z = 0.0;
  float T = iTime * uSpeed * uDirection;

  vec3 O = vec3(0.0);
  vec3 p = vec3(0.0);
  vec3 S = vec3(0.0);
  vec2 r = iResolution.xy;
  vec2 Q = vec2(0.0);

  for (int j = 0; j < 60; j++) {
    p = z * normalize(vec3(C - 0.5 * r, r.y));
    p.z -= 4.0;
    S = p;
    d = p.y - T;

    p.x += 0.4 * (1.0 + p.y) * sin(d + p.x * 0.1) * cos(0.34 * d + p.x * 0.05);

    float angle = p.y - T;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    Q = rot * p.xz;
    p.xz = Q;

    float radial = length(Q);
    d = abs(radial - 0.25 * (5.0 + S.y)) / 3.0 + 8e-4;
    z += d;

    if (d > 0.0005) {
      o = 1.0 + sin(S.y + p.z * 0.5 + S.z - length(S - p) + vec4(2.0, 1.0, 0.0, 8.0));
      O += (o.w / d) * o.xyz;
    }
  }

  O = clamp(O, -1e6, 1e6);
  o.xyz = tanhApprox(O / 1e4);
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);

  vec3 rgb = fixNaN3(o.rgb);
  rgb = clamp(rgb, 0.0, 1.0);

  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  intensity = fixNaN(intensity);

  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  finalColor = fixNaN3(finalColor);
  finalColor = clamp(finalColor, 0.0, 1.0);

  float brightness = dot(finalColor, vec3(0.299, 0.587, 0.114));
  brightness = fixNaN(brightness);

  float alpha = smoothstep(0.0, 0.8, brightness) * uOpacity;
  alpha = fixNaN(alpha);
  alpha = clamp(alpha, 0.0, 1.0);

  fragColor = vec4(finalColor, alpha);
}
`;

export const Plasma = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
}) => {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      depth: false,
      antialias: false,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;

    // Make compositing deterministic in Firefox
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";

    container.style.position = "relative";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.transparent = true;

    const setSize = () => {
      const rect = container.getBoundingClientRect();

      // Always retry until we get a real size (Firefox can report 0 early)
      if (rect.width < 2 || rect.height < 2) return false;

      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      renderer.setSize(w, h);

      program.uniforms.iResolution.value = new Float32Array([
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ]);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    // Guaranteed sizing: immediate + double rAF + RO + window resize
    setSize();
    const r1 = requestAnimationFrame(() => setSize());
    const r2 = requestAnimationFrame(() => requestAnimationFrame(() => setSize()));

    const ro = new ResizeObserver(() => setSize());
    ro.observe(container);

    const onResize = () => setSize();
    window.addEventListener("resize", onResize, { passive: true });

    const handleMouseMove = (e) => {
      if (!mouseInteractive) return;
      const rect = container.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
      program.uniforms.uMouse.value = new Float32Array([x, y]);
    };

    if (mouseInteractive) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    let raf = 0;
    const t0 = performance.now();

    const loop = (t) => {
      // If size was 0 at mount, keep trying until it succeeds
      if (program.uniforms.iResolution.value[0] <= 1.5 || program.uniforms.iResolution.value[1] <= 1.5) {
        setSize();
      }

      const timeValue = (t - t0) * 0.001;

      if (direction === "pingpong") {
        const dur = 10;
        const seg = timeValue % dur;
        const isFwd = Math.floor(timeValue / dur) % 2 === 0;
        const u = seg / dur;
        const smooth = u * u * (3.0 - 2.0 * u);
        const ping = isFwd ? smooth * dur : (1.0 - smooth) * dur;
        program.uniforms.uDirection.value = 1.0;
        program.uniforms.iTime.value = ping;
      } else {
        program.uniforms.iTime.value = timeValue;
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.render({ scene: mesh });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      if (mouseInteractive) container.removeEventListener("mousemove", handleMouseMove);
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} className="w-full h-full relative overflow-hidden" style={{ width: "100%", height: "100%" }} />;
};

export default Plasma;
