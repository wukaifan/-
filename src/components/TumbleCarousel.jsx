import { useCallback, useEffect, useRef, useState } from "react";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// 复刻 React Bits Pro 的 Tumble Carousel：
// 卡片围绕焦点逐级"翻滚"（旋转 + 垂直位移 + 缩放 + 渐隐），支持自动播放 / 拖拽 / 键盘 / 循环。
export default function TumbleCarousel({
  items = [],
  initialIndex = 3,
  cardWidth = 280,
  gap = 14,
  aspectRatio = "4 / 5",
  frameHeight,
  rotation = 16,
  verticalOffset = 24,
  inactiveScale = 0.72,
  visibleRange = 2.4,
  borderRadius = 22,
  titleBlur = 2,
  speed = 1,
  showTitles = true,
  showControls = true,
  showCounter = true,
  loop = true,
  autoplay = true,
  autoplayDelay = 2600,
  enableDrag = true,
  enableKeyboard = true,
  className = "",
  onIndexChange,
  renderItem,
}) {
  const n = items.length;
  const [index, setIndex] = useState(() =>
    clamp(initialIndex, 0, Math.max(0, n - 1))
  );
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const dragStartX = useRef(0);

  const [rw, rh] = aspectRatio.split("/").map((s) => parseFloat(s.trim()));
  const ratio = rw && rh ? rh / rw : 1;
  const cardHeight = Math.round(cardWidth * ratio);
  const offsetPx = (verticalOffset / 100) * cardHeight;
  const frameH =
    frameHeight ?? Math.round(cardHeight + offsetPx * visibleRange + 80);

  const advance = useCallback(
    (dir) => {
      setIndex((prev) => {
        let next = prev + dir;
        if (loop) next = ((next % n) + n) % n;
        else next = clamp(next, 0, n - 1);
        return next;
      });
    },
    [loop, n]
  );

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    if (!autoplay || dragging || hover || n < 2) return;
    const id = setInterval(() => advance(1), autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, advance, dragging, hover, n]);

  const onKeyDown = (e) => {
    if (!enableKeyboard) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    }
  };

  const onPointerDown = (e) => {
    if (!enableDrag) return;
    dragStartX.current = e.clientX;
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    setDragging(true);
  };

  const onPointerUp = (e) => {
    if (!enableDrag) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 42) advance(dx < 0 ? 1 : -1);
    setDragging(false);
  };

  return (
    <div
      className={`tc ${className}`}
      style={{ "--tc-card-w": `${cardWidth}px`, "--tc-speed": `${speed}` }}
      role="region"
      aria-roledescription="carousel"
      aria-label="作品轮播"
      tabIndex={enableKeyboard ? 0 : -1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="tc__viewport" style={{ height: `${frameH}px` }}>
        <div className="tc__stage">
          {items.map((item, j) => {
            let step = j - index;
            const half = Math.floor(n / 2);
            if (loop) {
              if (step > half) step -= n;
              if (step < -half) step += n;
            }
            const abs = Math.abs(step);
            const opacity = clamp(1 - abs / visibleRange, 0, 1);
            const scale = step === 0 ? 1 : inactiveScale;
            const tx = step * (cardWidth + gap);
            const ty = abs * offsetPx;
            const rot = step * rotation;
            const z = 100 - abs * 10;

            return (
              <div
                key={item.id ?? j}
                className={`tc__card ${step === 0 ? "is-active" : ""}`}
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: `${borderRadius}px`,
                  transform: `translate(-50%, -50%) translate3d(${tx}px, ${ty}px, ${
                    -abs * 36
                  }px) rotateY(${rot}deg) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  "--tc-blur": `${titleBlur}px`,
                }}
              >
                {renderItem ? (
                  renderItem(item, step === 0)
                ) : (
                  <div className="tc__media">
                    <img
                      src={item.src}
                      alt={item.title}
                      draggable={false}
                      loading="lazy"
                    />
                    {showTitles && (
                      <div
                        className={`tc__caption ${
                          step === 0 ? "is-active" : ""
                        }`}
                      >
                        <span className="tc__cat">{item.category}</span>
                        <span className="tc__title">{item.title}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showControls && (
        <div className="tc__controls">
          <button
            type="button"
            className="tc__btn"
            onClick={() => advance(-1)}
            aria-label="上一张"
          >
            ←
          </button>
          {showCounter && (
            <span className="tc__counter">
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          )}
          <button
            type="button"
            className="tc__btn"
            onClick={() => advance(1)}
            aria-label="下一张"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
