import { Code2, Palette, Database, Wand2, CheckCircle2, ArrowRight, Sparkles, Calculator, Maximize2 } from 'lucide-react';
import { config } from '../config.js';
import SectionHeader from './SectionHeader.jsx';
import Estimator from './Estimator.jsx';

const iconMap = { code: Code2, palette: Palette, database: Database, wand: Wand2 };
const grads = ['var(--grad-primary)', 'var(--grad-sunset)', 'var(--grad-cool)', 'var(--grad-warm)'];

export default function Services({ est, onCalc }) {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader icon={Sparkles} badge="Web Services" title="What I Build" accent="for Clients"
          text="From custom PHP/MySQL backends to responsive modern frontends — tailored for your business." />

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {config.services.map((s, idx) => {
            const Icon = iconMap[s.icon] || Code2;
            return (
              <div key={s.id} className="fade-up" style={{ '--d': `${(idx % 2) * 120}ms` }}>
                <div data-tilt="4" className="card spot group p-6 sm:p-8 h-full flex flex-col justify-between">
                  <span className="spot-glow" />
                  <div>
                    <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: grads[idx % grads.length] }}>
                        <Icon className="w-6 h-6 text-[var(--text)]" />
                      </div>
                      <span className="badge !text-[10px]">{s.badge}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] mb-2">{s.title}</h3>
                    <p className="text-[var(--text-soft)] text-xs sm:text-sm leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2.5 mb-6">
                      {s.points.map((p, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-soft)] font-medium transition-transform duration-300 hover:translate-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-sky-500/15 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)] font-medium">Custom Built</span>
                    <button onClick={onCalc} className="text-xs font-bold text-sky-700 hover:text-[var(--text)] flex items-center gap-1.5 group/btn transition-colors">
                      Get Estimate <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Estimator */}
        <div id="estimator" className="fade-up">
          <div className="card p-6 sm:p-10 relative">
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(125, 202, 250,0.38) 0%, rgba(94, 180, 234,0.16) 45%, rgba(255, 255, 255,0) 70%)' }} />
            </div>
            <div className="relative flex flex-wrap items-end justify-between gap-4 mb-8">
              <div className="max-w-xl">
                <div className="badge mb-4"><Calculator className="w-4 h-4 text-sky-700" /> Interactive Pricing Tool</div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">Get an <span className="grad-text">instant estimate</span></h3>
                <p className="text-[var(--text-soft)] text-xs sm:text-sm leading-relaxed font-medium">
                  Pick a project type, add the extras you need, and watch your quote update live. Send it straight to WhatsApp or email.
                </p>
              </div>
              <button onClick={onCalc} data-magnetic className="btn btn-ghost px-5 py-3 text-xs">
                <Maximize2 className="w-4 h-4" /> Open full-screen
              </button>
            </div>
            <div className="relative">
              <Estimator est={est} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
