import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ResumeModal from './components/ResumeModal.jsx';
import CalculatorModal from './components/CalculatorModal.jsx';
import { WhatsappIcon } from './Icons.jsx';
import { config } from './config.js';
import { useAutoFadeUp } from './hooks.js';

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [showCalc, setShowCalc] = useState(false);

  // Auto initialize scroll animations for all sections
  useAutoFadeUp();

  return (
    <div className="min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar onResume={() => setShowResume(true)} onCalc={() => setShowCalc(true)} />

      <main>
        <Hero onCalc={() => setShowCalc(true)} onResume={() => setShowResume(true)} />
        <About />
        <Skills />
        <Services onCalc={() => setShowCalc(true)} />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and I have a project to discuss.')}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="wa-float"
        aria-label="WhatsApp"
      >
        <WhatsappIcon className="w-7 h-7 text-white" />
      </a>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
      {showCalc && <CalculatorModal onClose={() => setShowCalc(false)} />}
    </div>
  );
}
