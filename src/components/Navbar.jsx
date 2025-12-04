import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <a 
          href="#" 
          className="nav-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </a>
        <a href="#about" className="nav-btn">About Me</a>
        <a href="#projects" className="nav-btn">Projects</a>
      </div>
    </nav>
  );
}
