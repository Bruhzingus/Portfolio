import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { QUOTE } from '../data/quote-data';
import { CONTACT } from '../data/data';

function QuoteHero() {
  const q = QUOTE;
  return (
    <header className="q-hero">
      <div className="q-hero-l">
        <span className="q-hero-issue">{q.issue}</span>
        <div className="mast-rule" />
        <h1 className="q-hero-title">{q.title}</h1>
        <p className="q-hero-lede">{q.lede}</p>
      </div>
      <dl className="q-hero-facts">
        {q.facts.map(([k, v]) => (
          <div className="fact" key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

function QuoteTiers({ selected, onSelect }) {
  const q = QUOTE;
  return (
    <section className="viewer q-tiers-section" id="tiers">
      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">Anchor points · every quote still custom</span>
          <h2 className="viewer-title">Starting from</h2>
        </div>
        <span className="counter q-tiers-counter">Parts at cost &middot; labour billed separately</span>
      </div>

      <div className="q-tiers">
        {q.tiers.map((t) => (
          <button
            key={t.id}
            type="button"
            className={
              'q-tier' +
              (t.featured ? ' is-featured' : '') +
              (selected === t.id ? ' is-selected' : '')
            }
            onClick={() => onSelect(t.id)}
          >
            {t.featured && <span className="q-tier-tag">Most picked</span>}
            <span className="q-tier-name">{t.name}</span>
            <div className="q-tier-price">
              <span className="q-tier-from">Starting from</span>
              <span className="q-tier-amount">{t.from}</span>
              <span className="q-tier-cad">CAD &middot; parts + labour</span>
            </div>
            <p className="q-tier-ideal">{t.ideal}</p>
            <ul className="q-tier-bullets">
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <span className="q-tier-cta">
              {selected === t.id ? 'Selected ✓' : 'Use this tier'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function QuoteConfirmation({ refNum }) {
  return (
    <section className="viewer q-confirm-section" id="confirm">
      <div className="q-confirm">
        <span className="q-confirm-kicker">Quote request received</span>
        <h2 className="q-confirm-title">Thanks, I&rsquo;ve got it.</h2>
        <p className="q-confirm-lede">
          I&rsquo;ll review your brief and come back within <b>1&ndash;2 business days</b> with a
          parts list, a real price, and a build window. If anything is missing, I&rsquo;ll
          email with the questions before I quote.
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

function QuoteIntake({ selectedTier, onSelectTier }) {
  const q = QUOTE;
  const [useCases, setUseCases] = useState([]);
  const [timeline, setTimeline] = useState(q.timelines[0]);
  const [budget, setBudget] = useState(q.budgets[1]);
  const [delivery, setDelivery] = useState(q.delivery[0]);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [refNum, setRefNum] = useState('');

  const toggleUse = (u) =>
    setUseCases((cur) => (cur.includes(u) ? cur.filter((x) => x !== u) : [...cur, u]));

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('tier', selectedTier || '');
    fd.set('useCases', useCases.join(', '));
    fd.set('timeline', timeline);
    fd.set('budget', budget);
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
      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">Step 1 of 1 · a single page, no wizard</span>
          <h2 className="viewer-title">The intake</h2>
        </div>
        <span className="counter">{CONTACT.response}</span>
      </div>

      <form className="q-form" onSubmit={submit} noValidate>
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
            <span>The build</span>
          </legend>

          <div className="field">
            <span className="field-label">Tier (you can change this any time)</span>
            <div className="q-tier-picker">
              {q.tiers.map((t) => (
                <label
                  key={t.id}
                  className={'topic-chip q-tier-chip' + (selectedTier === t.id ? ' is-on' : '')}
                >
                  <input
                    type="radio"
                    name="tier-radio"
                    value={t.id}
                    checked={selectedTier === t.id}
                    onChange={() => onSelectTier(t.id)}
                  />
                  <span>
                    {t.name} <em>{t.from}+</em>
                  </span>
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

          <div className="field">
            <span className="field-label">Delivery</span>
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
            <span className="q-legend-num">03</span>
            <span>Anything else</span>
          </legend>
          <label className="field">
            <span className="field-label">
              The brief: what should this PC do, parts you already own, hard constraints
            </span>
            <textarea
              name="message"
              rows="6"
              required
              placeholder="e.g. Need to run Premiere + Modern Warfare at 1440p high. Already have a 1 TB NVMe and a 27″ 165 Hz monitor. Hard ceiling at $2,000."
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
            {status === 'sending' ? 'Sending…' : 'Send quote request'}
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
      <div className="viewer-head">
        <div className="titles">
          <span className="viewer-kicker">Before you ask</span>
          <h2 className="viewer-title">Common questions</h2>
        </div>
        <span className="counter">{String(q.faq.length).padStart(2, '0')} answered</span>
      </div>

      <div className="q-faq">
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

export default function QuotePage() {
  const [selectedTier, setSelectedTier] = useState(
    QUOTE.tiers.find((t) => t.featured)?.id || 'mid'
  );

  const selectTier = (id) => {
    setSelectedTier(id);
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
        <QuoteTiers selected={selectedTier} onSelect={selectTier} />
        <QuoteIntake selectedTier={selectedTier} onSelectTier={setSelectedTier} />
        <QuoteFAQ />
      </main>
      <div className="wrap">
        <Footer />
      </div>
    </div>
  );
}
