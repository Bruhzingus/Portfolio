import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Randall Brezina</div>

      <div className="nav-links">
        <a href="#index" className="btn">Home</a>
        <a href="#about" className="btn">About Me</a>
        <a href="#projects" className="btn">Projects</a>
      </div>
    </nav>
  );
}