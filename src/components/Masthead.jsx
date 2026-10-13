import { ABOUT } from '../data/data';

export default function Masthead() {
  return (
    <header className="masthead" id="about">
      <div className="mast-copy">
        <h1 className="mast-name">{ABOUT.name}</h1>
        <p className="mast-tagline">{ABOUT.tagline}</p>
        <p className="mast-bio">{ABOUT.bio}</p>
      </div>
      <figure className="mast-portrait">
        <img src={ABOUT.portrait} alt="Randall Brezina" width="820" height="1025" fetchPriority="high" />
        <figcaption>{ABOUT.location}</figcaption>
      </figure>
      <div className="mast-foot">
        <p className="mast-availability">{ABOUT.availability}</p>
        <div className="mast-cta">
          <a href="quote.html" className="btn btn--primary">Request a PC build</a>
          <a href="/Resume.pdf" className="btn btn--ghost" target="_blank" rel="noreferrer">Résumé (PDF)</a>
        </div>
      </div>
    </header>
  );
}
