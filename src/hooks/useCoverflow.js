import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

/**
 * Drives the coverflow carousel: which cover is centred, keyboard/arrow/dot
 * navigation, touch swiping, and the per-frame slide that keeps the active
 * cover pinned to the viewport centre while neighbouring covers expand and
 * collapse. Returns the state and the refs/handlers the markup binds to.
 *
 * `n` is the number of covers. The hook reads the track's live child widths
 * each frame, so it stays correct as the software covers grow/shrink mid-slide.
 */
export default function useCoverflow(n) {
  const [center, setCenter] = useState(0);
  // Defaults to true where IntersectionObserver is unavailable so videos still work.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  const touchX = useRef(null);
  const flowRef = useRef(null);
  const trackRef = useRef(null);
  const trackX = useRef(0); // current translateX of the track, in px
  const rafRef = useRef(0);
  const didInit = useRef(false);

  const go = useCallback((dir) => {
    setCenter((c) => (c + dir + n) % n);
  }, [n]);

  const select = useCallback((i) => setCenter(i), []);

  const handleTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  // Slide the active cover to the centre of the viewport. The software covers
  // expand/collapse (390px <-> 720px) while this runs, which shifts the whole
  // row mid-flight; handing the browser one fixed target and letting CSS
  // interpolate overshoots, because that target keeps moving as widths change.
  // Instead we drive the track each frame, pinning the active cover's *screen*
  // centre onto an eased path from where it sits now to the viewport centre and
  // re-reading its live width every frame. It lands dead-centre, never past it.
  const settle = useCallback((animate) => {
    const flow = flowRef.current;
    const track = trackRef.current;
    if (!flow || !track) return;
    const el = track.children[center];
    if (!el) return;

    cancelAnimationFrame(rafRef.current);
    track.style.transition = 'none';

    const flowCenter = flow.clientWidth / 2;
    // Live centre of the active cover within the track (grows as it expands).
    const localCenter = () => el.offsetLeft + el.offsetWidth / 2;
    const reduceMotion =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || reduceMotion) {
      trackX.current = flowCenter - localCenter();
      track.style.transform = `translateX(${trackX.current}px)`;
      return;
    }

    const fromScreen = trackX.current + localCenter(); // where the cover is now
    const ease = (t) => 1 - Math.pow(1 - t, 3);        // ease-out cubic
    const DURATION = 600;                               // matches cover width transition
    const t0 = performance.now();

    const step = (now) => {
      const f = Math.min(1, (now - t0) / DURATION);
      const screen = fromScreen + (flowCenter - fromScreen) * ease(f);
      trackX.current = screen - localCenter();          // re-reads the live width
      track.style.transform = `translateX(${trackX.current}px)`;
      if (f < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [center]);

  // Position instantly on first paint; animate the slide on every change after.
  useLayoutEffect(() => {
    settle(didInit.current);
    didInit.current = true;
  }, [settle, n]);

  useEffect(() => {
    const onResize = () => settle(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [settle]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Only load/play demo videos once this viewer nears the viewport, keeping the
  // heavy video off the initial page load.
  useEffect(() => {
    const el = flowRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: '200px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { center, go, select, inView, flowRef, trackRef, handleTouchStart, handleTouchEnd };
}
