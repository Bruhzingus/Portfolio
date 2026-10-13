import { useEffect, useRef, useState } from 'react';
import drawSectionAttention from './sectionAttention';

export default function Navbar({ base = '' }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const h = (hash) => `${base}${hash}`;
  const close = () => setOpen(false);
  const links = [
    ['#about', 'About'],
    ['#builds', 'PC builds'],
    ['#software', 'Software'],
    ['#testimonials', 'Testimonials'],
    ['#contact', 'Contact'],
  ];

  // Cross-page anchors become available after React mounts the destination.
  useEffect(() => {
    if (!window.location.hash) return;
    let targetId;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(targetId);
      if (!section) return;
      section.scrollIntoView({ block: 'start', behavior: 'auto' });
      drawSectionAttention(section);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const activateLink = (event) => {
    close();
    if (event.defaultPrevented || event.button > 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(event.currentTarget.href);
    if (destination.pathname !== window.location.pathname || destination.search !== window.location.search) return;
    const section = document.getElementById(destination.hash.slice(1));
    if (section) requestAnimationFrame(() => drawSectionAttention(section));
  };

  useEffect(() => {
    if (!open) return;
    const escape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);

  const renderLinks = () => (
    <>
      {links.map(([hash, label]) => (
        <a key={hash} href={h(hash)} onClick={activateLink}>{label}</a>
      ))}
      <a href="quote.html#quote-overview" className="nav-cta" aria-current={base ? 'page' : undefined} onClick={activateLink}>
        Get a quote
      </a>
    </>
  );

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-inner">
        <a className="logo" href={h('#about')} onClick={activateLink}>
          <img src="/RB.png" alt="" width="28" height="28" />
          <span>Randall Brezina</span>
        </a>
        <div className="nav-links">{renderLinks()}</div>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <div id="mobile-navigation" className="nav-drawer" hidden={!open}>
        {renderLinks()}
      </div>
    </nav>
  );
}
