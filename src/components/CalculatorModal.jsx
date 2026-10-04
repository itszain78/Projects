import { useState } from 'react';
import { X, Check, MessageSquare } from 'lucide-react';
import { config } from '../config.js';

export default function CalculatorModal({ onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div
        className="bg-white border border-slate-200 max-w-xl w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl"
        style={{ animation: 'fadeIn .25s ease' }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Interactive Pricing</div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Calculate Project Estimate</h3>

        {/* Project Scope */}
        <div className="mb-5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">1. Select Project Scope</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {config.pricing.map(p => (
              <button key={p.id} onClick={() => setSelType(p.id)}
                className={`p-4 rounded-2xl text-left border transition-all active:scale-[0.98] ${selType === p.id ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                <div className="font-bold text-xs sm:text-sm mb-0.5">{p.label}</div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Base ${p.base}</span>
                  <span className="text-blue-700 font-bold">{p.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-7">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">2. Optional Add-Ons</label>
          <div className="space-y-2">
            {config.addons.map(a => {
              const on = selAddons.includes(a.id);
              return (
                <button key={a.id} onClick={() => toggle(a.id)}
                  className={`w-full p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all active:scale-[0.99] ${on ? 'bg-blue-50/80 border-blue-400 text-blue-950' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                  <span className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-md border flex items-center justify-center text-white shrink-0 ${on ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                      {on && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    {a.label}
                  </span>
                  <span className="text-blue-700 font-bold ml-2 shrink-0">+${a.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Total & CTA */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="text-xs text-slate-500 font-medium mb-0.5">Total Estimate</div>
            <div className="text-3xl font-extrabold grad-text">${total}</div>
            <div className="text-xs text-slate-500 mt-0.5 font-medium">Delivery: {curr.time}</div>
          </div>
          <a href={waMsg()} target="_blank" rel="noopener noreferrer"
            className="btn-shine w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all">
            <MessageSquare className="w-4 h-4" /> Send to WhatsApp
          </a>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}
