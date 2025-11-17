import "./Accolades.css";
function Accolades() {
  const accolades = [
    {
      title: "Portfolio Website",
      text: "A personal website built with React and Vite to showcase my IT skills, coding projects, and professional background.",
    },
    {
      title: "C# Mines Simulator",
      text: "A C# application that replicates the famous high-stakes game Mines, featuring a money system, adjustable mine counts, and save functionality.",
    },
    {
      title: "MacEwan Group Project Lead",
      text: "Led my team through planning, documentation, and implementation of a mock IT system, producing professional-level deliverables.",
    },
    {
      title: "Technical Support Recognition",
      text: "Recognized for outstanding problem solving, patience, and technical clarity while assisting peers and clients.",
    },
  ];

  return (
    <section id="accolades" className="accolades-section">
      <h2>Accolades and Testimonials</h2>
      <p>Hear what colleagues, clients, and team leads have to say about my work.</p>

      <div className="accolades-grid">
        {accolades.map((item, index) => (
          <div key={index} className="accolade-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accolades;