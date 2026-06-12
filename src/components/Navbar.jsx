import { useState } from 'react';
import { ArrowUpRight } from './icons';

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

  // About: on the portfolio, smooth-scroll up and pulse the Résumé button trace.
  // On the quote page, let the link navigate to index.html#about (the fresh load
  // pulses the trace on its own).
  const activateAbout = (e) => {
    close();
    if (onPortfolio) {
      scrollTop(e);
      window.dispatchEvent(new CustomEvent('about-activated'));
    }
  };

  // Prefix hash links with base so they work from any page
  const h = (hash) => `${base}${hash}`;

  // Single source for the section links, rendered into both the desktop bar and
  // the mobile drawer.
  const links = [
    { hash: '#about', label: 'About', onClick: activateAbout },
    { hash: '#builds', label: 'PC Builds', onClick: close },
    { hash: '#software', label: 'Software', onClick: close },
    { hash: '#testimonials', label: 'Testimonials', onClick: close },
    { hash: '#contact', label: 'Contact', onClick: close},
  ];

  const renderLink = ({ hash, label, onClick, className }) => (
    <a key={hash} href={h(hash)} className={className} onClick={onClick}>
      {label}
    </a>
  );

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="logo" href={h('#about')} onClick={scrollTop} aria-label="Randall Brezina, home">
          <img src="/RB.png" alt="Randall Brezina" width="34" height="34" />
        </a>

        <div className="nav-links">
          {links.map(renderLink)}
          <a href="/Resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          <span className="nav-sep" aria-hidden="true" />
          <a href="quote.html" className="nav-cta">
            Get a quote
            <ArrowUpRight size={12} />
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

      <div className={`nav-drawer${open ? ' open' : ''}`} inert={!open}>
        {links.map(renderLink)}
        <a href="/Resume.pdf" target="_blank" rel="noreferrer" onClick={close}>Résumé</a>
        <a href="quote.html" onClick={close}>Get a quote</a>
      </div>
    </nav>
  );
}
