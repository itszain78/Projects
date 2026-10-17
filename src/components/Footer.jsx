import { ArrowUp, Sparkles } from 'lucide-react';
import { GithubIcon, WhatsappIcon } from '../Icons.jsx';
import { config } from '../config.js';

const navLinks = [
  { id: 'about',    label: 'About & Education' },
  { id: 'skills',   label: 'Technical Skills' },
  { id: 'services', label: 'Services & Estimator' },
  { id: 'projects', label: 'Portfolio Projects' },
  { id: 'contact',  label: 'Contact' },
];

const marquee = ['PHP 8+', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs', 'Git', 'cPanel', 'Responsive Design'];

export default function Footer() {
  const initial = config.name.charAt(0).toUpperCase();

  return (
    <footer className="relative pt-14 pb-10 text-sm overflow-hidden" style={{ backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255,0) 0%, rgba(243, 250, 255,0.85) 35%, #e9f6fe 100%)' }}>
      {/* animated gradient top line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ backgroundImage: 'linear-gradient(90deg, transparent, #a5dbfc, #a8daf9, #fcd34d, transparent)' }} />

      {/* Tech marquee */}
      <div className="overflow-hidden mb-14 -mx-0 border-y border-sky-500/10 py-4" style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
        <div className="marquee gap-3">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="mx-4 font-display font-bold text-lg sm:text-2xl whitespace-nowrap text-sky-900/25 hover:text-[var(--text)] transition-colors cursor-default">{m}<span className="mx-6 text-sky-400/60">✦</span></span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-sky-500/15">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl p-[2px] group-hover:rotate-[-8deg] transition-transform duration-500" style={{ backgroundImage: 'var(--grad-sunset)' }}>
                <div className="w-full h-full rounded-[10px] flex items-center justify-center font-display font-extrabold text-xl" style={{ background: '#ffffff' }}>
                  <span className="grad-text">{initial}</span>
                </div>
              </div>
              <span className="text-xl font-display font-bold text-[var(--text)]">{config.name}</span>
            </div>
            <p className="text-[var(--text-soft)] text-sm max-w-sm leading-relaxed mb-5 font-medium">
              Full-Stack Web Developer & BS Software Engineering student at NFC IET Multan. Building fast, responsive web applications using PHP, SQL, JavaScript, and clean architecture.
            </p>
            <div className="text-xs font-bold flex items-center gap-2 text-sky-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Certified by Corvit Systems Multan
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-4 font-sans">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-[var(--text-soft)] hover:text-[var(--text)] inline-flex items-center gap-2 group transition-colors">
                    <span className="h-px w-0 group-hover:w-4 transition-all duration-300" style={{ backgroundImage: 'var(--grad-sunset)' }} />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-4 font-sans">Connect</h4>
            <p className="text-xs text-[var(--text-soft)] font-medium mb-1 truncate">{config.email}</p>
            <p className="text-xs text-[var(--text-soft)] font-medium mb-1">{config.phoneDisplay}</p>
            <p className="text-xs text-[var(--text-muted)] mb-5">{config.location}</p>
            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" aria-label="WhatsApp"
                className="chip p-2.5 !text-sky-700 hover:!border-sky-400/70"><WhatsappIcon className="w-4 h-4" /></a>
              {config.github && (
                <a href={config.github} target="_blank" rel="noopener noreferrer" title="GitHub Profile" aria-label="GitHub" className="chip p-2.5"><GithubIcon className="w-4 h-4" /></a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="text-[var(--text-soft)]">
            © {new Date().getFullYear()} <span className="text-[var(--text)] font-bold">{config.name}</span>. All rights reserved.
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} data-magnetic className="btn btn-ghost px-4 py-2 text-xs group">
            Back to top <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
