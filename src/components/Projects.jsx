import './Projects.css';
import minesProject from '../assets/mines.jpg';
function Projects () {
    return (
    <section id="projects">
        <h2>Projects</h2>
        <p>Take a look at some of my recent projects!</p>
        <div className="project">
          <h3>Portfolio Website</h3>
          <p>
            A personal website built with React and Vite to showcase my IT skills,
            coding projects, and professional background. Fully utilizes the file storage and web hosting
             features of GitHub. 
          </p>
        </div>
        <div className="project">
          <h3>C# Mines Sumulator</h3>
          <img src={minesProject} alt="Mines Project Image" className="mines-pic" />
          <p>
             A C# application that can replicate the famous high stakes game, Mines. 
            It features a money system, adjustable mine values, and an option to save progress. 
          </p>
        </div>
      </section>
    )
}
export default Projects;