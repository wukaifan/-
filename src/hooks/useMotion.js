import { useLayoutEffect } from "react";

const EASE = "expo.out";
const POWER = "power3.out";

export function useMotion(page) {
  useLayoutEffect(() => {
    const gsap = window.gsap;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 降级：无 GSAP 或用户减少动效时，直接移除 intro，页面保持可读。
    if (!gsap || !window.ScrollTrigger || reduce) {
      document.querySelector(".intro")?.remove();
      return;
    }

    gsap.registerPlugin(window.ScrollTrigger);

    const ctx = gsap.context(() => {
      // ---------- 开场 intro ----------
      const intro = document.querySelector(".intro");
      if (intro) {
        const shown = sessionStorage.getItem("codex_intro") === "1";
        if (shown) {
          intro.remove();
        } else {
          const tl = gsap.timeline({
            defaults: { ease: EASE },
            onComplete: () => {
              sessionStorage.setItem("codex_intro", "1");
              document.body.style.overflow = "";
              intro.remove();
            },
          });
          tl.set("body", { overflow: "hidden" })
            .set(intro, { autoAlpha: 1 })
            .fromTo(
              ".intro__title",
              { yPercent: 130, autoAlpha: 0 },
              { yPercent: 0, autoAlpha: 1, duration: 1.0 }
            )
            .fromTo(
              ".intro__meta",
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
              "-=0.55"
            )
            .to(intro, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.4")
            .set(intro, { autoAlpha: 0 });
        }
      }

      // ---------- 首页 Hero 进场 ----------
      if (document.querySelector(".hero")) {
        gsap
          .timeline({ defaults: { ease: EASE }, delay: 1.1 })
          .fromTo(
            ".hero__eyebrow",
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.7 }
          )
          .fromTo(
            ".hero__row",
            {
              autoAlpha: 0,
              yPercent: 118,
              clipPath: "inset(0 0 100% 0)",
            },
            {
              autoAlpha: 1,
              yPercent: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              stagger: 0.16,
              ease: "expo.out",
            },
            "-=0.4"
          )
          .fromTo(
            ".hero__sub",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: POWER },
            "-=0.6"
          )
          .fromTo(
            ".hero__meta",
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: POWER },
            "-=0.55"
          )
          .fromTo(
            ".hero__bottom",
            { autoAlpha: 0, y: 44 },
            { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.4"
          );
      }

      // ---------- 每个模块：英文/大标题强进场 ----------
      gsap.utils.toArray(".section").forEach((section) => {
        const overline = section.querySelector(".section-head__overline");
        const title = section.querySelector(".section-head__title");
        const desc = section.querySelector(".section-head__desc");

        if (overline)
          gsap.fromTo(
            overline,
            { autoAlpha: 0, x: -36, clipPath: "inset(0 100% 0 0)" },
            {
              autoAlpha: 1,
              x: 0,
              clipPath: "inset(0 0% 0 0)",
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: overline, start: "top 82%", once: true },
            }
          );
        if (title)
          gsap.fromTo(
            title,
            { autoAlpha: 0, yPercent: 120, clipPath: "inset(0 0 100% 0)" },
            {
              autoAlpha: 1,
              yPercent: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.05,
              ease: "expo.out",
              scrollTrigger: { trigger: title, start: "top 80%", once: true },
            }
          );
        if (desc)
          gsap.fromTo(
            desc,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: POWER,
              scrollTrigger: { trigger: desc, start: "top 82%", once: true },
            }
          );
      });

      // ---------- 卡片依次 stagger ----------
      [
        ".projects__grid",
        ".about__facts",
        ".about__stats",
        ".about__experience",
        ".skills__grid",
        ".contact__links",
        ".detailpage__grid",
      ].forEach((sel) => {
        const grid = document.querySelector(sel);
        if (!grid) return;
        const items = Array.from(grid.children);
        if (!items.length) return;
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 46 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: grid, start: "top 80%", once: true },
          }
        );
      });

      // ---------- 图片 reveal + 视差 ----------
      gsap.utils.toArray(".portrait-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.16, yPercent: 6, filter: "blur(6px)" },
          {
            scale: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: POWER,
            scrollTrigger: { trigger: img, start: "top 78%", once: true },
          }
        );
      });
      gsap.utils.toArray(".project__cover-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      const heroBottom = document.querySelector(".hero__bottom");
      if (heroBottom)
        gsap.fromTo(
          heroBottom,
          { y: 46 },
          {
            y: -46,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );

      window.ScrollTrigger.refresh();
    });

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [page]);
}
