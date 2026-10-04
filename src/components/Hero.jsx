import { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { config } from '../config.js';

const statItems = [
  { val: 'NFC IET',   label: 'University',    sub: 'BS Software Engineering' },
  { val: 'Corvit',    label: 'Certification', sub: 'Web Development' },
  { val: 'PHP & SQL', label: 'Core Stack',    sub: 'Full-Stack Engineering' },
  { val: 'On-Time',   label: 'Delivery',      sub: 'Clean & High Performance' },
];

export default function Hero({ onCalc }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(config.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Soft gradient background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-400/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/6 w-[350px] h-[350px] bg-indigo-400/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/6 w-[300px] h-[300px] bg-teal-400/15 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="fade-up flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-blue-200 text-blue-700 text-xs sm:text-sm font-bold mb-7 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
            </span>
            <span className="text-slate-800 font-medium">{config.subtitle}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
            Building Fast, Responsive Web Apps with{' '}
            <span className="grad-text">Clean Code & Custom Backends</span>
          </h1>

          {/* Bio */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-3xl font-medium">
            {config.bio}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl">
            {config.stack.map((t, i) => (
              <span key={i} className="pill cursor-default px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-14 w-full">
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and I have a project to discuss.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-shine w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 group"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp Me Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button onClick={onCalc}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 text-blue-700 font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95">
              <Sparkles className="w-5 h-5 text-blue-600" /> Project Estimator
            </button>

            <button onClick={copyEmail}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white/90 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 active:scale-95">
              {copied
                ? <><Check className="w-4 h-4 text-emerald-600" /><span className="text-emerald-700 font-bold">Copied!</span></>
                : <><Copy className="w-4 h-4 text-slate-500" /> Copy Email</>
              }
            </button>
          </div>

          {/* Stats Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 p-4 glass rounded-3xl border border-slate-200">
            {statItems.map((s, i) => (
              <div key={i} className="hover-lift p-4 rounded-2xl text-center bg-white/80 border border-slate-100 shadow-xs">
                <div className="text-xl sm:text-2xl font-extrabold grad-text mb-0.5">{s.val}</div>
                <div className="text-xs font-bold text-slate-800">{s.label}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
