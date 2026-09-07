import { useEffect, useRef, useState } from "react";

// 视频文件放到 public/videos/ambient.mp4 后会自动启用视频背景；
// 未提供时，由下方的动画渐变 + 网格 + 颗粒构成"类视频"的动态背景。
export default function AmbientBackground({ variant = "hero" }) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const v = videoRef.current;
    if (!v) return;
    let timerId = null;
    let idleId = null;
    const start = () => {
      try {
        const p = v.play();
        if (p && p.catch) p.catch(() => {});
      } catch (e) {
        /* noop */
      }
    };
    // 首屏先展示动画渐变背景，等空闲后再拉取并播放视频，避免被 4MB 视频阻塞。
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 2200 });
    } else {
      timerId = setTimeout(start, 1800);
    }
    return () => {
      if (idleId != null && "cancelIdleCallback" in window)
        window.cancelIdleCallback(idleId);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className={`ambient ambient--${variant} ${videoReady ? "is-live" : ""}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className={`ambient__video ${videoReady ? "is-live" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
      >
        <source src="videos/ambient.mp4" type="video/mp4" />
      </video>

      <div className="ambient__blob ambient__blob--a" />
      <div className="ambient__blob ambient__blob--b" />
      <div className="ambient__blob ambient__blob--c" />
      <div className="ambient__grid" />
      <div className="ambient__grain" />
      <div className="ambient__veil" />
    </div>
  );
}
