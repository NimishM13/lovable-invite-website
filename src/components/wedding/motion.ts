import { useEffect } from "react";

/**
 * Scroll choreography for the invitation, dependency-free:
 * - `[data-reveal]` elements fade/slide in once via a single IntersectionObserver.
 *   Use `style={{'--d': n}}` for a stagger step.
 * - `[data-parallax="0.12"]` elements receive a `--py` offset (px) from one rAF-throttled
 *   scroll listener. Desktop only (plus elements marked `data-parallax-mobile`).
 * Reduced motion: everything is shown immediately and nothing moves.
 */
export function useInvitationMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealables = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce || !("IntersectionObserver" in window)) {
      revealables.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    revealables.forEach((el) => observer.observe(el));

    const desktop = window.matchMedia("(min-width: 761px)");
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of layers) {
        if (!desktop.matches && !el.hasAttribute("data-parallax-mobile")) {
          el.style.removeProperty("--py");
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -vh * 0.2 || rect.top > vh * 1.2) continue;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.setProperty(
          "--py",
          `${(progress * Number(el.dataset["parallax"] || 0) * -100).toFixed(1)}px`,
        );
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
    };
  }, []);
}
