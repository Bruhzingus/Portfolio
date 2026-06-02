import './Projects.css';
import { motion, useReducedMotion } from "framer-motion";
import websiteGif from "../assets/website.mp4";
import shelfcastGif from "../assets/shelfcast.mp4";
import pcPic from "../assets/PC.jpg";
import kbPic from "../assets/Keyboard.jpg";
import pcBrock from "../assets/brockpc.jpg";
import FlipCard from "./FlipCard";
import LucasPCPic from "../assets/LucasPC.png";

function Projects () {
   const reduceMotion = useReducedMotion();

   // Subtle "fade + rise" as each card scrolls into view.
   const reveal = {
     hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
     visible: { opacity: 1, y: 0 },
   };
   const revealProps = {
     variants: reveal,
     initial: "hidden",
     whileInView: "visible",
     viewport: { once: true, amount: 0.2 },
     transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
   };

    return (
    <section id="projects">
        <motion.h2 {...revealProps}>Projects</motion.h2>
        <motion.p {...revealProps}>Take a look at some of my recent projects with live GIF or image demonstrations!</motion.p>
        <motion.div className="project" {...revealProps}>
          <h3>ShelfCast — Sales Analytics & Forecasting Dashboard</h3>
          <video src={shelfcastGif} autoPlay loop muted playsInline aria-label="Screen recording demo of the ShelfCast sales analytics and forecasting dashboard" className="shelfcast-gif"/>
          <p>
            ShelfCast is a sales dashboard focused on providing analytics and insights, including predicting future
            sales using an advanced forecasting algorithm. Originally built for a specific local business in Lethbridge,
            I have since expanded the project with the goal of making it scalable for any small business that has POS data.
          </p>
          <ul className="shelfcast-features">
            <li>Upload CSV exports from your POS system</li>
            <li>Automatically parses and stores sales data in a local SQLite database</li>
            <li>Generates visual reports: top sellers, worst movers, sales trends, and category performance</li>
            <li>Can generate bulk reports for each forecast of your merchandise</li>
            <li>Filter all reports by date range and category</li>
          </ul>
        </motion.div>
        <motion.div className="project" {...revealProps}>
          <h3>Brezina Strength Academy</h3>
          <video src={websiteGif} autoPlay loop muted playsInline aria-label="Screen recording demo of the Brezina Strength Academy coaching website" className="fitness-gif"/>
          <p>
            A personal coaching website built using Wix and Figma to showcase UI/UX design with a focus on accessibility, with full mobile
            accessibility.
            I developed prototyping skills and demonstrated live usability testing with my website in front of a live audience.
            Created using Steve Krug's principles for accessibility to ensure the user didn't feel lost or overwhelmed when navigating my website.
          </p>
        </motion.div>
          <motion.div className="project" {...revealProps}>
            <h3>Client's High-Performance Gaming Build</h3>
            <p>
              An end-to-end gaming PC build for a client working with a $2,500 CAD budget, delivered
              fully assembled and tuned for roughly $2,200. I guided the client from the very first
              conversation: scoping what was realistically achievable within the budget, defining target
              resolutions and frame rates, and walking through the aesthetic/theme options before settling
              on a final parts list. Throughout the process I explained the reasoning behind every choice,
              flagged common buying traps to avoid, and used the PSU tier list to verify the power supply
              was genuinely worth its price rather than relying on wattage and marketing alone.
              <br /><br />
              Beyond the core components, I advised on the full peripheral setup (monitor, keyboard,
              mousepad, and more) to match the performance targets and budget. I then assisted with the
              physical build, performed a clean Windows installation, removed unnecessary bloatware, and
              enabled XMP/EXPO so the memory ran at its rated speed out of the box.
            </p>
            <FlipCard image={LucasPCPic} alt="Client's custom-built high-performance gaming PC" label="Client's High-Performance Gaming Build">
              <div className="pc-specs">
                <h4>System Specifications</h4>
                <ul>
                  <li><strong>CPU:</strong> AMD Ryzen 5 7600X3D 6-Core</li>
                  <li><strong>GPU:</strong> ASRock Steel Legend Radeon RX 9070 XT 16GB</li>
                  <li><strong>Motherboard:</strong> ASUS TUF Gaming B650E-M E WIFI Micro ATX AM5</li>
                  <li><strong>RAM:</strong> TEAMGROUP T-Force Vulcan 32GB (2×16GB) DDR5 6000MHz CL30</li>
                  <li><strong>Storage:</strong> Nextorage NEM-PA 2TB M.2 PCIe 4.0 NVMe SSD</li>
                  <li><strong>Power Supply:</strong> SAMA G850 850W 80+ Gold Fully Modular</li>
                  <li><strong>Cooling:</strong> Vetroo V5 Air CPU Cooler</li>
                  <li><strong>Case:</strong> Lian Li VECTOR V100R MINI MicroATX</li>
                </ul>
              </div>
            </FlipCard>
          </motion.div>
          <motion.div className="project" {...revealProps}>
            <h3>Client's Gaming/Media Production Build</h3>
            <p>
              A custom-built PC designed for gaming, video editing, and social media creation.
              I worked with the client from the very start of the build, to help select all the components within
              their budget and explain the reasoning for each decision. Provided guidance to the client on how to build the
              PC, and assisted where the client was uncomfortable with the assembly process. Freshly installed Windows 11
              Home and provided assistance in setting up software.
              <br />
              Hardware specifications are catered towards gaming performance at 1440p, with a future upgrade path to a stronger CPU.
            </p>
            <FlipCard image={pcBrock} alt="Client's custom-built gaming and media production PC" label="Client's Gaming and Media Production Build">
              <div className="pc-specs">
                <h4>System Specifications</h4>
                <ul>
                  <li><strong>CPU:</strong> AMD Ryzen 5 7600</li>
                  <li><strong>GPU:</strong> Acer Predator Radeon 9070 XT</li>
                  <li><strong>Motherboard:</strong> ASRock B650M Pro RS Micro ATX</li>
                  <li><strong>RAM:</strong> Patriot Viper 32GB DDR5 6000MHz CL36</li>
                  <li><strong>Storage:</strong> 1TB Patriot P400 V4 M.2 SSD</li>
                  <li><strong>Power Supply:</strong> Cooler Master MWE Gold V3 750W 80+ Gold</li>
                  <li><strong>Cooling:</strong> 4× Montech OEM RGB Fans</li>
                  <li><strong>Case:</strong> Montech XM5 MicroATX Case</li>
                </ul>
              </div>
            </FlipCard>
          </motion.div>
          <motion.div className="project" {...revealProps}>
            <h3>Personal Gaming + Productivity Build</h3>
            <p>
              A custom-built PC designed for gaming, content creation, and IT development work.
              Features a strong balance of performance, cooling, and aesthetics. Also is used as a sandbox for
              me to work on hardware related projects.
            </p>
            <FlipCard image={pcPic} alt="My personal custom-built gaming and productivity PC" label="Personal Gaming and Productivity Build">
              <div className="pc-specs">
                <h4>System Specifications</h4>
                <ul>
                  <li><strong>CPU:</strong> AMD Ryzen 5 7600</li>
                  <li><strong>GPU:</strong> ASRock Radeon 6700 XT</li>
                  <li><strong>Motherboard:</strong> Gigabyte B650 EAGLE ATX</li>
                  <li><strong>RAM:</strong> T-Create 32GB DDR5 6000MHz CL30</li>
                  <li><strong>Storage:</strong> 1TB SN770 NVMe M.2 SSD, 2TB Seagate Barracuda HDD</li>
                  <li><strong>Power Supply:</strong> Antec NeoECO 650W 80+ Gold</li>
                  <li><strong>Cooling:</strong> 6× DeepCool CF120 RGB Fans</li>
                  <li><strong>Case:</strong> DeepCool Matrexx 55 V3</li>
                </ul>
              </div>
            </FlipCard>
          </motion.div>
          <motion.div className="project" {...revealProps}>
            <h3>Custom Mechanical Keyboard Build</h3>
            <p>
              Designed and assembled a custom mechanical keyboard focused on typing
              feel, long-term reliability, and ergonomic comfort. This project
              served as hands-on experience in keyboard component selection, hardware
              customization, and peripheral optimization for daily productivity use.
            </p>
            <FlipCard image={kbPic} alt="Custom-built mechanical keyboard" label="Custom Mechanical Keyboard Build">
              <div className="pc-specs">
                <h4>Hardware Specifications</h4>
                <ul>
                  <li><strong>Case:</strong> FL Esports MK870 "Smokey Grey"</li>
                  <li><strong>Switches:</strong> Everglide Aquaking V3, 55g Linear</li>
                  <li><strong>Keycaps:</strong> Cherry Blossom PBT Keycaps</li>
                </ul>
              </div>
            </FlipCard>
          </motion.div>

      </section>
    )
}
export default Projects;
