import "./Resume.css";
import resumePDF from "/Resume.pdf";
import Reveal from "./Reveal";
function Resume() {
  return (
    <Reveal as="section" id="resume" className="resume-section">
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
    </Reveal>
  );
}

export default Resume;
