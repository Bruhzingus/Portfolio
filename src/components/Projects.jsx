import './Projects.css';
import minesProject from '../assets/mines.jpg';
import fitnessProject from '../assets/fitness.jpg';
import websiteGif from "../assets/website.mp4";
import minesGif from "../assets/mines.mp4";
function Projects () {
    return (
    <section id="projects">
        <h2>Projects</h2>
        <p>Take a look at some of my recent projects!</p>
        <div className="project">
          <h3>Brezina Strength Academy</h3>
          <video src={websiteGif} autoPlay loop muted playsInline className="fitness-gif"/>
          <p>
            A personal coaching website built using Wix and Figma to showcase UI/UX design with a focus on accessibility.
            I developed prototyping skills and demonstrated live usability testing with my website in front of a live audience.
          </p>
        </div>
        <div className="project">
          <h3>C# Mines Sumulator</h3>
          <video src={minesGif} autoPlay loop muted playsInline className="mines-gif"/>
          <p>
             A C# application that can replicate the famous high stakes game, Mines. 
            It features a money system, adjustable mine values, and accurate risk vs reward scalability. 
          </p>
        </div>
      </section>
    )
}
export default Projects; 