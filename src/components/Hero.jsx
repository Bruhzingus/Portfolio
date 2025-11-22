import './Hero.css';
import resumePDF from "/Resume.pdf";
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Randall 👋</h1>
        <p>
          I’m an aspiring IT professional focused on software development,
          data management, and creative problem-solving.
        </p>
        <div className="hero-buttons">
        <a href="#projects" className="btn">View My Work</a>
        
        <a href={resumePDF} target= "_blank" rel="noopener noreferrer" className="btn">View My Resume</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;