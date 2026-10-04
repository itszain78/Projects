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

export default function Footer() {
  const initial = config.name.charAt(0).toUpperCase();

  return (
    <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-md pt-14 pb-10 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-200">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-extrabold text-blue-600 text-xl">
                  {initial}
                </div>
              </div>
              <span className="text-xl font-bold text-slate-900">{config.name}</span>
            </div>
            <p className="text-slate-600 text-sm max-w-sm leading-relaxed mb-5 font-medium">
              Full-Stack Web Developer & BS Software Engineering student at NFC IET Multan. Building fast, responsive web applications using PHP, SQL, JavaScript, and clean architecture.
            </p>
            <div className="text-xs text-blue-700 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Certified by Corvit Systems Multan
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              {navLinks.map(l => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-slate-600 hover:text-blue-600 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Connect</h4>
            <p className="text-xs text-slate-600 font-medium mb-1 truncate">{config.email}</p>
            <p className="text-xs text-slate-600 font-medium mb-1">{config.phoneDisplay}</p>
            <p className="text-xs text-slate-500 mb-5">{config.location}</p>

            {/* Social Icons — WhatsApp first and prominent */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${config.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all shadow-xs"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>

              {config.github && (
                <a
                  href={config.github}
                  target="_blank" rel="noopener noreferrer"
                  title="GitHub Profile"
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all shadow-xs"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <div className="text-slate-600">
            © {new Date().getFullYear()} <span className="text-slate-900 font-bold">{config.name}</span>. All rights reserved.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold transition-all shadow-2xs"
          >
            Back to top <ArrowUp className="w-4 h-4 text-slate-500" />
          </button>
        </div>

      </div>
    </footer>
  );
}
