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
    title: 'Custom PC builds in Lethbridge',
    lede:
      'I can help choose parts, assemble your PC, or compare systems before you buy. Send me your budget and what you plan to use it for.',
    video: quoteVideo,
    poster: quotePoster,
    facts: [
      ['Based in', 'Lethbridge, AB'],
      ['Build time', '2 to 5 days once parts arrive'],
      ['Delivery', 'Free pickup + free local delivery'],
    ],
  },

  services: [
    {
      id: 'custom',
      name: 'Custom PC build',
      price: BUILD_FEE,
      priceLabel: 'Flat build fee',
      blurb:
        'Part selection, assembly, and setup for gaming, school, or work.',
      points: [
        'Assembly, internal cable management, and Windows installation',
        'Basic testing after assembly',
        'Optional BIOS and Windows performance setup: +$20',
      ],
    },
    {
      id: 'onsite',
      name: 'On-site PC build',
      price: ONSITE_RATE,
      priceLabel: '3 hr minimum, +$40 travel',
      blurb:
        'I assemble and set up the PC at your home.',
      points: [
        'Assembly and setup at your location',
        '3-hour minimum at $40/hr, plus a $40 travel fee',
      ],
    },
    {
      id: 'consult',
      name: 'PC buying advice',
      price: CONSULT_FEE,
      priceLabel: 'Flat rate per request',
      blurb:
        'Help comparing prebuilt PCs, laptops, monitors, or a full setup.',
      points: [
        'Recommendations based on your budget and intended use',
        'Retailer links and an explanation of the options',
      ],
    },
  ],

  // ---- Intake form options ----
  partsOptions: [
    `I buy the parts (adds a ${PARTS_FEE} service fee, I handle returns)`,
    "I'll buy the parts myself (I handle returns)",
  ],
  useCases: ['Gaming', 'School / office', 'Creator / editing', 'Dev / work', 'Streaming', 'Not sure yet'],
  budgets: ['Under $1,000', '$1,000 to $1,500', '$1,500 to $2,200', '$2,200 to $3,000', '$3,000+', 'Not sure yet'],
  timelines: ['As soon as possible', 'Within a month', '1 to 3 months', 'Just exploring'],
  delivery: ['Free pickup in Lethbridge', 'Free delivery in Lethbridge', 'Outside Lethbridge (extra fee)'],

  faq: [
    { q: 'How does the process work?', a: 'You send your budget and what you need the PC for. I create a parts list or recommend options. Once you approve it, we move forward with purchasing and building.' },
    { q: 'Do I get an exact quote right away?', a: 'No. Initial quotes are estimates. Final pricing is confirmed when you are ready to purchase parts.' },
    { q: 'Can I buy the parts myself?', a: 'Yes. You can either buy them yourself or have me handle it. If you buy them, you are responsible for returns if something is defective.' },
    { q: 'What is included in the build fee?', a: 'Assembly, internal cable management, Windows installation, and basic testing.' },
    { q: 'What does performance setup include?', a: 'An optional $20 add-on: memory profile setup, BIOS configuration, and removing unnecessary background software.' },
    { q: 'How long does it take?', a: 'Most builds are completed within 2 to 5 days after all parts arrive.' },
    { q: 'What happens if a part does not work?', a: 'If I purchased it, I handle the return. If you purchased it, you handle the return. I will help identify the issue either way.' },
    { q: 'Do you provide a warranty?', a: 'I provide a 60 day labor warranty on workmanship. If something I installed is physically incorrect, I will fix it. It does not cover part failures or accidental damage caused by the customer. Parts are covered by their manufacturer warranties.' },
    { q: 'Do you install Windows?', a: 'Yes. You can provide your own license or I can purchase one at full retail price.' },
    { q: 'What if I change my mind after ordering parts?', a: "Once parts are ordered, refunds depend on the retailer's return policy." },
    { q: 'Do you work with used parts?', a: 'Sometimes. This is handled case by case.' },
    { q: 'Do you offer delivery?', a: 'Yes. Pickup is free. Delivery is free within Lethbridge and available outside for a fee.' },
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
