import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Hi, I'm Randall 👋</h1>
        <p>
          I’m an aspiring IT professional focused on software development,
          data management, and creative problem-solving.
        </p>
        <a href="#projects" className="btn">View My Work</a>
      </div>
    </section>
  );
}

export default Hero;