import { useState, useEffect } from 'react'
import './StyleVariables.css'
import './App.css'
import './components/Navbar.css'
import './components/Hero.css'
import './components/About.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Accolades from './components/Accolades'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="App">
      <Navbar />
      <Hero theme={theme} toggleTheme={toggleTheme} />
      <About />
      <Projects />
      <Accolades />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;