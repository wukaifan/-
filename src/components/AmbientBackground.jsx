import { useState } from "react";

// 视频文件放到 public/videos/ambient.mp4 后会自动启用视频背景；
// 未提供时，由下方的动画渐变 + 网格 + 颗粒构成"类视频"的动态背景。
export default function AmbientBackground({ variant = "hero" }) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div
      className={`ambient ambient--${variant} ${videoReady ? "is-live" : ""}`}
      aria-hidden="true"
    >
      <video
        className={`ambient__video ${videoReady ? "is-live" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
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
