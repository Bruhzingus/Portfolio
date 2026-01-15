import './Projects.css';
import { useState } from "react";
import websiteGif from "../assets/website.mp4";
import minesGif from "../assets/mines.mp4";
import pcPic from "../assets/PC.jpg";
import kbPic from "../assets/Keyboard.jpg";
function Projects () {
   const [showPcDetails, setShowPcDetails] = useState(false);
   const [showKbDetails, setShowKbDetails] = useState(false);
    return (
    <section id="projects">
        <h2>Projects</h2>
        <p>Take a look at some of my recent projects with live GIF or image demonstrations!</p>
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
          <h3>C# Mines Sumulator</h3>
          <video src={minesGif} autoPlay loop muted playsInline className="mines-gif"/>
          <p>
             A C# application that can replicate the famous high stakes game, Mines. 
             Devoloped algorithmic, logical, and UI coding skills during this fun personal project. 
             It features a money system, adjustable mine values, and accurate risk vs reward scalability. 
             It also helped further my understanding of the UI design tools within Visual Studio 2022. 

          </p>
        </div>
          <div className="project">
            <h3>Custom Gaming + Productivity Build</h3>
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
                        <li><strong>Storage:</strong>1TB SN770 NVMe M.2 SSD, 2 TB Seagate Barracuda HDD </li>
                        <li><strong>Power Supply:</strong> Antec NeoECO Gold 650W</li>
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
            <h3>Custom Mechanical Keyboard Build</h3>
            <img src={kbPic} className="pc-pic"/>
            <p>
              Designed and assembled a custom mechanical keyboard focused on typing
              consistency, long-term reliability, and ergonomic comfort. This project
              served as hands-on experience in component selection, hardware
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