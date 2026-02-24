import { useEffect, useRef } from "react";
import "./Hero.css";
import resumePDF from "/Resume.pdf";

function Hero({ theme, toggleTheme }) {
  const heroRef = useRef(null);

  // Animate hero on intersection
  useEffect(() => {
    const element = heroRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("animate-hero");
        }
      },
      { threshold: 0.5 }
    );

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Randall</h1>
        <p className="hero-subtitle">
          I’m an aspiring IT professional focused on computer hardware,
          UI design, and creative problem-solving.
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
      </div>
    </section>
  );
}

export default Hero;