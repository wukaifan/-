import { useEffect, useState } from "react";
import { mainDetailArt } from "../data/portfolio.js";

export default function DetailPage({
  title = "主图详情页",
  subtitle = "完整的电商主图与详情页设计，点击任意一张即可放大查看。",
  tag = "SELECTED WORK",
  artworks = mainDetailArt,
  backHref = "#work",
  backLabel = "返回精选项目",
  countLabel = "个详情页",
  masonry = false,
}) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setExpanded(null);
    };
    if (expanded) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <div className={`detailpage ${masonry ? "detailpage--masonry" : ""}`}>
      <header className="detailpage__top">
        <a className="detailpage__back" href={backHref}>
          ← {backLabel}
        </a>
        <span className="detailpage__count">
          {artworks.length} {countLabel}
        </span>
      </header>

      <div className="container detailpage__inner">
        <header className="detailpage__head">
          <span className="detailpage__tag">{tag}</span>
          <h1 className="detailpage__title">{title}</h1>
          <p className="detailpage__desc">{subtitle}</p>
        </header>

        <div className="detailpage__grid">
          {artworks.map((art, i) => (
            <article
              className="detailpage__card"
              key={art.title}
              data-reveal
              style={{ "--d": `${i * 0.06}s` }}
              onClick={() => setExpanded(art)}
            >
              <div className="detailpage__thumb">
                <img src={art.thumb} alt={art.title} loading="lazy" decoding="async" />
                <span className="detailpage__zoom" aria-hidden="true">
                  +
                </span>
              </div>
              <div className="detailpage__cardbody">
                <div className="detailpage__cardhead">
                  <span className="detailpage__no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="detailpage__cat">{art.category}</span>
                </div>
                <h2 className="detailpage__cardtitle">{art.title}</h2>
                <p className="detailpage__cardmeta">
                  {art.brand} · {art.year}
                </p>
                <p className="detailpage__carddesc">{art.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {expanded && (
        <div className="detailpage__view" role="dialog" aria-modal="true">
          <button
            className="detailpage__close"
            type="button"
            onClick={() => setExpanded(null)}
            aria-label="关闭"
          >
            ×
          </button>
          <div className="detailpage__view-wrap">
            <img src={expanded.img} alt={expanded.title} decoding="async" />
          </div>
          <div className="detailpage__view-caption">
            {expanded.title} · {expanded.brand}
          </div>
        </div>
      )}
    </div>
  );
}
