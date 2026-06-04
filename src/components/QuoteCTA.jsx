export default function QuoteCTA() {
  return (
    <aside className="quote-cta" id="quote">
      <div className="quote-cta-band">
        <span className="quote-cta-kicker">Custom PC &middot; from your brief</span>
        <h3 className="quote-cta-title">
          Want one like these?
          <br />
          <em>Get a quote.</em>
        </h3>
        <p className="quote-cta-lede">
          Tell me what you want to do with it and what you have to spend. I&rsquo;ll
          come back with a parts list, a real price, and a build window. No upsell.
        </p>
        <div className="quote-cta-meta">
          <span><b>10&ndash;14 days</b> typical turnaround</span>
          <span className="dotsep" aria-hidden="true">&middot;</span>
          <span>Free pickup or delivery in Lethbridge</span>
          <span className="dotsep" aria-hidden="true">&middot;</span>
          <span>Parts quoted <b>at cost</b></span>
        </div>
      </div>

      <a className="quote-cta-action" href="quote.html">
        <span className="qa-note">
          Builds are finalized only once you&rsquo;re ready to buy &mdash; I always pull the
          most up-to-date, best-value pricing at that point.
        </span>
        <span className="qa-btn">
          Start a quote
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M7 17L17 7" /><path d="M8 7h9v9" />
          </svg>
        </span>
      </a>
    </aside>
  );
}
