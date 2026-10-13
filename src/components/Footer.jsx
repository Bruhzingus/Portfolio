import { CONTACT } from '../data/data';

export default function Footer() {
  return (
    <footer id="contact" className="foot" aria-labelledby="contact-title">
      <div className="foot-contact">
        <h2 id="contact-title">Contact</h2>
        <p>For PC builds or contract work, send me a brief description of what you need.</p>
        <a className="contact-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </div>
      <div className="foot-bottom">
        <p>Randall Brezina · Lethbridge, Alberta</p>
        <div className="foot-links">
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/Resume.pdf" target="_blank" rel="noreferrer">Résumé <span className="file-note">(PDF)</span></a>
        </div>
      </div>
    </footer>
  );
}
