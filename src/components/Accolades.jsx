import "./Accolades.css";
function Accolades() {
  const accolades = [
    {
      title: "Cody, BARCO Tech",
      text: (
      <> 
        Randall is such an <span className='highlight1'>amazing teammate</span>, he is always a plasure to 
      work with and very reliable. <span className='highlight1'>100% would recommend</span>
      </>
           )
    },
    {
      title: "Brock, Lethbridge Polytechnic Student",
      text: (
      <> 
        Randall provided <span className='highlight2'>excellent guidance</span> throughout my PC build. 
        He helped me select the right components, <span className='highlight2'> troubleshoot issues</span>, 
        and ensured everything ran perfectly.
      </>
           )
    },
    {
      title: "Placeholder Testimonial",
      text: `"Randall may be the greatest to ever do it, and not to glaze, but possibly even above Lebron"`,
    },
    {
      title: "Placeholder Testimonial",
      text: `"Randall may be the greatest to ever do it, and not to glaze, but possibly even above Lebron"`,
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