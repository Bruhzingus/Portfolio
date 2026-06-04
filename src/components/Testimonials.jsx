import { TESTIMONIALS } from '../data/data';

function TestimonialCard({ t, idx, total }) {
  return (
    <article className="quote-card">
      <div className="quote-mark" aria-hidden="true">&ldquo;</div>
      <div className="quote-num">
        {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
      <p className="quote-pull">{t.pull}</p>
      <p className="quote-body">{t.quote}</p>
      <div className="quote-byline">
        <div className="quote-rule" />
        <div className="quote-attrib">
          <span className="quote-name">{t.name}</span>
          <span className="quote-org">{t.org}</span>
        </div>
        <span className="quote-role">{t.role}</span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const items = TESTIMONIALS;
  return (
    <section className="viewer testimonials" id="testimonials">
      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">Word from clients &amp; colleagues</span>
          <h2 className="viewer-title">Testimonials</h2>
        </div>
        <span className="counter testimonial-counter">
          <b>{String(items.length).padStart(2, '0')}</b> on record
        </span>
      </div>
      <div className="quote-grid">
        {items.map((t, i) => (
          <TestimonialCard key={t.id} t={t} idx={i} total={items.length} />
        ))}
      </div>
    </section>
  );
}
