import { useEffect, useRef, useState } from 'react';
import { CONTACT } from '../data/data';

export default function Footer() {
  const shell = useRef(null);
  // Bumping this remounts the trace SVG, which restarts its one-lap animation.
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const el = shell.current;
    if (!el) return;
    const run = () => setRunId((n) => n + 1);

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    }
    // The nav "Contact" link dispatches this as it scrolls you down here.
    window.addEventListener('contact-clicked', run);
    return () => {
      if (io) io.disconnect();
      window.removeEventListener('contact-clicked', run);
    };
  }, []);

  return (
    <footer id="contact" ref={shell} className="foot">
      {runId > 0 && (
        <svg className="foot-trace" key={runId} aria-hidden="true">
          <rect
            className="foot-trace-rect"
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="14"
            ry="14"
            pathLength="100"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      <div className="foot-brand">
        <span className="foot-name">Randall Brezina</span>
        <span className="foot-tag">CIT Graduate · Lethbridge Polytechnic · Lethbridge, AB</span>
      </div>
      <div className="foot-links">
        <a href={`mailto:${CONTACT.email}`} aria-label="Email Randall">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/randall-brezina-585506393/"
          target="_blank"
          rel="noreferrer"
          aria-label="Randall on LinkedIn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
