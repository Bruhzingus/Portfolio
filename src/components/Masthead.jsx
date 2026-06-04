import { ABOUT } from '../data/data';

export default function Masthead() {
  const a = ABOUT;
  return (
    <header className="masthead" id="about">

      {/* Top text: intro copy only */}
      <div className="mast-l">
        <h1 className="mast-name">{a.name}</h1>
        <p className="mast-role"><b>{a.role}</b> &middot; {a.focus}</p>
        <p className="mast-bio">{a.bio}</p>
      </div>

      {/* Portrait on desktop: right column spanning both rows.
          On mobile: appears right after the bio paragraph. */}
      <div className="mast-portrait">
        <div className="frame">
          <img src={a.portrait} alt={a.name} fetchPriority="high" />
          <div className="scrim" />
          <span className="cap">{a.location}</span>
        </div>
      </div>

      {/* Bottom text: availability tag + CTA */}
      <div className="mast-l-foot">
        <div className="mast-status">
          <span className="dot" aria-hidden="true" />
          Open to work
        </div>
        <div className="mast-cta">
          <a href="#builds" className="btn btn--primary">Flip through builds</a>
          <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="btn btn--ghost btn--resume">
            Résumé
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
            </svg>
          </a>
        </div>
      </div>

    </header>
  );
}
