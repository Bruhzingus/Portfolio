import lucasImg from '../assets/LucasPC.webp';
import brockImg from '../assets/brockpc.webp';
import personalPCImg from '../assets/personalPC.webp';
import keyboardImg from '../assets/keyboard.webp';
import shelfcastImg from '../assets/shelfcast-poster.webp';
import strengthImg from '../assets/website-poster.webp';
import portraitImg from '../assets/portrait.webp';
import shiftclockerImg from '../assets/shiftclocker-poster.svg';
import shelfcastVideo from '../assets/shelfcast.mp4';
import strengthVideo from '../assets/website.mp4';
import shiftclockerVideo from '../assets/ShiftClocker.mp4';

export const ABOUT = {
  name: "Randall Brezina",
  tagline: "I build hardware and software that punch above their weight.",
  role: "Computer Information Technology Graduate",
  focus: "Computer Hardware · UI / UX",
  location: "Lethbridge, Alberta",
  bio: "CIT grad from Lethbridge Polytechnic with a focus on computer hardware, UI design, and hands-on problem solving. I like figuring out how things work, building things that are actually well thought out, and picking up new skills in tech whenever I can.",
  portrait: portraitImg,
};

export const PROJECTS = [
  {
    id: "lucas",
    type: "hardware",
    title: "Client's High-Performance Gaming Build",
    tag: "Custom PC · Client",
    image: lucasImg,
    desc: "Gaming PC built for a client with a $2,500 CAD budget, delivered fully assembled and tuned for around $2,200. Picked the parts, flagged buying traps, then did the build, a clean Windows install, and XMP/EXPO tuning.",
    specs: [
      ["CPU", "AMD Ryzen 5 7600X3D"],
      ["GPU", "ASRock Steel Legend RX 9070 XT 16GB"],
      ["Board", "ASUS TUF Gaming B650E-M E WIFI"],
      ["Memory", "TEAMGROUP T-Force Vulcan 32GB DDR5-6000 CL30"],
      ["Storage", "Nextorage NEM-PA 2TB PCIe 4.0 NVMe"],
      ["Power", "SAMA G850 850W 80+ Gold"],
      ["Cooling", "Vetroo V5 Air Cooler"],
      ["Case", "Lian Li VECTOR V100R MINI"],
    ],
  },
  {
    id: "brock",
    type: "hardware",
    title: "Client's Gaming / Media Production Build",
    tag: "Custom PC · 1440p",
    image: brockImg,
    desc: "Built for gaming, video editing, and content creation. Picked every part within budget, walked the client through each choice, helped with the physical build, and handed it off with a clean Windows 11 install tuned for 1440p. Left room for a CPU upgrade down the road.",
    specs: [
      ["CPU", "AMD Ryzen 5 7600"],
      ["GPU", "Acer Predator Radeon 9070 XT"],
      ["Board", "ASRock B650M Pro RS"],
      ["Memory", "Patriot Viper 32GB DDR5-6000 CL36"],
      ["Storage", "1TB Patriot P400 V4 M.2"],
      ["Power", "Cooler Master MWE Gold V3 750W"],
      ["Cooling", "4× Montech RGB Fans"],
      ["Case", "Montech XM5 MicroATX"],
    ],
  },
  {
    id: "personal",
    type: "hardware",
    title: "Personal Gaming + Productivity Build",
    tag: "Custom PC · Daily Driver",
    image: personalPCImg,
    desc: "My personal machine, used for gaming, content creation, and dev work. Built it to have solid performance and good cooling without sacrificing looks. I also use it to test hardware and try things out.",
    specs: [
      ["CPU", "AMD Ryzen 5 7600"],
      ["GPU", "ASRock Radeon 6700 XT"],
      ["Board", "Gigabyte B650 EAGLE"],
      ["Memory", "T-Create 32GB DDR5-6000 CL30"],
      ["Storage", "1TB SN770 NVMe + 2TB Barracuda"],
      ["Power", "Antec NeoECO 650W 80+ Gold"],
      ["Cooling", "6× DeepCool CF120 RGB"],
      ["Case", "DeepCool Matrexx 55 V3"],
    ],
  },
  {
    id: "keyboard",
    type: "hardware",
    title: "Custom Mechanical Keyboard Build",
    tag: "Peripheral · Hand-assembled",
    image: keyboardImg,
    desc: "Built this keyboard myself, picking every part for how it feels to type on. The switches are smooth, the case is solid, and I use it every day. Good way to get hands-on with peripheral customization.",
    specs: [
      ["Case", 'FL Esports MK870 “Smokey Grey”'],
      ["Switches", "Everglide Aquaking V3 · 55g Linear"],
      ["Keycaps", "Cherry Blossom PBT"],
    ],
  },
  {
    id: "shelfcast",
    type: "software",
    title: "ShelfCast: Sales Analytics & Forecasting",
    tag: "Dashboard · Forecasting",
    image: shelfcastImg,
    video: shelfcastVideo,
    desc: "A sales dashboard that takes POS exports and turns them into charts, trends, and forecasts. Originally built for a local Lethbridge business, then cleaned up so it can work for any small business with POS data.",
    stack: ["React", "Node.js", "SQLite", "Forecasting"],
    features: [
      ["Import", "CSV exports from any POS system"],
      ["Store", "Parses + stores sales in local SQLite"],
      ["Report", "Top sellers, worst movers, category trends"],
      ["Forecast", "Bulk per-item forecast reports"],
      ["Filter", "By date range and category"],
    ],
  },
  {
    id: "shiftclocker",
    type: "software",
    portrait: true,
    title: "ShiftClocker: Shift Logging App",
    tag: "Mobile App · Android",
    image: shiftclockerImg,
    video: shiftclockerVideo,
    desc: "A fully-featured shift-logging app built with React Native and Expo, made during my practicum to solve real problems I had with other work-log apps: no easy note access on quick shifts, rigid exports, no themes, and weak filtering. Built it from scratch into a production-ready app headed for the Play Store.",
    stack: ["React Native", "Expo SDK 54", "AsyncStorage", "Android"],
    features: [
      ["Log", "Live timer, quick shift templates, or full manual entry"],
      ["Pay", "Per-job rates, raise history, overtime, breaks, tips, mileage"],
      ["Filter", "By week, pay period, month or year; swipe to navigate"],
      ["Export", "CSV and PDF reports with custom date range and totals"],
      ["Theme", "10 hand-crafted themes, switch live with no restart"],
    ],
  },
  {
    id: "strength",
    type: "software",
    title: "Brezina Strength Academy",
    tag: "UI/UX · Coaching Site",
    image: strengthImg,
    video: strengthVideo,
    desc: "A coaching website built in Wix and designed in Figma, with a focus on mobile accessibility. Used Steve Krug's usability principles throughout and did live usability testing in front of an audience as part of the project.",
    stack: ["Figma", "Wix", "UI/UX", "Accessibility"],
    features: [
      ["Focus", "Accessibility-first, mobile-complete"],
      ["Method", "Steve Krug usability principles"],
      ["Proof", "Live usability testing, live audience"],
      ["Craft", "Prototyping + design hand-off"],
    ],
  },
];

export const HARDWARE = PROJECTS.filter((p) => p.type === "hardware");
export const SOFTWARE = PROJECTS.filter((p) => p.type === "software");

// Ordered manifest for the progressive loader (see useSequentialPreload).
// Assets warm in page order, top to bottom, one tier fully before the next:
//   Tier 1: every project's primary image (portrait, then hardware, then
//           software covers) so the whole page has its first visuals in hand.
//   Tier 2: the heavier demo videos, only after every image is cached.
export const PRELOAD_TIERS = [
  [ABOUT.portrait, ...HARDWARE.map((p) => p.image), ...SOFTWARE.map((p) => p.image)],
  [...SOFTWARE.filter((p) => p.video).map((p) => p.video)],
];

export const TESTIMONIALS = [
  {
    id: "cody",
    name: "Cody",
    org: "BARCO Tech",
    role: "Colleague",
    pull: "An amazing, reliable teammate, always a pleasure to work with.",
    quote: "Randall is such an amazing teammate, he is always a pleasure to work with and very reliable. 100% would recommend.",
  },
  {
    id: "brock",
    name: "Brock",
    org: "Lethbridge Polytechnic",
    role: "Client · Custom PC",
    pull: "Excellent guidance from part selection to a clean Windows install.",
    quote: "Randall provided excellent guidance throughout my PC build. He helped me select the right components, troubleshoot issues, and ensured everything ran perfectly.",
  },
  {
    id: "jeremy",
    name: "Jeremy",
    org: "Steve's Urethane",
    role: "Employer",
    pull: "Picked it up fast with zero experience, adapting quickly with incredible attention to detail.",
    quote: "Randall picked up the job quickly despite having zero prior experience. He adapted fast, learned everything hands-on, and had incredible attention to detail. Anyone would be lucky to work with him.",
  },
  {
    id: "timothy",
    name: "Timothy",
    org: "Lethbridge Polytechnic",
    role: "Professor · Systems Analysis & Design",
    pull: "Consistently a top performer; his work sits above the industry standard.",
    quote: "It was a pleasure to have Randall in my Systems Analysis and Design class. He was consistently among the top performers, and always the best dressed for the presentations. The quality of work that he produced was above the industry standard and I have high expectations of what he'll continue to do after finishing his studies.",
  },
];

export const CONTACT = {
  email: "randallbrez05@gmail.com",
  linkedin: "https://www.linkedin.com/in/randall-brezina-585506393/",
  response: "Replies within 24 to 48 hours.",
};
