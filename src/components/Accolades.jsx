import "./Accolades.css";
function Accolades() {
  const accolades = [
    {
      title: "Cody, BARCO Tech",
      text: `"Randall is such an amazing teammate, he is always a plasure to 
      work with and very reliable. 100% would recommend"`,
    },
    {
      title: "C# Mines Simulator",
      text: `"A C# application that replicates the famous high-stakes game Mines, 
      featuring a money system, adjustable mine counts, and save functionality."`,
    },
    {
      title: "BARCO Tech Documentation Lead",
      text: "Led my team through planning, documentation, and implementation of a mock IT system, producing professional-level deliverables.",
    },
    {
      title: "Technical Support Recognition",
      text: "Recognized for outstanding problem solving, patience, and technical clarity while assisting peers and clients.",
    },
  ];

  return (
    <section id="accolades" className="accolades-section">
      <h2>Testimonials</h2>
      <p>Hear what colleagues, clients, and teams have to say about my work.</p>

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