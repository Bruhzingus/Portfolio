import { useEffect } from 'react';

/**
 * One consistent, cross-browser entrance system for the whole site.
 *
 * Every element tagged with `data-reveal` (or `data-reveal-stagger` for a
 * container whose children should cascade in) starts hidden and animates up
 * into place the first time it crosses into the viewport. Unlike CSS
 * `animation-timeline: view()` (Chrome-only, and it re-hides content when you
 * scroll back up), this uses IntersectionObserver, which every modern browser
 * supports, and it reveals each element exactly once.
 *
 * Falls back to "everything visible" when reduced motion is requested or when
 * IntersectionObserver is unavailable, so content is never trapped at opacity 0.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    );
    if (!els.length) return;

    const reduce =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      },
      // No negative bottom margin: page-bottom sections (footer, last section)
      // can never be scrolled *past* a shrunk root, so they'd stay hidden.
      // A small visibility threshold fires the reveal as each block enters view.
      { rootMargin: '0px', threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
