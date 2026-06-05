export default function QuoteCTA() {
  return (
    <aside className="quote-cta" id="quote">
      <div className="quote-cta-band">
        <span className="quote-cta-kicker">Builds &middot; consulting &middot; tech sourcing</span>
        <h3 className="quote-cta-title">
          Need a PC, or help buying one?
          <br />
          <em>Get a quote.</em>
        </h3>
        <p className="quote-cta-lede">
          I build custom PCs, and help you buy smart when a build isn&rsquo;t the answer.
          No upsell, no commissions. If a prebuilt is the better deal, I&rsquo;ll say so.
        </p>
        <div className="quote-cta-meta">
          <span><b>$200</b> flat build fee</span>
          <span className="dotsep" aria-hidden="true">&middot;</span>
          <span>Free pickup or delivery in Lethbridge</span>
          <span className="dotsep" aria-hidden="true">&middot;</span>
          <span>Builds <b>+</b> buying consults</span>
        </div>
      </div>

      <a className="quote-cta-action" href="quote.html">
        <span className="qa-note">
          Builds are finalized only once you&rsquo;re ready to buy. I always pull the
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
