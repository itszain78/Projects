import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
const ResumeModal = lazy(() => import('./components/ResumeModal.jsx'));
const CalculatorModal = lazy(() => import('./components/CalculatorModal.jsx'));
import { WhatsappIcon } from './Icons.jsx';
import { config } from './config.js';
import { usePath } from './router.jsx';
import { useAutoFadeUp, useGlobalFx, useEstimatorState } from './hooks.js';

const BASE_TITLE = typeof document !== 'undefined' ? document.title : '';

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const est = useEstimatorState(config); // shared by the inline estimator and the modal

  const path = usePath();

  useEffect(() => {
    const names = { '/': '', '/about': 'About', '/skills': 'Skills', '/services': 'Services', '/projects': 'Projects', '/contact': 'Contact' };
    document.title = names[path] ? `${names[path]} | ${config.name}` : BASE_TITLE;
  }, [path]);

  useAutoFadeUp();   // scroll reveal for every .fade-up
  useGlobalFx();     // spotlight, 3D tilt, magnetic buttons, scroll progress

  return (
    <div className="min-h-screen relative selection:bg-sky-500/40 selection:text-white">
      {/* Fixed gradient atmosphere */}
      <div className="grid-fade" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar onResume={() => setShowResume(true)} onCalc={() => setShowCalc(true)} />

        <main>
          {path === '/' && (
            <>
              <Hero onCalc={() => setShowCalc(true)} onResume={() => setShowResume(true)} />
              <About />
              <Skills />
              <Services est={est} onCalc={() => setShowCalc(true)} />
              <Projects />
              <Contact />
            </>
          )}
          {path === '/about' && <div className="pt-16"><About /></div>}
          {path === '/skills' && <div className="pt-16"><Skills /></div>}
          {path === '/services' && <div className="pt-16"><Services est={est} onCalc={() => setShowCalc(true)} /></div>}
          {path === '/projects' && <div className="pt-16"><Projects /></div>}
          {path === '/contact' && <div className="pt-16"><Contact /></div>}
        </main>

        <Footer />
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and I have a project to discuss.')}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="wa-float"
        aria-label="WhatsApp"
      >
        <WhatsappIcon className="w-7 h-7 text-emerald-900" />
      </a>

      <Suspense fallback={null}>
        {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
        {showCalc && <CalculatorModal est={est} onClose={() => setShowCalc(false)} />}
      </Suspense>
    </div>
  );
}
