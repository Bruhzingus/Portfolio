import { useEffect, useRef } from 'react';
import { CONTACT } from '../data/data';

export default function Footer() {
  const shell = useRef(null);

  useEffect(() => {
    const element = shell.current;
    if (!element) return;

    // Handle click event on contact button
    const handleContactClick = () => {
      element.classList.add('footer-highlight');
    };

    // Handle scroll into view
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add('footer-highlight');
            observer.unobserve(element);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(element);

      // Listen for contact button clicks
      window.addEventListener('contact-clicked', handleContactClick);

      return () => {
        observer.disconnect();
        window.removeEventListener('contact-clicked', handleContactClick);
      };
    }
  }, []);

  return (
    <footer id="contact" ref={shell} className="foot">
      <div className="foot-brand">
        <span className="foot-name">Randall Brezina</span>
        <span className="foot-tag">CIT Graduate · Lethbridge Polytechnic · Lethbridge, AB</span>
      </div>
      <div className="foot-links">
        <a href={`mailto:${CONTACT.email}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-10 6L2 7" />
          </svg>
          Email
        </a>
        <a href="https://www.linkedin.com/in/randall-brezina-585506393/" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
