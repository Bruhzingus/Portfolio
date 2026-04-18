import './Projects.css';
import { useState } from "react";
import websiteGif from "../assets/website.mp4";
import shelfcastGif from "../assets/shelfcast.mp4";
import pcPic from "../assets/PC.jpg";
import kbPic from "../assets/Keyboard.jpg";
import pcBrock from "../assets/brockpc.jpg";
function Projects () {
   const [showPcDetails, setShowPcDetails] = useState(false);
   const [showBrockPcDetails, setShowBrockPcDetails] = useState(false);
   const [showKbDetails, setShowKbDetails] = useState(false);
    return (
    <section id="projects">
        <h2>Projects</h2>
        <p>Take a look at some of my recent projects with live GIF or image demonstrations!</p>
        <div className="project">
          <h3>ShelfCast — Sales Analytics & Forecasting Dashboard</h3>
          <video src={shelfcastGif} autoPlay loop muted playsInline className="shelfcast-gif"/>
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
        </div>
        <div className="project">
          <h3>Brezina Strength Academy</h3>
          <video src={websiteGif} autoPlay loop muted playsInline className="fitness-gif"/>
          <p>
            A personal coaching website built using Wix and Figma to showcase UI/UX design with a focus on accessibility, with full mobile 
            accessibility. 
            I developed prototyping skills and demonstrated live usability testing with my website in front of a live audience.
            Created using Steve Krug's principals for accessibility to ensure the user didn't feel lost or overwhelmed when navigating my website. 
          </p>
        </div>
          <div className="project">
            <h3>Personal Gaming + Productivity Build</h3>
            <img src={pcPic} className="pc-pic"/>
            <p>
              A custom-built PC designed for gaming, content creation, and IT development work. 
              Features a strong balance of performance, cooling, and aesthetics. Also is used as a sandbox for
              me to work on hardware related projects. 
            </p>
              
                {showPcDetails && (
                  <div className="pc-details">
                    <div className="pc-specs">
                      <h4>System Specifications</h4>
                      <ul>
                        <li><strong>CPU:</strong> AMD Ryzen 5 7600</li>
                        <li><strong>GPU:</strong> ASRock Radeon 6700 XT</li>
                        <li><strong>Motherboard:</strong> Gigabyte B650 EAGLE ATX</li>
                        <li><strong>RAM:</strong> T-Create 32GB DDR5 6000MHz CL30</li>
                        <li><strong>Storage:</strong> 1TB SN770 NVMe M.2 SSD, 2 TB Seagate Barracuda HDD </li>
                        <li><strong>Power Supply:</strong> Antec NeoECO 650W 80+ Gold</li>
                        <li><strong>Cooling:</strong> 6× DeepCool CF120 RGB Fans</li>
                        <li><strong>Case:</strong> DeepCool Matrexx 55 V3</li>
                      </ul>
                    </div>

                    <div className="upgrade-history">
                      <h4>Upgrade History</h4>
                      <ul>
                        <li>Replaced the CPU, motherboard, and RAM with modern AM5 components.</li>
                        <li>Upgraded to a Radeon 6700 XT for improved gaming performance.</li>
                        <li>Installed a higher-efficiency PSU to support system expansion.</li>
                        <li>Completely redid the cable management to improve airflow, aesthetics and to support future upgrades/maintenance.</li>
                      </ul>
                    </div>
                  </div>
                )}
              <button 
                className="show-more-btn" 
                onClick={() => setShowPcDetails(!showPcDetails)}
              >
                {showPcDetails ? "Hide Specs" : "Show Specs"}
              </button>
          </div>
          <div className="project">
            <h3>Client's Gaming/Media Production Build</h3>
            <img src={pcBrock} className="pc-pic"/>
            <p>
              A custom-built PC designed for gaming, video editing, and social media creation. 
              I worked with the client from the very start of the build, to help select all the components within
              their budget and explain the reasoning for each decision. Provided guidance to the client on how to build the 
              PC, and assisted where the client was uncomfortable with the assembly process. Freshly installed Windows 11
              Home and provided assistance in setting up software. 
              <br />
              Hardware specifications are catered towards gaming performance at 1440p, with a future upgrade path to a stronger CPU. 
            </p>
              
                {showBrockPcDetails && (
                  <div className="pc-details">
                    <div className="pc-specs">
                      <h4>System Specifications</h4>
                      <ul>
                        <li><strong>CPU:</strong> AMD Ryzen 5 7600</li>
                        <li><strong>GPU:</strong> Acer Predator Radeon 9070 XT</li>
                        <li><strong>Motherboard:</strong> ASRock B650M Pro RS Micro ATX</li>
                        <li><strong>RAM:</strong> Patriot Viper 32 GB DDR5 6000MHz CL36</li>
                        <li><strong>Storage:</strong>	1 TB Patriot P400 V4 M.2 SSD</li>
                        <li><strong>Power Supply:</strong> 	Cooler Master MWE Gold V3 750W 80+ Gold</li>
                        <li><strong>Cooling:</strong> 4x Montech OEM RGB Fans</li>
                        <li><strong>Case:</strong> Montech XM5 MicroATX Case</li>
                      </ul>
                    </div>

                    <div className="upgrade-history">
                      <h4>Future Maintenance</h4>
                      <ul>
                        <li>Plans are in place to upgrade the storage in the near future</li>
                        <li>A CPU upgrade will be focused on closer to the release date of Zen 6 (Ryzen's 10000 series of CPU's) </li>
                      </ul>
                    </div>
                  </div>
                )}
              <button 
                className="show-more-btn" 
                onClick={() => setShowBrockPcDetails(!showBrockPcDetails)}
              >
                {showBrockPcDetails ? "Hide Specs" : "Show Specs"}
              </button>
          </div>
          <div className="project">
            <h3>Custom Mechanical Keyboard Build</h3>
            <img src={kbPic} className="pc-pic"/>
            <p>
              Designed and assembled a custom mechanical keyboard focused on typing
              feel, long-term reliability, and ergonomic comfort. This project
              served as hands-on experience in keyboard component selection, hardware
              customization, and peripheral optimization for daily productivity use. 
            </p>
                {showKbDetails && (
                  <div className="pc-details">
                    <div className="pc-specs">
                      <h4>Hardware Specifications</h4>
                      <ul>
                        <li><strong>Case:</strong> FL Esports MK870 "Smokey Grey"</li>
                        <li><strong>Switches:</strong> Everglide Aquaking V3, 55g Linear</li>
                        <li><strong>Keycaps:</strong> Cherry Blossom PBT Keycaps</li>
                      </ul>
                    </div>
                  </div>
                )}
              <button 
                className="show-more-btn" 
                onClick={() => setShowKbDetails(!showKbDetails)}
              >
                {showKbDetails ? "Hide Specs" : "Show Specs"}
              </button>
          </div>
          
      </section>
    )
}
export default Projects; 