import profilePic from '../assets/personal.jpg';
import './About.css'
function About() {
    return (
       <section id="about" className="about-section">
      <div className="about-container">
        <img src={profilePic} alt="Randall Brezina" className="profile-pic" />

        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I’m an Information Technology student with a passion for software
            development, system design, and problem-solving. I enjoy building
            efficient, scalable solutions and exploring new technologies like
            React, Node.js, and cloud computing.
          </p>
        </div>
      </div>
    </section>
        )
      }
      export default About;