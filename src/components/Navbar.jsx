import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { config } from '../config.js';

const links = [
  { id: 'about',    label: 'About' },
  { id: 'skills',   label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact',  label: 'Contact' },
];

export default function Navbar({ onResume, onCalc }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const pos = window.scrollY + 220;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(l.id); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const initial = config.name.charAt(0).toUpperCase();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-md' : 'bg-transparent py-4 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-extrabold text-blue-600 text-xl">
              {initial}
            </div>
          </div>
          <div>
            <div className="text-slate-900 font-bold text-base sm:text-lg leading-tight flex items-center gap-1.5">
              {config.name}
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            </div>
            <div className="text-slate-500 text-xs font-medium">Web Developer · Software Engineer</div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-sm">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => goto(l.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${active === l.id ? 'nav-active' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onCalc} className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center gap-1.5 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Estimator
          </button>
          <button onClick={onResume} className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all">
            Resume
          </button>
          <button onClick={() => goto('contact')} className="btn-shine text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
            Hire Me
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden glass-nav border-t border-slate-200 px-4 pt-4 pb-6 mt-2 space-y-1 shadow-lg">
          {links.map(l => (
            <button key={l.id} onClick={() => goto(l.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${active === l.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'}`}>
              {l.label}
            </button>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200">
            <button onClick={() => { setOpen(false); onCalc(); }} className="py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Estimator
            </button>
            <button onClick={() => { setOpen(false); onResume(); }} className="py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md">
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
