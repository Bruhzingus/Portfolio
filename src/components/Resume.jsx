import "./Resume.css";
import resumePDF from "/Resume.pdf";
function Resume() {
  return (
    <section className="resume-section" id ="resume">
      <h2>My Resume</h2>

      <div className="resume-actions">
        <a 
          href={resumePDF}
          target="_blank" 
          rel="noopener noreferrer"
          className="resume-btn"
        >
          View Full Screen
        </a>

        <a 
          href={resumePDF}
          download="Randall-Brezina-Resume.pdf"
          className="resume-btn download"
        >
          Download as PDF
        </a>
      </div>
    </section>
  );
}

export default Resume;