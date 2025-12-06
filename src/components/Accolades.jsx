import "./Accolades.css";
function Accolades() {
  const accolades = [
    {
      title: "Cody, BARCO Tech",
      text: (
      <> 
        "Randall is such an <span className='highlight1'>amazing teammate</span>, he is always a plasure to 
      work with and very reliable. <span className='highlight1'>100% would recommend</span>"
      </>
           )
    },
    {
      title: "Brock, Lethbridge Polytechnic Student",
      text: (
      <> 
        "Randall provided <span className='highlight2'>excellent guidance</span> throughout my PC build. 
        He helped me select the right components, <span className='highlight2'> troubleshoot issues</span>, 
        and ensured everything ran perfectly.""
      </>
           )
    },
    {
      title: "Jeremy, Steve's Urethane",
       text: (
      <> 
        “Randall picked up the job quickly despite having <span className='highlight3'>zero prior experience.</span>
         He adapted fast, learned everything hands-on, and had <span className='highlight3'>incredible attention to detail.</span>
         Anyone would be lucky to work with him.”
      </>
           )
    },
    {
      title: "Timothy, Polytechnic Professor",
      text: ``, text: (
      <> 
        "It was a pleasure to have Randall in my Systems Analysis and Design class.
      He was consistently among the <span className='highlight4'>top performers,</span> 
      and always the best dressed for the presentations. The quality of work that he 
      produced was <span className='highlight4'>above the industry standard</span> and I have high expectations of what 
      he'll continue to do after finishing his studies."
      </>
           )
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
