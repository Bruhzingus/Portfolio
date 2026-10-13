import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown } from '../components/icons';
import { QUOTE } from '../data/quote-data';
import { CONTACT } from '../data/data';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function makeQuoteRef() {
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `QT-${year}-${random}`;
}

async function postQuote(endpoint, formData) {
  const response = await fetch(endpoint, {
    method: 'POST', body: formData, headers: { Accept: 'application/json' },
  });
  if (response.ok) return { ok: true };
  const data = await response.json().catch(() => ({}));
  return {
    ok: false,
    errorMsg: data.errors?.map((error) => error.message).join(', ') ||
      'Your request could not be sent. Please try again or email me.',
  };
}

function ChoiceGroup({ title, options, value, onChange, name, multi = false, getKey = (option) => option, getLabel = (option) => option }) {
  return (
    <fieldset className="q-choice-group">
      <legend>{title}</legend>
      <div className="q-choices">
        {options.map((option) => {
          const key = getKey(option);
          return (
            <label key={key} className="q-choice">
              <input type={multi ? 'checkbox' : 'radio'} name={name} value={key}
                checked={multi ? value.includes(key) : value === key} onChange={() => onChange(key)} />
              <span>{getLabel(option)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function AccordionItem({ title, children }) {
  return (
    <details className="q-faq-item">
      <summary><span>{title}</span><ChevronDown size={18} aria-hidden="true" /></summary>
      <div className="q-answer">{children}</div>
    </details>
  );
}

function QuoteHeroVideo({ src, poster }) {
  const videoRef = useRef(null);
  const programmaticPause = useRef(false);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [playback, setPlayback] = useState('auto');
  const reduced = usePrefersReducedMotion();
  const mayAutoplay = inView && pageVisible && !reduced && playback === 'auto';

  useEffect(() => {
    const video = videoRef.current;
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.01 }
    );
    if (video) observer?.observe(video);
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const shouldPlay = inView && pageVisible &&
      (playback === 'manual' || (!reduced && playback === 'auto'));
    if (shouldPlay) video.play().catch(() => {});
    else if (!video.paused) {
      programmaticPause.current = true;
      video.pause();
    }
  }, [inView, pageVisible, playback, reduced]);

  const handlePlay = () => {
    setPlayback((current) => current === 'paused' || reduced ? 'manual' : current);
  };
  const handlePause = () => {
    if (!programmaticPause.current && inView && pageVisible) setPlayback('paused');
    programmaticPause.current = false;
  };

  return <video ref={videoRef} className="q-hero-video" src={src} poster={poster}
    autoPlay={mayAutoplay} muted loop controls playsInline preload="metadata"
    onPlay={handlePlay} onPause={handlePause} aria-label="Custom PC build video" />;
}

function QuoteHero() {
  const hero = QUOTE.hero;
  return (
    <header className="q-hero" id="quote-overview">
      <div>
        <h1 className="mast-name">{hero.title}</h1>
        <p className="q-hero-lede">{hero.lede}</p>
        <dl className="q-hero-facts">
          {hero.facts.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>
      {hero.video && <QuoteHeroVideo src={hero.video} poster={hero.poster} />}
    </header>
  );
}

function QuoteServices({ selected, onSelect }) {
  return (
    <section className="q-section" id="services" aria-labelledby="services-title">
      <div className="q-section-head">
        <h2 id="services-title">PC services</h2>
        <p>Prices are in CAD. Parts and Windows licenses are separate.</p>
      </div>
      <div className="q-services">
        {QUOTE.services.map((service) => (
          <article key={service.id} className="q-service">
            <div className="q-service-description">
              <h3>{service.name}</h3>
              <p>{service.blurb}</p>
              <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
            <div className="q-service-booking">
              <p className="q-service-price">{service.price}</p>
              <p>{service.priceLabel}</p>
              <button type="button" className="btn btn--ghost" aria-pressed={selected === service.id}
                onClick={() => onSelect(service.id)}>
                {selected === service.id ? 'Selected service' : 'Choose this service'}
              </button>
            </div>
          </article>
        ))}
      </div>
      <aside className="q-contract" aria-labelledby="contract-title">
        <h3 id="contract-title">Contract work</h3>
        <p>I’m also available for contract work. <a href={`mailto:${CONTACT.email}?subject=Contract%20work`}>Email me</a> with the project, scope, and timeline so we can discuss it.</p>
      </aside>
    </section>
  );
}

function QuoteConfirmation({ refNum, email }) {
  const heading = useRef(null);
  useEffect(() => { heading.current?.focus(); }, []);
  return (
    <section className="q-section q-confirm" id="intake">
      <h2 ref={heading} tabIndex={-1}>Your request was sent.</h2>
      <p>I’ll review it and reply to {email}. Keep the reference below if you need to add anything.</p>
      <p><strong>Reference:</strong> {refNum}</p>
      <p><a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Quote ${refNum}`)}`}>Email me about this request</a></p>
      <div className="q-confirm-actions">
        <a href="index.html" className="btn btn--primary">Back to portfolio</a>
        <a href="index.html#builds" className="btn btn--ghost">See PC builds</a>
      </div>
    </section>
  );
}

function QuoteIntake({ selectedService, onSelectService }) {
  const [useCases, setUseCases] = useState([]);
  const [budget, setBudget] = useState('Not sure yet');
  const [timeline, setTimeline] = useState('Just exploring');
  const [partsOption, setPartsOption] = useState(QUOTE.partsOptions[0]);
  const [delivery, setDelivery] = useState(QUOTE.delivery[0]);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [refNum, setRefNum] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [emailHref, setEmailHref] = useState(`mailto:${CONTACT.email}`);
  const toggleUse = (useCase) => setUseCases((current) =>
    current.includes(useCase) ? current.filter((item) => item !== useCase) : [...current, useCase]
  );

  const submit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;
    const formData = new FormData(event.currentTarget);
    const service = QUOTE.services.find((item) => item.id === selectedService)?.name || '';
    const reference = makeQuoteRef();
    formData.set('service', service);
    formData.set('useCases', useCases.join(', '));
    formData.set('budget', budget);
    formData.set('timeline', timeline);
    formData.set('partsOption', partsOption);
    formData.set('delivery', delivery);
    formData.set('reference', reference);
    const emailBody = [
      `Name: ${formData.get('name')}`, `Email: ${formData.get('email')}`,
      `Location: ${formData.get('location') || ''}`, `Service: ${service}`,
      `Use: ${useCases.join(', ')}`, `Budget: ${budget}`, `Timeline: ${timeline}`,
      `Parts: ${partsOption}`, `Delivery: ${delivery}`, '', String(formData.get('message') || ''),
    ].join('\n');
    setEmailHref(`mailto:${CONTACT.email}?subject=PC%20service%20request&body=${encodeURIComponent(emailBody)}`);
    setErrorMsg('');
    const endpoint = QUOTE.formspreeEndpoint;
    if (!endpoint || endpoint.includes('YOUR_QUOTE_FORM_ID')) {
      setStatus('error');
      setErrorMsg('The request form is unavailable. Your request has not been sent. Please email me instead.');
      return;
    }
    setStatus('sending');
    try {
      const result = await postQuote(endpoint, formData);
      if (result.ok) {
        setRefNum(reference);
        setReplyEmail(String(formData.get('email')));
        setStatus('ok');
      } else {
        setStatus('error');
        setErrorMsg(result.errorMsg);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Your request could not be sent. Check your connection, try again, or email me.');
    }
  };

  if (status === 'ok') return <QuoteConfirmation refNum={refNum} email={replyEmail} />;
  return (
    <section className="q-section" id="intake" aria-labelledby="intake-title">
      <div className="q-section-head">
        <h2 id="intake-title">Request a PC quote</h2>
        <p>Tell me what you need and your budget. I’ll reply by email.</p>
      </div>
      <form className="q-form" onSubmit={submit} aria-busy={status === 'sending'}>
        <fieldset className="q-fieldset" disabled={status === 'sending'}>
          <legend>Your details</legend>
          <div className="q-field-row">
            <label className="q-field"><span>Name (required)</span><input type="text" name="name" required autoComplete="name" /></label>
            <label className="q-field"><span>Email (required)</span><input type="email" name="email" required autoComplete="email" /></label>
          </div>
          <label className="q-field"><span>City or area</span><input type="text" name="location" autoComplete="address-level2" /></label>
        </fieldset>
        <fieldset className="q-fieldset" disabled={status === 'sending'}>
          <legend>The PC</legend>
          <ChoiceGroup title="Service" options={QUOTE.services} value={selectedService} onChange={onSelectService}
            name="serviceChoice" getKey={(service) => service.id} getLabel={(service) => service.name} />
          <ChoiceGroup title="What will you use it for? Choose any that apply." options={QUOTE.useCases}
            value={useCases} onChange={toggleUse} name="useCaseChoice" multi />
          <div className="q-field-row">
            <label className="q-field"><span>Budget (CAD)</span>
              <select name="budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
                {QUOTE.budgets.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="q-field"><span>Timeline</span>
              <select name="timeline" value={timeline} onChange={(event) => setTimeline(event.target.value)}>
                {QUOTE.timelines.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          </div>
          <ChoiceGroup title="Who buys the parts?" options={QUOTE.partsOptions} value={partsOption} onChange={setPartsOption} name="partsChoice" />
          <ChoiceGroup title="Pickup or delivery" options={QUOTE.delivery} value={delivery} onChange={setDelivery} name="deliveryChoice" />
          <label className="q-field">
            <span>What do you need? (required)</span>
            <span className="q-field-help">Include any parts you own, games or software you use, and preferences for size or appearance.</span>
            <textarea name="message" rows="6" required />
          </label>
        </fieldset>
        <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" className="q-honeypot" />
        <p className="q-form-terms">Please read the <a href="#terms">terms and conditions</a> before sending your request.</p>
        <div className="q-form-foot">
          <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send request'}</button>
          <p role="status" aria-live="polite" className="q-form-status">
            {status === 'sending' && 'Sending your request…'}
            {status === 'error' && <>{errorMsg} <a href={emailHref}>Email your request</a></>}
          </p>
        </div>
      </form>
    </section>
  );
}

function QuoteFAQ() {
  return (
    <section className="q-section" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Questions about PC services</h2>
      <div className="q-faq">
        {QUOTE.faq.map((item) => <AccordionItem key={item.q} title={item.q}><p>{item.a}</p></AccordionItem>)}
      </div>
    </section>
  );
}

function QuoteTerms() {
  return (
    <section className="q-section" id="terms" aria-labelledby="terms-title">
      <div className="q-section-head"><h2 id="terms-title">Terms &amp; conditions</h2><p>Updated {QUOTE.termsUpdated}</p></div>
      <p className="q-terms-intro">{QUOTE.termsIntro}</p>
      <div className="q-faq">
        {QUOTE.terms.map((term) => (
          <AccordionItem key={term.title} title={term.title}>
            {term.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {term.bullets && <ul>{term.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            {term.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}

export default function QuotePage() {
  const [selectedService, setSelectedService] = useState(QUOTE.services[0].id);
  const selectService = (serviceId) => {
    setSelectedService(serviceId);
    document.getElementById('intake')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start',
    });
  };
  return (
    <div className="kit-root quote-root">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar base="index.html" />
      <main className="wrap" id="main-content">
        <QuoteHero /><QuoteServices selected={selectedService} onSelect={selectService} />
        <QuoteIntake selectedService={selectedService} onSelectService={setSelectedService} /><QuoteFAQ /><QuoteTerms />
      </main>
      <div className="wrap"><Footer /></div>
    </div>
  );
}
