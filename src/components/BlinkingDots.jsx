import { useEffect, useRef } from "react";

// 复刻 React Bits Pro 的 Blinking Dots：
// 在固定网格上，每颗点以自己的节奏明亮又熄灭（明灭闪烁），作为网页背景动效。
export default function BlinkingDots({ spacing = 42, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const AMBER = "255, 167, 31";
    const WHITE = "255, 255, 255";
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let last = 0;
    let dots = [];

    const spawn = (x, y) => ({
      x,
      y,
      r: 1.8 + Math.random() * 1.9,
      phase: Math.random() * Math.PI * 2,
      speed: 0.7 + Math.random() * 1.7,
      dwell: 0.55 + Math.random() * 0.5,
      white: Math.random() < 0.12,
    });

    const build = () => {
      dots = [];
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          dots.push(spawn(i * spacing + (j % 2 ? spacing * 0.5 : 0), j * spacing));
        }
      }
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of dots) {
        const raw = (Math.sin(t * p.speed * p.dwell + p.phase) + 1) / 2;
        const on = Math.max(0, (raw - 0.58) / 0.42);
        const a = Math.pow(on, 0.85) * 0.5;
        if (a < 0.05) continue;
        const col = p.white ? WHITE : AMBER;
        ctx.fillStyle = `rgba(${col},${(a * 0.16).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${col},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      render();
      raf = requestAnimationFrame(loop);
    };

    resize();
    last = performance.now();
    window.addEventListener("resize", resize);

    if (reduce) {
      t = 2.2;
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [spacing]);

  return <canvas ref={canvasRef} className={`bgfx ${className}`} aria-hidden="true" />;
}
