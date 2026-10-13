import lucasImg from '../assets/LucasPC.webp';
import brockImg from '../assets/brockpc.webp';
import personalPCImg from '../assets/personalPC.webp';
import keyboardImg from '../assets/keyboard.webp';
import shelfcastImg from '../assets/shelfcast-poster.webp';
import strengthImg from '../assets/website-poster.webp';
import portraitImg from '../assets/portrait.webp';
import shiftclockerImg from '../assets/shiftclocker-poster.webp';
import shelfcastVideo from '../assets/shelfcast.mp4';
import strengthVideo from '../assets/website.mp4';
import shiftclockerVideo from '../assets/ShiftClocker.mp4';

export const ABOUT = {
  name: "Randall Brezina",
  tagline: "Custom PCs and software projects.",
  role: "Computer Information Technology Graduate",
  focus: "Computer Hardware · UI / UX",
  location: "Lethbridge, Alberta",
  bio: "I'm a Computer Information Technology graduate from Lethbridge Polytechnic. My work includes custom PC builds, software projects, and interface design.",
  availability: "Currently employed. Available for PC builds and contract work.",
  portrait: portraitImg,
};

export const PROJECTS = [
  {
    id: "lucas",
    type: "hardware",
    title: "Client gaming PC",
    tag: "Custom PC · Client",
    image: lucasImg,
    desc: "I selected the parts, assembled the PC, made a clean installation of Windows, and configured XMP/EXPO. The client set a $2,500 CAD budget; the completed build came to around $2,200 CAD.",
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
    title: "Gaming and video editing PC",
    tag: "Custom PC · 1440p",
    image: brockImg,
    desc: "I selected parts within the client's budget, explained each choice, helped assemble the PC, and made a clean installation of Windows 11. The build was planned for 1440p gaming, video editing, and content creation, with room for a later CPU upgrade.",
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
    title: "My desktop PC",
    tag: "Custom PC · Daily Driver",
    image: personalPCImg,
    desc: "I built this PC for gaming, content creation, and software development, choosing parts for performance, cooling, and appearance. I also use it to test hardware.",
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
    title: "My mechanical keyboard",
    tag: "Peripheral · Hand-assembled",
    image: keyboardImg,
    desc: "I chose the case, switches, and keycaps and assembled this keyboard for daily use.",
    specs: [
      ["Case", 'FL Esports MK870 “Smokey Grey”'],
      ["Switches", "Everglide Aquaking V3 · 55g Linear"],
      ["Keycaps", "Cherry Blossom PBT"],
    ],
  },
  {
    id: "shelfcast",
    type: "software",
    title: "ShelfCast",
    tag: "Dashboard · Forecasting",
    image: shelfcastImg,
    video: shelfcastVideo,
    desc: "I built ShelfCast for a local business in Lethbridge. It imports POS sales exports into SQLite and displays sales charts, category trends, and per-item forecasts.",
    stack: ["React", "Node.js", "SQLite", "Forecasting"],
    features: [
      ["Import", "CSV sales exports"],
      ["Storage", "Sales stored in a local SQLite database"],
      ["Reports", "Top-selling and slow-selling items, and category trends"],
      ["Forecasts", "Per-item forecast reports generated in bulk"],
      ["Filters", "Date range and category"],
    ],
  },
  {
    id: "shiftclocker",
    type: "software",
    portrait: true,
    title: "ShiftClocker",
    tag: "Mobile App · Android",
    image: shiftclockerImg,
    video: shiftclockerVideo,
    desc: "I built this Android shift logging app from scratch during my practicum using React Native and Expo. I wanted easier access to notes on quick shifts, flexible reports, filtering, and themes. The app supports live timers, manual entries, and pay tracking.",
    stack: ["React Native", "Expo SDK 54", "AsyncStorage", "Android"],
    features: [
      ["Shifts", "Live timer, quick shift templates, or manual entry"],
      ["Pay", "Per-job rates, raise history, overtime, breaks, tips, mileage"],
      ["Filters", "Week, pay period, month, or year; swipe to navigate"],
      ["Reports", "CSV and PDF exports with a custom date range and totals"],
      ["Themes", "10 themes, applied without restarting"],
    ],
  },
  {
    id: "strength",
    type: "software",
    title: "Brezina Strength Academy",
    tag: "UI/UX · Coaching Site",
    image: strengthImg,
    video: strengthVideo,
    desc: "I designed this coaching website in Figma and built it in Wix. The project focused on mobile use and accessibility and included a live usability test in front of an audience, using Steve Krug's usability principles.",
    stack: ["Figma", "Wix", "UI/UX", "Accessibility"],
    features: [
      ["Layouts", "Mobile layouts and accessibility"],
      ["Method", "Steve Krug's usability principles"],
      ["Testing", "Live usability testing in front of an audience"],
      ["Design", "Prototypes and design hand-off"],
    ],
  },
];

export const HARDWARE = PROJECTS.filter((p) => p.type === "hardware");
export const SOFTWARE = PROJECTS.filter((p) => p.type === "software");

export const TESTIMONIALS = [
  {
    id: "cody",
    name: "Cody",
    org: "BARCO Tech",
    role: "Colleague",
    quote: "Randall is such an amazing teammate, he is always a pleasure to work with and very reliable. 100% would recommend.",
  },
  {
    id: "brock",
    name: "Brock",
    org: "Lethbridge Polytechnic",
    role: "Client · Custom PC",
    quote: "Randall provided excellent guidance throughout my PC build. He helped me select the right components, troubleshoot issues, and ensured everything ran perfectly.",
  },
  {
    id: "jeremy",
    name: "Jeremy",
    org: "Steve's Urethane",
    role: "Employer",
    quote: "Randall picked up the job quickly despite having zero prior experience. He adapted fast, learned everything hands-on, and had incredible attention to detail. Anyone would be lucky to work with him.",
  },
  {
    id: "timothy",
    name: "Timothy",
    org: "Lethbridge Polytechnic",
    role: "Professor · Systems Analysis & Design",
    quote: "It was a pleasure to have Randall in my Systems Analysis and Design class. He was consistently among the top performers, and always the best dressed for the presentations. The quality of work that he produced was above the industry standard and I have high expectations of what he'll continue to do after finishing his studies.",
  },
];

export const CONTACT = {
  email: "randallbrez05@gmail.com",
  linkedin: "https://www.linkedin.com/in/randall-brezina-585506393/",
};
