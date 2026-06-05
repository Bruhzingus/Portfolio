import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { QUOTE } from '../data/quote-data';
import { CONTACT } from '../data/data';

function HeroFacts() {
  return (
    <dl className="q-hero-facts">
      {QUOTE.hero.facts.map(([k, v]) => (
        <div className="fact" key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function QuoteHero() {
  const h = QUOTE.hero;
  return (
    <header className="q-hero">
      <div className="q-hero-l">
        <span className="q-hero-kicker">{h.kicker}</span>
        <div className="mast-rule" />
        <h1 className="q-hero-title">{h.title}</h1>
        <p className="q-hero-lede">{h.lede}</p>
        <HeroFacts />
      </div>
      <div className="q-hero-r">
        {h.video ? (
          <div className="q-hero-media">
            <video
              src={h.video}
              poster={h.poster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="q-hero-media-glow" aria-hidden="true" />
          </div>
        ) : (
          <HeroFacts />
        )}
      </div>
    </header>
  );
}

function QuoteServices({ selected, onSelect }) {
  return (
    <section className="viewer q-services-section" id="services">
      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">Three ways I can help</span>
          <h2 className="viewer-title">Pick a service</h2>
        </div>
        <span className="counter q-services-counter">No upsell &middot; no commissions &middot; no brand bias</span>
      </div>

      <div className="q-services" data-reveal-stagger>
        {QUOTE.services.map((s) => (
          <button
            key={s.id}
            type="button"
            className={
              'q-service' +
              (s.featured ? ' is-featured' : '') +
              (selected === s.id ? ' is-selected' : '')
            }
            onClick={() => onSelect(s.id)}
          >
            {s.featured && <span className="q-service-tag">Most popular</span>}
            <span className="q-service-name">{s.name}</span>
            <div className="q-service-price">
              {s.price && <span className="q-service-amount">{s.price}</span>}
              <span className="q-service-label">{s.priceLabel}</span>
            </div>
            <p className="q-service-ideal">{s.ideal}</p>
            <p className="q-service-blurb">{s.blurb}</p>
            <ul className="q-service-points">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <span className="q-service-cta">
              {selected === s.id ? 'Selected ✓' : 'Request this'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function QuotePrebuilt() {
  const p = QUOTE.prebuilt;
  return (
    <section className="viewer q-prebuilt-section" id="why-custom">
      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">{p.kicker}</span>
          <h2 className="viewer-title">{p.title}</h2>
        </div>
      </div>
      <div className="q-prebuilt" data-reveal>
        <div className="q-prebuilt-l">
          <p className="q-prebuilt-lede">{p.lede}</p>
          <p className="q-prebuilt-note">{p.note}</p>
        </div>
        <dl className="q-issues">
          {p.issues.map(([k, v]) => (
            <div className="q-issue" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function QuoteConfirmation({ refNum }) {
  return (
    <section className="viewer q-confirm-section" id="confirm">
      <div className="q-confirm">
        <span className="q-confirm-kicker">Request received</span>
        <h2 className="q-confirm-title">Thanks, I&rsquo;ve got it.</h2>
        <p className="q-confirm-lede">
          I&rsquo;ll review what you sent and reply within <b>24 to 48 hours</b> with options or a
          parts list, a real price, and next steps. If anything is missing, I&rsquo;ll email with the
          questions first.
        </p>
        <dl className="q-confirm-meta">
          <div>
            <dt>Reference</dt>
            <dd className="q-ref">{refNum}</dd>
          </div>
          <div>
            <dt>Reply to</dt>
            <dd>The email you sent it from</dd>
          </div>
          <div>
            <dt>Need to add something?</dt>
            <dd>
              <a href={'mailto:' + CONTACT.email + '?subject=Re: ' + refNum}>
                Email me, quoting this reference
              </a>
            </dd>
          </div>
        </dl>
        <div className="q-confirm-actions">
          <a href="index.html" className="btn btn--primary">Back to portfolio</a>
          <a href="index.html#builds" className="btn btn--ghost">See more builds</a>
        </div>
      </div>
    </section>
  );
}

function QuoteIntake({ selectedService, onSelectService }) {
  const q = QUOTE;
  const [useCases, setUseCases] = useState([]);
  const [budget, setBudget] = useState(q.budgets[0]);
  const [timeline, setTimeline] = useState(q.timelines[0]);
  const [partsOption, setPartsOption] = useState(q.partsOptions[0]);
  const [delivery, setDelivery] = useState(q.delivery[0]);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [refNum, setRefNum] = useState('');

  const toggleUse = (u) =>
    setUseCases((cur) => (cur.includes(u) ? cur.filter((x) => x !== u) : [...cur, u]));

  const serviceName = q.services.find((s) => s.id === selectedService)?.name || '';

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('service', serviceName);
    fd.set('useCases', useCases.join(', '));
    fd.set('budget', budget);
    fd.set('timeline', timeline);
    fd.set('partsOption', partsOption);
    fd.set('delivery', delivery);

    const ref =
      'QT-' +
      new Date().getFullYear().toString().slice(-2) +
      '-' +
      Math.random().toString(36).slice(2, 6).toUpperCase();
    fd.set('reference', ref);

    const endpoint = q.formspreeEndpoint;
    const unconfigured = !endpoint || endpoint.includes('YOUR_QUOTE_FORM_ID');
    if (unconfigured) {
      setRefNum(ref);
      setStatus('ok');
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setRefNum(ref);
        setStatus('ok');
      } else {
        const d = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(
          (d.errors && d.errors.map((x) => x.message).join(', ')) ||
            'Something went wrong. Please email me directly.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please email me directly.');
    }
  };

  if (status === 'ok') return <QuoteConfirmation refNum={refNum} />;

  return (
    <section className="viewer q-intake-section" id="intake">
      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">Tell me what you need</span>
          <h2 className="viewer-title">Request a quote</h2>
        </div>
        <span className="counter">{CONTACT.response}</span>
      </div>

      <form className="q-form" data-reveal onSubmit={submit} noValidate>
        <fieldset className="q-fieldset">
          <legend>
            <span className="q-legend-num">01</span>
            <span>About you</span>
          </legend>
          <div className="field-row">
            <label className="field">
              <span className="field-label">Name</span>
              <input type="text" name="name" required autoComplete="name" placeholder="Your name" />
            </label>
            <label className="field">
              <span className="field-label">Email</span>
              <input type="email" name="email" required autoComplete="email" placeholder="you@domain.com" />
            </label>
          </div>
          <label className="field">
            <span className="field-label">Where are you based?</span>
            <input type="text" name="location" placeholder="City, province / country" />
          </label>
        </fieldset>

        <fieldset className="q-fieldset">
          <legend>
            <span className="q-legend-num">02</span>
            <span>What you need</span>
          </legend>

          <div className="field">
            <span className="field-label">Service</span>
            <div className="topic-row">
              {q.services.map((s) => (
                <label
                  key={s.id}
                  className={'topic-chip' + (selectedService === s.id ? ' is-on' : '')}
                >
                  <input
                    type="radio"
                    name="service-radio"
                    value={s.id}
                    checked={selectedService === s.id}
                    onChange={() => onSelectService(s.id)}
                  />
                  <span>{s.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="field-label">Primary use (pick all that apply)</span>
            <div className="topic-row">
              {q.useCases.map((u) => (
                <label key={u} className={'topic-chip' + (useCases.includes(u) ? ' is-on' : '')}>
                  <input type="checkbox" checked={useCases.includes(u)} onChange={() => toggleUse(u)} />
                  <span>{u}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <span className="field-label">Budget (CAD)</span>
              <div className="topic-row">
                {q.budgets.map((b) => (
                  <label key={b} className={'topic-chip' + (budget === b ? ' is-on' : '')}>
                    <input type="radio" name="budget-radio" value={b} checked={budget === b} onChange={() => setBudget(b)} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="field-label">Timeline</span>
              <div className="topic-row">
                {q.timelines.map((t) => (
                  <label key={t} className={'topic-chip' + (timeline === t ? ' is-on' : '')}>
                    <input type="radio" name="timeline-radio" value={t} checked={timeline === t} onChange={() => setTimeline(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="q-fieldset">
          <legend>
            <span className="q-legend-num">03</span>
            <span>Parts &amp; delivery</span>
          </legend>
          <div className="field">
            <span className="field-label">Who buys the parts?</span>
            <div className="topic-row">
              {q.partsOptions.map((o) => (
                <label key={o} className={'topic-chip' + (partsOption === o ? ' is-on' : '')}>
                  <input type="radio" name="parts-radio" value={o} checked={partsOption === o} onChange={() => setPartsOption(o)} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="field">
            <span className="field-label">Pickup or delivery</span>
            <div className="topic-row">
              {q.delivery.map((d) => (
                <label key={d} className={'topic-chip' + (delivery === d ? ' is-on' : '')}>
                  <input type="radio" name="delivery-radio" value={d} checked={delivery === d} onChange={() => setDelivery(d)} />
                  <span>{d}</span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="q-fieldset">
          <legend>
            <span className="q-legend-num">04</span>
            <span>The brief</span>
          </legend>
          <label className="field">
            <span className="field-label">
              What should it do, parts you already own, hard constraints, or what you&rsquo;re trying to buy
            </span>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="e.g. Want to run 1440p high refresh for gaming + a bit of editing. Already have a 1 TB NVMe and a 165 Hz monitor. Hard ceiling around $1,800. Or: comparing two prebuilt laptops, want a second opinion."
            />
          </label>
        </fieldset>

        <input
          type="text"
          name="_gotcha"
          tabIndex="-1"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />

        <div className="form-foot">
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send request'}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <path d="M7 17L17 7" /><path d="M8 7h9v9" />
            </svg>
          </button>
          <span className={'form-status form-status--' + status} role="status" aria-live="polite">
            {status === 'error' && errorMsg}
            {status === 'idle' && 'Powered by Formspree · your details stay private.'}
            {status === 'sending' && 'Sending your request…'}
          </span>
        </div>
      </form>
    </section>
  );
}

function QuoteFAQ() {
  const q = QUOTE;
  return (
    <section className="viewer q-faq-section" id="faq">
      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">Before you ask</span>
          <h2 className="viewer-title">Common questions</h2>
        </div>
        <span className="counter">{String(q.faq.length).padStart(2, '0')} answered</span>
      </div>

      <div className="q-faq" data-reveal-stagger>
        {q.faq.map((item, i) => (
          <details key={item.q} className="q-faq-item">
            <summary>
              <span className="q-faq-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="q-faq-q">{item.q}</span>
              <span className="q-faq-chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="q-faq-a">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function QuoteTerms() {
  const q = QUOTE;
  return (
    <section className="viewer q-terms-section" id="terms">
      <div className="viewer-head" data-reveal>
        <div className="titles">
          <span className="viewer-kicker">The fine print</span>
          <h2 className="viewer-title">Terms &amp; conditions</h2>
        </div>
        <span className="counter q-terms-updated">Updated {q.termsUpdated}</span>
      </div>
      <p className="q-terms-intro" data-reveal>{q.termsIntro}</p>

      <div className="q-faq q-terms" data-reveal-stagger>
        {q.terms.map((t, i) => (
          <details key={t.title} className="q-faq-item">
            <summary>
              <span className="q-faq-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="q-faq-q">{t.title}</span>
              <span className="q-faq-chev" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <div className="q-terms-body">
              {t.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
              {t.bullets && (
                <ul>
                  {t.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {t.after && t.after.map((para) => <p key={para}>{para}</p>)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function QuotePage() {
  useScrollReveal();
  const [selectedService, setSelectedService] = useState(
    QUOTE.services.find((s) => s.featured)?.id || QUOTE.services[0].id
  );

  const selectService = (id) => {
    setSelectedService(id);
    const el = document.getElementById('intake');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="kit-root quote-root">
      <Navbar base="index.html" />
      <main className="wrap">
        <QuoteHero />
        <QuoteServices selected={selectedService} onSelect={selectService} />
        <QuotePrebuilt />
        <QuoteIntake selectedService={selectedService} onSelectService={setSelectedService} />
        <QuoteFAQ />
        <QuoteTerms />
      </main>
      <div className="wrap">
        <Footer />
      </div>
    </div>
  );
}
