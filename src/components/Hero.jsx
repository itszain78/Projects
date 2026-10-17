import { useState, useRef, memo } from 'react';
import { ArrowRight, MessageSquare, Copy, Check, Sparkles, ChevronDown } from 'lucide-react';
import { config } from '../config.js';
import { useTypewriter } from '../hooks.js';

const statItems = [
  { val: 'NFC IET',   label: 'University',    sub: 'BS Software Engineering' },
  { val: 'Corvit',    label: 'Certification', sub: 'Web Development' },
  { val: 'PHP & SQL', label: 'Core Stack',    sub: 'Full-Stack Engineering' },
  { val: 'On-Time',   label: 'Delivery',      sub: 'Clean & High Performance' },
];

const roles = ['Clean Code', 'Custom PHP Backends', 'MySQL Databases', 'Responsive Interfaces', 'Fast Web Apps'];

function Typed() {
  const text = useTypewriter(roles);
  return <span className="grad-text caret inline-block min-h-[1.15em]" aria-hidden="true">{text}</span>;
}
const TypedMemo = memo(Typed);

export default function Hero({ onCalc }) {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef(null);

  const copyEmail = () => {
    navigator.clipboard?.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // parallax: the orbs / floating chips drift against the cursor
  const raf = useRef(0);
  const onMove = (e) => {
    const el = heroRef.current;
    if (!el || raf.current) return;
    const { clientX, clientY } = e;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', ((clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--py', ((clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  };

  const floaters = [
    { t: 'PHP 8',   cls: 'top-[18%] left-[6%]',    f: 'float-a', k: 38,  g: 'from-sky-200 to-sky-200' },
    { t: 'MySQL',   cls: 'top-[30%] right-[5%]',   f: 'float-b', k: -46, g: 'from-sky-200 to-sky-200' },
    { t: 'JS ES6+', cls: 'bottom-[26%] left-[4%]', f: 'float-c', k: 30,  g: 'from-amber-200 to-sky-200' },
    { t: 'Tailwind',cls: 'bottom-[20%] right-[7%]',f: 'float-a', k: -34, g: 'from-sky-200 to-sky-200' },
  ];

  return (
    <section id="hero" ref={heroRef} onPointerMove={onMove} className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
      {/* Parallax gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[12%] left-[14%] w-[420px] h-[420px] rounded-full"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(147, 212, 253,0.5) 0%, rgba(147, 212, 253,0) 68%)', transform: 'translate3d(calc(var(--px,0)*-60px), calc(var(--py,0)*-60px), 0)' }} />
        <div className="absolute bottom-[10%] right-[12%] w-[460px] h-[460px] rounded-full"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(94, 180, 234,0.4) 0%, rgba(94, 180, 234,0) 68%)', transform: 'translate3d(calc(var(--px,0)*70px), calc(var(--py,0)*50px), 0)' }} />
      </div>

      {/* Floating tech chips (desktop) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none" aria-hidden="true">
        {floaters.map((f, i) => (
          <div key={i} className={`absolute ${f.cls}`} style={{ transform: `translate3d(calc(var(--px,0)*${f.k}px), calc(var(--py,0)*${f.k}px), 0)`, transition: 'transform .3s ease-out' }}>
            <div className={`${f.f} px-4 py-2.5 rounded-2xl bg-gradient-to-br ${f.g} border border-white font-mono text-xs font-bold text-sky-900 shadow-lg shadow-sky-300/40`}>
              {f.t}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Status badge */}
          <div className="fade-up badge !normal-case !tracking-normal !text-xs sm:!text-sm mb-7 !py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[var(--text)] font-semibold">{config.subtitle}</span>
          </div>

          {/* Headline with typewriter */}
          <h1 className="fade-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6" style={{ '--d': '100ms' }}>
            <span className="text-[var(--text)]">Building fast web apps with</span>
            <br />
            <span className="sr-only">Clean code and custom backends</span>
            <TypedMemo />
          </h1>

          <p className="fade-up text-[var(--text-soft)] text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-3xl font-medium" style={{ '--d': '200ms' }}>
            {config.bio}
          </p>

          {/* Stack pills */}
          <div className="fade-up flex flex-wrap justify-center gap-2 mb-10 max-w-3xl" style={{ '--d': '300ms' }}>
            {config.stack.map((t, i) => (
              <span key={i} className="chip cursor-default px-3.5 py-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundImage: 'var(--grad-sunset)' }} /> {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-16 w-full" style={{ '--d': '400ms' }}>
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and I have a project to discuss.')}`}
              target="_blank" rel="noopener noreferrer" data-magnetic
              className="btn btn-whatsapp w-full sm:w-auto px-7 py-4 text-sm group"
            >
              <MessageSquare className="w-5 h-5" /> WhatsApp Me Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
            <button onClick={onCalc} data-magnetic className="btn btn-primary w-full sm:w-auto px-7 py-4 text-sm">
              <Sparkles className="w-5 h-5" /> Project Estimator
            </button>
            <button onClick={copyEmail} data-magnetic className="btn btn-ghost w-full sm:w-auto px-5 py-4 text-sm">
              {copied
                ? <span className="pop flex items-center gap-2 text-emerald-700"><Check className="w-4 h-4" /> Copied!</span>
                : <><Copy className="w-4 h-4 text-[var(--text-muted)]" /> Copy Email</>}
            </button>
          </div>

          {/* Stats */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
            {statItems.map((s, i) => (
              <div key={i} className="fade-up" style={{ '--d': `${500 + i * 90}ms` }}>
                <div data-tilt="8" className="card spot p-5 text-center h-full">
                  <span className="spot-glow" />
                  <div className="font-display text-xl sm:text-2xl font-extrabold grad-text mb-1">{s.val}</div>
                  <div className="text-xs font-bold text-[var(--text)]">{s.label}</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" aria-label="Scroll down">
        <span className="relative block w-6 h-10 rounded-full border border-sky-500/15 scroll-cue" />
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
