import './Navbar.css';
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Randall Brezina</h2>
      <ul>
        <li><a href="#about" className="btn">About</a></li>
        <li><a href="#projects" className="btn">Projects</a></li>
        <li><a href="#contact" className="btn">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;