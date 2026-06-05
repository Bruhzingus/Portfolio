import { useRef, useEffect } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

/**
 * A muted, looping background video that is cheap by default:
 *   - preload="none" so nothing downloads until it actually needs to play,
 *     keeping the file (often ~1 MB) off the critical path on first paint.
 *   - plays only while scrolled into view, pausing when it leaves.
 *   - never autoplays for visitors who prefer reduced motion; the poster
 *     stays put instead (WCAG 2.2.2).
 *
 * The poster carries the visual immediately, so there is no layout shift.
 */
export default function LazyVideo({
  src,
  poster,
  className,
  rootMargin = '200px',
  threshold = 0.25,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (reduced) {
      v.pause();
      return; // poster only
    }

    // Calling play() on a preload="none" video kicks off the download itself,
    // so we don't need an explicit load().
    if (typeof IntersectionObserver === 'undefined') {
      v.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin, threshold }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, rootMargin, threshold]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster || undefined}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      {...rest}
    />
  );
}
