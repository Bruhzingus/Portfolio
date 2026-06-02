import profilePic from '../assets/personal.jpg';
import './About.css'
function About() {
    return (
       <section id="about" className="about-section">
      <div className="about-container">
        <img src={profilePic} alt="Randall Brezina" className="profile-pic" />

        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I’m a Computer Information Technology (CIT) graduate from Lethbridge Polytechnic (formerly Lethbridge College) with a passion for UI design, analyzing systems, and problem-solving. I enjoy building
            efficient, scalable solutions and exploring new technologies like
            React, Node.js, and cloud computing. I pride myself in being an expert
            at working with technology hands on, and I am always looking to
            sharpen my skills with all things tech.
          </p>
          <h3>Skills</h3>
          <ul className="skills-list">
            <li>Hands-On Hardware &amp; PC Building</li>
            <li>Hardware Troubleshooting</li>
            <li>Client Communication &amp; Consulting</li>
            <li>Budget Planning</li>
            <li>Networking Basics</li>
            <li>UI/UX Design</li>
            <li>React</li>
            <li>Node.js</li>
            <li>C#</li>
            <li>HTML</li>
          </ul>
        </div>
      </div>
    </section>
    
        )
      }
      export default About;