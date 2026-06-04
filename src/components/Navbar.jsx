import { useState } from 'react';

// base = "" on portfolio, "index.html" on quote page
export default function Navbar({ base = '' }) {
  const [open, setOpen] = useState(false);
  const onPortfolio = base === '';

  // On portfolio: smooth-scroll to top. On quote page: let normal link navigate.
  const scrollTop = (e) => {
    if (!onPortfolio) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(false);
  };

  const close = () => setOpen(false);

  // Prefix hash links with base so they work from any page
  const h = (hash) => `${base}${hash}`;

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href={h('#about')} onClick={scrollTop} aria-label="Randall Brezina — home">
          <img src="/RB.png" alt="Randall Brezina" width="34" height="34" />
        </a>

        <div className="nav-links">
          <a href={h('#about')} onClick={onPortfolio ? scrollTop : close}>About</a>
          <a href={h('#builds')} onClick={close}>Builds</a>
          <a href={h('#software')} onClick={close}>Software</a>
          <a href={h('#testimonials')} onClick={close}>Testimonials</a>
          <span className="nav-sep" aria-hidden="true" />
          <a href="quote.html" className="nav-cta">
            Get a quote
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
              <path d="M7 17L17 7" /><path d="M8 7h9v9" />
            </svg>
          </a>
        </div>

        <div className="nav-right">
          <div className="status">
            <span className="live" />
            Lethbridge&nbsp;AB
          </div>
          <button
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nav-drawer${open ? ' open' : ''}`}>
        <a href={h('#about')} onClick={onPortfolio ? scrollTop : close}>About</a>
        <a href={h('#builds')} onClick={close}>Builds</a>
        <a href={h('#software')} onClick={close}>Software</a>
        <a href={h('#testimonials')} onClick={close}>Testimonials</a>
        <a href="quote.html" onClick={close}>Get a quote</a>
      </div>
    </nav>
  );
}
