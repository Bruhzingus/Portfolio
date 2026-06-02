import { motion, useReducedMotion } from "framer-motion";
import "./Hero.css";
import resumePDF from "/Resume.pdf";

function Hero({ theme, toggleTheme }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="hero-title">Hi, I'm Randall Brezina</h1>
        <p className="hero-subtitle">
          I’m a Computer Information Technology graduate focused on computer
          hardware, UI design, and creative problem-solving.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn">View My Work</a>
          <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="btn">
            View My Resume
          </a>

          <button className="btn" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
