import profilePic from '../assets/personal.jpg';
import { motion, useReducedMotion } from "framer-motion";
import './About.css'

function About() {
    const reduceMotion = useReducedMotion();
    const transition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] };
    const viewport = { once: true, amount: 0.3 };

    return (
       <section id="about" className="about-section">
      <div className="about-container">
        <motion.img
          src={profilePic}
          alt="Randall Brezina"
          className="profile-pic"
          initial={{ opacity: 0, x: reduceMotion ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={transition}
        />

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: reduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ ...transition, delay: 0.1 }}
        >
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
        </motion.div>
      </div>
    </section>

        )
      }
      export default About;
