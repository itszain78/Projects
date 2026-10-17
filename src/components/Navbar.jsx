import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const navRef = useRef(null);
  const btnRefs = useRef({});
  const [ind, setInd] = useState({ x: 0, w: 0, show: false });

  useEffect(() => {
    let tops = [];
    const measure = () => {
      tops = links.map((l) => {
        const el = document.getElementById(l.id);
        return el ? { id: l.id, top: el.offsetTop, bottom: el.offsetTop + el.offsetHeight } : null;
      }).filter(Boolean);
    };
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
      const pos = window.scrollY + 220;
      const hit = tops.find((t) => pos >= t.top && pos < t.bottom);
      setActive(hit ? hit.id : '');
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    measure(); update();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure); };
  }, []);

  // sliding gradient indicator follows the active link
  useLayoutEffect(() => {
    const move = () => {
      const b = btnRefs.current[active];
      const nav = navRef.current;
      if (!b || !nav) { setInd((p) => ({ ...p, show: false })); return; }
      setInd({ x: b.offsetLeft, w: b.offsetWidth, show: true });
    };
    move();
    window.addEventListener('resize', move);
    return () => window.removeEventListener('resize', move);
  }, [active]);

  const goto = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const initial = config.name.charAt(0).toUpperCase();

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-2.5' : 'bg-transparent py-4 sm:py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group text-left" aria-label="Back to top">
          <div className="w-10 h-10 rounded-xl p-[2px] shadow-lg shadow-sky-300/50 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: 'var(--grad-sunset)' }}>
            <div className="w-full h-full rounded-[10px] flex items-center justify-center font-display font-extrabold text-xl text-[var(--text)]" style={{ background: '#ffffff' }}>
              <span className="grad-text">{initial}</span>
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-base sm:text-lg leading-tight flex items-center gap-1.5 text-[var(--text)]">
              {config.name}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
            </div>
            <div className="text-[var(--text-muted)] text-xs font-medium">Web Developer · Software Engineer</div>
          </div>
        </button>

        {/* Desktop Navigation with sliding indicator */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1 nav-pill px-2 py-1.5 rounded-full relative" aria-label="Primary">
          <span className="nav-indicator" style={{ width: ind.w, transform: `translateX(${ind.x}px)`, opacity: ind.show ? 1 : 0 }} />
          {links.map((l) => (
            <button
              key={l.id}
              ref={(el) => (btnRefs.current[l.id] = el)}
              onClick={() => goto(l.id)}
              className={`relative z-10 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 ${active === l.id ? 'text-[var(--text)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <button onClick={onCalc} data-magnetic className="btn btn-ghost text-xs px-3.5 py-2">
            <Zap className="w-3.5 h-3.5 text-amber-700" /> Estimator
          </button>
          <button onClick={onResume} data-magnetic className="btn btn-ghost text-xs px-4 py-2">Resume</button>
          <button onClick={() => goto('contact')} data-magnetic className="btn btn-primary text-xs px-5 py-2.5">Hire Me</button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} className="lg:hidden btn btn-ghost p-2.5" aria-label="Toggle menu" aria-expanded={open}>
          <span className="relative w-5 h-5 block">
            <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${open ? 'opacity-0 rotate-90 scale-50' : 'opacity-100'}`} />
            <X className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 -rotate-90 scale-50'}`} />
          </span>
        </button>
      </div>

      {/* Mobile Drawer (animated) */}
      <div inert={!open} className={`lg:hidden grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="glass-nav px-4 pt-4 pb-6 mt-2 space-y-1">
            {links.map((l, i) => (
              <button key={l.id} onClick={() => goto(l.id)}
                style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'} ${active === l.id ? 'text-[var(--text)] bg-gradient-to-r from-sky-200 to-sky-200 border border-sky-300/40' : 'text-[var(--text-soft)] hover:bg-sky-500/10'}`}>
                {l.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-sky-500/15">
              <button onClick={() => { setOpen(false); onCalc(); }} className="btn btn-ghost py-2.5 text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-700" /> Estimator
              </button>
              <button onClick={() => { setOpen(false); onResume(); }} className="btn btn-primary py-2.5 text-xs">Resume</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
