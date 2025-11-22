import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Navbar.css'
import './components/hero.css'
import './components/About.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Accolades from './components/Accolades'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Resume from "./components/Resume";
function App() {
  return (
   <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Accolades />
      <Contact />
      <Footer />
    </div>
  );

}

export default App;
