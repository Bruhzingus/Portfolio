import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Masthead from '../components/Masthead';
import Viewer from '../components/Viewer';
import QuoteCTA from '../components/QuoteCTA';
import Testimonials from '../components/Testimonials';
import { HARDWARE, SOFTWARE } from '../data/data';

export default function Portfolio() {
  return (
    <div className="kit-root">
      <Navbar />
      <main className="wrap">
        <Masthead />
        <Viewer
          id="builds"
          kicker="Hardware · Custom builds & peripherals"
          title="PC Builds"
          items={HARDWARE}
        />
        <QuoteCTA />
        <Viewer
          id="software"
          kicker="Software · Web & desktop"
          title="Software Projects"
          items={SOFTWARE}
        />
        <Testimonials />
      </main>
      <div className="wrap">
        <Footer />
      </div>
    </div>
  );
}
