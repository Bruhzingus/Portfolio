import quoteVideo from '../assets/QuoteVideo.mp4';
import quotePoster from '../assets/quote-poster.webp';

// ============================================================
//  PRICING: fill these in and the figures appear on the page.
//  Leave a value as null to show only the pricing model
//  (e.g. "Flat build fee") with no dollar amount.
// ============================================================
const BUILD_FEE   = '$200';     // custom build flat fee (build + Windows install)
const CONSULT_FEE = '$25';      // consulting / sourcing flat rate per request
const ONSITE_RATE = '$40/hr';   // on-site + extra-labour hourly rate
const PARTS_FEE   = '3%';       // added to the parts total when "I buy the parts"

export const QUOTE = {
  formspreeEndpoint: 'https://formspree.io/f/xojzqngv',

  hero: {
    kicker: 'PC building · consulting · tech sourcing',
    title: 'Get the best setup for your budget.',
    lede:
      "I build custom PCs, and when a build isn't the answer I help you buy smart. No upselling, no commissions, no brand bias. If a prebuilt is the better deal, I'll tell you.",
    video: quoteVideo,
    poster: quotePoster,
    facts: [
      ['Based in', 'Lethbridge, AB'],
      ['Build time', '2 to 5 days once parts arrive'],
      ['Delivery', 'Free pickup + free local delivery'],
      ['Reply time', 'Within 24 to 48 hours'],
    ],
  },

  services: [
    {
      id: 'custom',
      name: 'Custom PC Build',
      price: BUILD_FEE,
      priceLabel: 'Flat fee, Windows installed',
      ideal: 'Gaming, school, or professional work',
      blurb:
        'I handle everything from part selection to assembly and setup. Every build is designed around your exact needs, not a generic parts list.',
      points: [
        'Full assembly, cable management, and Windows install',
        'Tuned for performance, reliability, and long-term value',
        'Optional performance tune, +$20: BIOS and Windows optimized',
      ],
      featured: true,
    },
    {
      id: 'onsite',
      name: 'Premium On-Site Build',
      price: ONSITE_RATE,
      priceLabel: '3 hr minimum, +$40 travel',
      ideal: 'A fully hands-off experience',
      blurb:
        "Everything done at your home: full assembly, setup, and getting it running in your space. It costs more for travel and time, but you don't lift a finger.",
      points: [
        'Built and set up at your location',
        '3-hour minimum at $40/hr, plus a $40 travel fee',
        "Ideal if you'd rather not handle any of it",
      ],
    },
    {
      id: 'consult',
      name: 'Buying & Consulting',
      price: CONSULT_FEE,
      priceLabel: 'Flat rate per request',
      ideal: 'Prebuilts, laptops, monitors, full setups',
      blurb:
        "Don't need a custom build? I check current deals and compare systems to find what is actually worth buying, and filter out the ones that cut corners.",
      points: [
        'Options matched to your budget and use case',
        'Direct purchase links from reputable retailers',
        'Clear reasons each option is good, and what to avoid',
      ],
    },
  ],

  prebuilt: {
    kicker: 'What prebuilts quietly cut',
    title: 'Why custom',
    lede:
      'A recent high-performance build (Ryzen 5 7600X3D + RX 9070 XT) came in around $2,200. Comparable prebuilts often retail closer to $2,600 or more, and even on sale they tend to cut corners to hit that price.',
    issues: [
      ['Single-channel RAM', 'Shipped instead of dual-channel, leaving real performance on the table.'],
      ['Lower-quality power supplies', 'The one part you least want a manufacturer to gamble on.'],
      ['Weak cooling setups', 'Higher temperatures, more throttling, and a shorter lifespan.'],
      ['Limited upgrade paths', 'Locked-in boards and cases that dead-end fast.'],
    ],
    note:
      'Those small compromises affect performance and long-term reliability more than most people realize. With consulting I save clients $100 to $500 or more by catching them before you buy.',
  },

  competitor: {
    kicker: 'The one real competitor',
    title: 'How I compare to Memory Express',
    lede:
      "Memory Express is really the only other shop around here that does custom builds, and to be fair they do good work. The catch is that they build only with parts you buy from them. That single rule shapes the whole build before you've picked anything.",
    note:
      "I'm not tied to any one store. I watch every retailer, grab the sale wherever it lands, and choose parts on what they actually are, not on what one shop has on the shelf. That usually means a lower total and a build that matches what you came in wanting.",
    issues: [
      ['Parts must come from them', 'You can only use what one store stocks, so the prices and deals on every other site are off the table.'],
      ['A smaller pool to pull from', "They're estimated to hold roughly 10 to 20% of the market, so their inventory is a slice of what the wider parts world carries."],
      ['You tend to pay more', 'With one supplier and no outside sales to draw on, the same parts often cost more than they would elsewhere.'],
      ['The look can slip', "If the part that fits your theme isn't in stock, you settle for what is, and the build drifts from what you pictured."],
    ],
  },

  // ---- Intake form options ----
  partsOptions: [
    `I buy the parts (adds a ${PARTS_FEE} service fee, I handle returns)`,
    "I'll buy the parts myself (I handle returns)",
  ],
  useCases: ['Gaming', 'School / office', 'Creator / editing', 'Dev / work', 'Streaming', 'Not sure yet'],
  budgets: ['Under $1,000', '$1,000 to $1,500', '$1,500 to $2,200', '$2,200 to $3,000', '$3,000+', 'Not sure yet'],
  timelines: ['ASAP', 'Within a month', '1–3 months', 'Just exploring'],
  delivery: ['Free pickup in Lethbridge', 'Free delivery in Lethbridge', 'Outside Lethbridge (extra fee)'],

  faq: [
    { q: 'How does the process work?', a: 'You send your budget and what you need the PC for. I create a parts list or recommend options. Once you approve it, we move forward with purchasing and building.' },
    { q: 'Do I get an exact quote right away?', a: 'No. Initial quotes are estimates. Final pricing is confirmed when you are ready to purchase parts.' },
    { q: 'Can I buy the parts myself?', a: 'Yes. You can either buy them yourself or have me handle it. If you buy them, you are responsible for returns if something is defective.' },
    { q: 'What is included in the build fee?', a: 'Assembly, internal cable management, Windows installation, and basic testing.' },
    { q: 'What does performance setup include?', a: 'An optional $20 add-on: memory profile setup, BIOS configuration, and removing unnecessary background software for the best performance.' },
    { q: 'How long does it take?', a: 'Most builds are completed within 2 to 5 days after all parts arrive.' },
    { q: 'What happens if a part does not work?', a: 'If I purchased it, I handle the return. If you purchased it, you handle the return. I will help identify the issue either way.' },
    { q: 'Do you provide a warranty?', a: 'I provide a 60 day labor warranty on workmanship. If something I installed is physically incorrect, I will fix it. It does not cover part failures or accidental damage caused by the customer. Parts are covered by their manufacturer warranties.' },
    { q: 'Do you install Windows?', a: 'Yes. You can provide your own license or I can purchase one at full retail price. Windows also runs without a license.' },
    { q: 'Can you build the PC at my house?', a: 'Yes. On-site builds are a premium service, billed at $40/hr with a 3 hour minimum, plus a $40 travel fee.' },
    { q: 'Can you help me choose a prebuilt or laptop?', a: 'Yes. I offer consulting where I research and recommend the best options for your budget.' },
    { q: 'How much money can you save me?', a: 'In most cases, clients save between $100 and $500 or more by avoiding overpriced systems and poor configurations.' },
    { q: 'What if I change my mind after ordering parts?', a: "Once parts are ordered, refunds depend on the retailer's return policy." },
    { q: 'Do you work with used parts?', a: 'Sometimes. This is handled case by case.' },
    { q: 'Do you offer delivery?', a: 'Yes. Pickup is free. Delivery is free within Lethbridge and available outside for a fee.' },
    { q: 'How do I get started?', a: 'Send a request through this page with your budget, use case, and any preferences.' },
  ],

  termsUpdated: 'June 4, 2026',
  termsIntro: 'By requesting or using any service through this website, you agree to the terms below.',
  terms: [
    { title: 'Services Provided', body: ['I offer custom PC part selection, system assembly, setup, and consulting services. This includes operating system installation, hardware testing, and optional performance configuration.'] },
    { title: 'Quotes and Pricing', body: ['All initial quotes are estimates based on current pricing and availability. Final pricing is confirmed when parts are ready to be purchased.', 'Component prices may change at any time. I am not responsible for price changes between estimate and final purchase.'] },
    { title: 'Payment and Deposits', body: ['Full payment for parts is required before any parts are ordered.', 'This payment is non refundable once parts have been purchased.', 'Build and service fees must be paid before or at the time of pickup or delivery unless otherwise agreed.'] },
    { title: 'Purchasing Options', body: ['Option 1, I purchase parts: a 3 percent service fee is added to the total cost of parts. I will handle returns or exchanges for defective or incompatible components.', 'Option 2, the client purchases parts: you are responsible for ordering all components. If any part is defective or does not work, you are responsible for returns and replacements.', 'I will assist in identifying issues and recommending solutions. Additional labor is billed at $40 per hour if extended troubleshooting is required.'] },
    { title: 'Build Time and Delays', body: ['Typical build time is 2 to 5 days after all parts are received. Delays may occur due to defective parts, shipping issues, or complex builds.'] },
    { title: 'Warranty and Responsibility', body: ['Labor warranty: I provide a 60 day labor warranty on workmanship. If a component I installed is physically installed incorrectly, I will come and fix it. This warranty does not cover part failures, or damage or issues caused by the customer.', 'Parts warranty: all components are covered by their manufacturer warranties. I do not provide additional warranty on parts.'] },
    { title: 'Limitation of Liability', body: ['I am not responsible for the following:'], bullets: ['Manufacturer defects or part failures after delivery', 'Data loss under any circumstances', 'Damage caused by misuse or improper handling', 'Delays caused by suppliers, shipping carriers, or retailers'], after: ['Liability is limited to the amount paid for the service.'] },
    { title: 'Data Responsibility', body: ['You are responsible for backing up all data before providing any storage device or system. I am not responsible for data loss.'] },
    { title: 'Software and Licensing', body: ['Operating systems can be installed as part of the build. You are responsible for providing a valid license unless one is purchased through me. Windows will work without a license.', 'I do not provide or support unauthorized software or activation methods.'] },
    { title: 'On-Site Services', body: ['On-site services are available upon request and are billed at $40 per hour, with a 3 hour minimum, plus a $40 travel fee.', "I am not responsible for delays or issues caused by workspace limitations or interruptions in the client's environment."] },
    { title: 'Delivery and Pickup', body: ['Free pickup is available. Delivery within Lethbridge is free. Delivery outside of Lethbridge is available for an additional fee.'] },
    { title: 'Cancellations', body: ['Orders may be cancelled before parts are purchased. Once parts are ordered, cancellations depend on retailer return policies.'] },
    { title: 'Scope of Work', body: ['The standard build fee includes assembly and basic setup only. Additional work is billed at $40 per hour.'] },
    { title: 'Consultation and Sourcing Services', body: ['Consultation services include researching and recommending PCs, laptops, and related equipment.', 'All recommendations are based on available information at the time. I am not responsible for price changes, availability, or product issues after purchase.', 'Consultation fees are non refundable once completed.'] },
    { title: 'Communication', body: ['I aim to respond within 24 to 48 hours.'] },
    { title: 'Changes to Terms', body: ['These terms may be updated at any time. Continued use of services means you accept the current version.'] },
  ],
};
