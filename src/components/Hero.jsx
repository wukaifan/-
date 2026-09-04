import AmbientBackground from "./AmbientBackground.jsx";
import TumbleCarousel from "./TumbleCarousel.jsx";
import { profile } from "../data/portfolio.js";

import c01 from "../assets/work/case-01-car.jpg";
import c02 from "../assets/work/case-02-car.jpg";
import c03 from "../assets/work/case-03-car.jpg";
import c04 from "../assets/work/case-04-car.jpg";
import c05 from "../assets/work/case-05-car.jpg";
import c06 from "../assets/work/case-06-car.jpg";
import c07 from "../assets/work/case-07-car.jpg";
import c08 from "../assets/work/case-08-car.jpg";
import c09 from "../assets/work/case-09-car.jpg";
import c10 from "../assets/work/case-10-car.jpg";

const cases = [
  { src: c01, title: "卡皮巴拉礼盒", category: "电商视觉" },
  { src: c02, title: "沐浴系列", category: "主图 · 场景合成" },
  { src: c03, title: "儿童沐浴露", category: "产品静物 · 精修" },
  { src: c04, title: "618 母婴节", category: "活动专题" },
  { src: c05, title: "美妆视觉", category: "品牌 · AI 视觉" },
  { src: c06, title: "品牌 17 周年", category: "创意海报" },
  { src: c07, title: "水彩 · 文具系列", category: "插画视觉" },
  { src: c08, title: "RABBIT 石榴礼盒", category: "产品渲染" },
  { src: c09, title: "音乐节视觉", category: "创意海报" },
  { src: c10, title: "文具收纳", category: "场景设计" },
];

export default function Hero() {
  const year = new Date().getFullYear();

  return (
    <section id="home" className="hero">
      <AmbientBackground variant="hero" />

      <div className="hero__inner container">
        <div className="hero__top">
          <p className="hero__eyebrow" data-reveal>
            <span className="hero__eyebrow-mark" aria-hidden="true">
              ✦
            </span>
            <span>你好，我是一名视觉设计师。</span>
          </p>

          <h1 className="hero__title" data-reveal>
            <span className="hero__row hero__row--year">
              {year}
              <span className="hero__cross" aria-hidden="true">
                ×
              </span>
            </span>
            <span className="hero__row hero__row--main">设计作品集</span>
          </h1>

          <p className="hero__sub" data-reveal>
            六年电商与视觉设计经验，习惯从商业目标出发做设计——
            不止于好看，更在乎品牌气质、转化与体验。
          </p>

          <div className="hero__meta" data-reveal>
            <div className="hero__meta-block">
              <span className="hero__meta-num">06+</span>
              <span className="hero__meta-label">年 · 视觉 &amp; 电商设计经验</span>
            </div>
            <div className="hero__meta-block hero__meta-block--mono">
              <span className="hero__meta-code">NANCHANG · CN</span>
              <span className="hero__meta-label">
                {profile.location} — {year}
              </span>
            </div>
          </div>
        </div>

        <div className="hero__bottom" data-reveal>
          <TumbleCarousel
            items={cases}
            initialIndex={2}
            cardWidth={175}
            gap={18}
            aspectRatio="4 / 5"
            rotation={0}
            verticalOffset={0}
            inactiveScale={0.8}
            visibleRange={3.4}
            borderRadius={16}
            titleBlur={2}
            loop
            autoplay
            autoplayDelay={2400}
            showTitles
            showControls
            showCounter
          />
        </div>
      </div>
    </section>
  );
}
