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
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main className="wrap" id="main-content">
        <Masthead />
        <Viewer
          id="builds"
          title="PC Builds"
          description="Client builds, my own PC, and a custom keyboard."
          items={HARDWARE}
        />
        <QuoteCTA />
        <Viewer
          id="software"
          title="Software Projects"
          description="A sales dashboard, a shift logging app, and a coaching website."
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
