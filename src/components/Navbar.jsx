import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">Randall Brezina</div>

      <div className="nav-links">
        <button>Home</button>
        <button>About</button>
        <button>Projects</button>
      </div>
    </nav>
  );
}