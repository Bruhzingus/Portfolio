import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Tracks the user's reduced-motion preference and updates if they change it
 * mid-session. Used to keep auto-playing video paused for people who opt out
 * (WCAG 2.2.2), and starts from the correct value during SSR/first paint.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof matchMedia !== 'undefined' ? matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    if (typeof matchMedia === 'undefined') return;
    const mql = matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
