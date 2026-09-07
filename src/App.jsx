import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import BlinkingDots from "./components/BlinkingDots.jsx";
import SplashCursor from "./components/SplashCursor.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Strengths from "./components/Strengths.jsx";
import Contact from "./components/Contact.jsx";
import DetailPage from "./components/DetailPage.jsx";
import { posterArt, homeKvArt, otherArt } from "./data/portfolio.js";
import { useMotion } from "./hooks/useMotion.js";

function currentPage() {
  const h = window.location.hash;
  if (h === "#main-detail") return "main";
  if (h === "#posters") return "posters";
  if (h === "#kv") return "kv";
  if (h === "#others") return "others";
  return "home";
}

export default function App() {
  const [page, setPage] = useState(currentPage());
  useMotion(page);

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    const onHash = () => setPage(currentPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (page === "main") {
    return <DetailPage masonry />;
  }

  if (page === "posters") {
    return (
      <DetailPage
        title="创意海报"
        tag="POSTERS"
        subtitle="面向品牌与活动的创意海报，点击任意一张即可放大查看。"
        artworks={posterArt}
        countLabel="张海报"
        backLabel="返回精选项目"
        backHref="#work"
        masonry
      />
    );
  }

  if (page === "kv") {
    return (
      <DetailPage
        title="首页视觉"
        tag="HOME KEY VISUAL"
        subtitle="面向大促与节日的首页主视觉（KV），点击任意一张即可放大查看。"
        artworks={homeKvArt}
        countLabel="张主视觉"
        backLabel="返回精选项目"
        backHref="#work"
        masonry
      />
    );
  }

  if (page === "others") {
    return (
      <DetailPage
        title="其他设计"
        tag="MORE DESIGN"
        subtitle="招聘、教育、节日与品牌等多元设计，点击任意一张即可放大查看。"
        artworks={otherArt}
        countLabel="张作品"
        backLabel="返回精选项目"
        backHref="#work"
        masonry
      />
    );
  }

  return (
    <div className="site">
      <div className="intro" aria-hidden="true">
        <span className="intro__title">
          吴凯帆
          <em>WU KAIFAN</em>
        </span>
        <span className="intro__meta">VISUAL · AI · E-COMMERCE DESIGNER</span>
      </div>
      <BlinkingDots spacing={84} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={2.5}
        CURL={2}
        SPLAT_FORCE={5000}
        SPLAT_RADIUS={0.22}
        SHADING={false}
        RAINBOW_MODE={false}
        COLOR="#ffa71f"
      />
    </div>
  );
}
