import { useState } from 'react';
import { Code2, Palette, Database, Wand2, CheckCircle2, ArrowRight, MessageSquare, Sparkles, Clock, Check } from 'lucide-react';
import { config } from '../config.js';

const iconMap = { code: Code2, palette: Palette, database: Database, wand: Wand2 };

export default function Services({ onCalc }) {
  const [selType, setSelType] = useState(config.pricing[0].id);
  const [selAddons, setSelAddons] = useState([]);

  const curr = config.pricing.find(p => p.id === selType) || config.pricing[0];
  const total = curr.base + selAddons.reduce((s, id) => s + (config.addons.find(a => a.id === id)?.price || 0), 0);

  const toggle = (id) => setSelAddons(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const waMsg = () => {
    const adds = selAddons.map(id => config.addons.find(a => a.id === id)?.label).filter(Boolean).join(', ');
    return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hi Zain!\nI used your project calculator:\n- Type: ${curr.label}\n- Time: ${curr.time}\n- Add-ons: ${adds || 'None'}\n- Estimate: $${total}\n\nLet's discuss!`)}`;
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="fade-up text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Web Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">What I Build for Clients</h2>
          <div className="section-divider" />
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-medium">From custom PHP/MySQL backends to responsive modern frontends — tailored for your business.</p>
        </div>

        {/* Service cards */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {config.services.map(s => {
            const Icon = iconMap[s.icon] || Code2;
            return (
              <div key={s.id} className="hover-lift glass p-6 sm:p-8 flex flex-col justify-between group rounded-3xl">
                <div>
                  <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">{s.badge}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.points.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Custom Built</span>
                  <button onClick={onCalc} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Get Estimate <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Estimator */}
        <div className="fade-up glass border border-blue-200 p-6 sm:p-10 rounded-3xl shadow-lg">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="flex-1">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Interactive Pricing Tool</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">Get Instant Project Estimate</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                Transparent pricing with clear turnaround timelines. Select your scope, pick optional add-ons, and send your quote straight to WhatsApp.
              </p>
              <button onClick={onCalc} className="btn-shine px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md">
                Open Full Estimator
              </button>
            </div>

            {/* Mini estimator widget */}
            <div className="w-full lg:w-96 bg-white/95 border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-3">
                <span>Select Scope</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="space-y-2 mb-4">
                {config.pricing.map(p => (
                  <button key={p.id} onClick={() => setSelType(p.id)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all flex justify-between items-center active:scale-[0.98] ${selType === p.id ? 'bg-blue-50 border border-blue-300 text-blue-700 shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'}`}>
                    <span>{p.label}</span>
                    <span className="text-slate-500 font-normal">${p.base}+</span>
                  </button>
                ))}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase mb-2">Add-ons</div>
              <div className="space-y-1.5 mb-4">
                {config.addons.map(a => {
                  const checked = selAddons.includes(a.id);
                  return (
                    <button key={a.id} onClick={() => toggle(a.id)}
                      className={`w-full p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all ${checked ? 'bg-blue-50/80 border border-blue-300 text-blue-900' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}>
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-white ${checked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                          {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        {a.label}
                      </span>
                      <span className="text-blue-700 font-bold">+${a.price}</span>
                    </button>
                  );
                })}
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center mb-3">
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Estimated Cost</div>
                  <div className="text-2xl font-extrabold grad-text">${total}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 font-medium">Delivery</div>
                  <div className="text-xs font-bold text-slate-800">{curr.time}</div>
                </div>
              </div>
              <a href={waMsg()} target="_blank" rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
                <MessageSquare className="w-4 h-4" /> Send Quote to WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
