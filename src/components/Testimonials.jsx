import { TESTIMONIALS } from '../data/data';

function TestimonialCard({ testimonial }) {
  const sentenceEnd = testimonial.quote.search(/[.!?](?:\s|$)/);
  const pull = sentenceEnd === -1
    ? testimonial.quote
    : testimonial.quote.slice(0, sentenceEnd + 1);
  const body = sentenceEnd === -1
    ? ''
    : testimonial.quote.slice(sentenceEnd + 1).trimStart();

  return (
    <article className="quote-card">
      <div className="quote-mark" aria-hidden="true">&ldquo;</div>
      <blockquote className="quote-text">
        <p className="quote-pull">{pull}</p>
        {body && <p className="quote-body">{body}</p>}
      </blockquote>
      <div className="quote-byline">
        <div className="quote-rule" aria-hidden="true" />
        <div className="quote-attrib">
          <span className="quote-name">{testimonial.name}</span>
          <span className="quote-org">{testimonial.org}</span>
        </div>
        <span className="quote-role">{testimonial.role}</span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="viewer testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">Word from clients &amp; colleagues</span>
          <h2 className="viewer-title" id="testimonials-title">Testimonials</h2>
        </div>
      </div>
      <div className="quote-grid">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard testimonial={testimonial} key={testimonial.id} />
        ))}
      </div>
    </section>
  );
}
