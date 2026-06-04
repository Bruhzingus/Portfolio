export const QUOTE = {
  // Uses the same working Formspree form as the contact endpoint so quote
  // requests are actually delivered. Swap in a dedicated quote form ID anytime.
  formspreeEndpoint: "https://formspree.io/f/xojzqngv",

  issue: "Custom PC Quote",
  title: "Let's spec your build.",
  lede: "Tell me what you want to do with it and what you have to spend. I'll come back with a parts list, a real price, and a build window. No upsell, no part-shuffling.",
  facts: [
    ["Turnaround", "10–14 days from quote acceptance"],
    ["Location", "Lethbridge, AB · free pickup or free delivery in Lethbridge"],
    ["Parts", "I quote at cost, billed transparently"],
    ["Status", "Currently scheduling · ~2 weeks out"],
  ],

  tiers: [
    {
      id: "entry",
      name: "Entry",
      from: "$1,200",
      ideal: "1080p / esports + general use",
      bullets: [
        "Current-gen Ryzen 5 or Intel i5",
        "Mid-range GPU (RX 7600 / RTX 4060 tier)",
        "16–32 GB DDR5, 1 TB NVMe",
        "Tier-A 650 W PSU, clean cable run",
        "Windows install + driver / BIOS tune",
      ],
    },
    {
      id: "mid",
      name: "Mid",
      from: "$1,800",
      ideal: "1440p high-refresh + light creator work",
      bullets: [
        "Ryzen 7 / X3D or Intel i7",
        "RX 7800 XT / RTX 4070 tier",
        "32 GB DDR5-6000 CL30",
        "1–2 TB Gen4 NVMe",
        "Tower air or 240 mm AIO, balanced fan curves",
      ],
      featured: true,
    },
    {
      id: "performance",
      name: "Performance",
      from: "$2,500",
      ideal: "1440p / 4K + video editing, streaming, ML",
      bullets: [
        "Ryzen 7 7800X3D / 9 series or i7 / i9",
        "RX 9070 XT / RTX 4070 Ti+ tier",
        "32–64 GB DDR5",
        "2 TB Gen4 NVMe + bulk drive",
        "Premium chassis, custom fan + RGB plan",
      ],
    },
  ],

  useCases: ["Gaming", "Streaming", "Video editing", "3D / CAD", "Office / dev", "Home server"],
  timelines: ["ASAP", "Within a month", "1–3 months", "Just exploring"],
  delivery: ["Free pickup in Lethbridge", "Free delivery in Lethbridge", "Outside Lethbridge (extra charge)"],
  budgets: ["Under $1,200", "$1,200 to $1,800", "$1,800 to $2,500", "$2,500+"],

  faq: [
    {
      q: "What's included in the price?",
      a: "Every part on the list, the build itself, a clean Windows 11 install with drivers and BIOS tuned, basic stability testing, and a hand-off walk-through. Parts are quoted at cost. My fee is for the build labour, not a markup on hardware.",
    },
    {
      q: "What if a part arrives DOA or fails early?",
      a: "Each component carries its own manufacturer warranty (typically 2–3 years on the major parts, 5–10 on PSUs). If something fails inside the first 30 days I handle the RMA on your behalf at no labour cost.",
    },
    {
      q: "Do I pay for parts upfront?",
      a: "Yes. Once the parts list is agreed, the hardware cost is paid up front so I can order without delay. Build labour is invoiced on delivery. I'll send a single transparent receipt covering both.",
    },
    {
      q: "Do you deliver outside Lethbridge?",
      a: "Pickup and delivery within Lethbridge are both free. If you're outside Lethbridge, delivery is available but will come with an extra charge depending on distance. We'll sort out the details before anything is confirmed.",
    },
    {
      q: "Can I supply my own parts or a partial list?",
      a: "Absolutely. Drop the list (or a parts cart) into the message field and I'll check compatibility, flag anything that doesn't fit the use case, and quote the labour only.",
    },
    {
      q: "How long does it take?",
      a: "From quote acceptance to delivered PC: 10 to 14 days on average. The bottleneck is usually a backorder on one part. I'll flag it up front and we'll agree on a swap if needed.",
    },
  ],
};
