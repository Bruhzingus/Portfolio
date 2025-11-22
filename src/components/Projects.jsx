import './Projects.css';
import minesProject from '../assets/mines.jpg';
import fitnessProject from '../assets/fitness.jpg';
function Projects () {
    return (
    <section id="projects">
        <h2>Projects</h2>
        <p>Take a look at some of my recent projects!</p>
        <div className="project">
          <h3>Brezina Strength Academy</h3>
          <img src={fitnessProject} alt="Fitness Project Image" className="fitness-pic" />
          <p>
            A personal coaching website built using Wix and Figma to showcase UI/UX design with a focus on accessibility.
            I developed prototyping skills and demonstrated live usability testing with my website in front of a live audience.
          </p>
        </div>
        <div className="project">
          <h3>C# Mines Sumulator</h3>
          <img src={minesProject} alt="Mines Project Image" className="mines-pic" />
          <p>
             A C# application that can replicate the famous high stakes game, Mines. 
            It features a money system, adjustable mine values, and accurate risk vs reward scalability. 
          </p>
        </div>
      </section>
    )
}
export default Projects; 