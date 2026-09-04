import { useEffect, useState } from "react";
import { nav, profile } from "../data/portfolio.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand" aria-label="回到首页">
          <span className="nav__mono">{profile.name.slice(0, 1)}</span>
          <span className="nav__name">{profile.name}</span>
          <span className="nav__meta">Designer</span>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${active === item.id ? "is-active" : ""}`}
            >
              <span className="nav__idx">{item.index}</span>
              <span className="nav__label">{item.label}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--ghost nav__cta">
          <span>联系合作</span>
          <span className="btn__arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}
