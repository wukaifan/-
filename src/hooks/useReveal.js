import { useEffect } from "react";

// 滚动进入视口时，给带 .reveal 的元素加 .is-in 实现渐显。
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    };

    scan();
    // 监听后续新增的 [data-reveal] 元素（例如从首页切换到二级详情页时）
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
