import { useState } from 'react';
import {
  Check, MessageSquare, Mail, Copy, RotateCcw, Clock, Database, LayoutDashboard,
  Smartphone, Gauge, Wand2, Rocket, Globe, Server, Layers, Sparkles,
} from 'lucide-react';
import { config } from '../config.js';
import { useAnimatedNumber } from '../hooks.js';

const scopeIcon = { landing: Rocket, business: Globe, app: Server, portal: Layers };
const addonIcon = { db: Database, admin: LayoutDashboard, resp: Smartphone, seo: Gauge };

// Suggested add-ons per scope (one-click "add suggested")
const SUGGESTED = {
  landing:  ['resp', 'seo'],
  business: ['resp', 'seo'],
  app:      ['db', 'admin'],
  portal:   ['db', 'admin', 'seo'],
};

/** Shared estimator — `est` comes from useEstimatorState so inline + modal stay in sync. */
export default function Estimator({ est, compact = false }) {
  const { scope, setScope, addons, setAddons, toggle, reset, curr, picked, total, maxTotal, quoteText } = est;
  const [copied, setCopied] = useState(false);

  const animTotal = useAnimatedNumber(total, 700, false);
  const pct = Math.max(8, Math.round((total / maxTotal) * 100));

  const suggested = (SUGGESTED[scope] || []).filter((id) => config.addons.some((a) => a.id === id));
  const missing = suggested.filter((id) => !addons.includes(id));

  const waHref = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(quoteText)}`;
  const mailHref = `mailto:${config.email}?subject=${encodeURIComponent(`Project quote — ${curr.label} ($${total})`)}&body=${encodeURIComponent(quoteText)}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(quoteText); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const changed = scope !== config.pricing[0].id || addons.length > 0;

  return (
    <div className={`grid gap-6 ${compact ? 'grid-cols-1' : 'lg:grid-cols-[1.15fr_0.85fr]'} items-start`}>
      {/* ───────── Left: choices ───────── */}
      <div className="space-y-7">
        {/* Step 1 */}
        <div>
          <div className="flex items-center gap-3 mb-3.5">
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-[var(--text)]" style={{ backgroundImage: 'var(--grad-primary)' }}>1</span>
            <h4 className="text-sm font-bold text-[var(--text)] tracking-normal font-sans">Choose your project type</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Project type">
            {config.pricing.map((p) => {
              const Icon = scopeIcon[p.id] || Sparkles;
              const on = scope === p.id;
              return (
                <button key={p.id} role="radio" aria-checked={on} onClick={() => setScope(p.id)} className={`est-option ${on ? 'on' : ''}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundImage: on ? 'var(--grad-primary)' : 'linear-gradient(135deg, rgba(99, 187, 241,.12), rgba(72, 173, 236,.06))', transition: 'background .3s' }}>
                      <Icon className="w-5 h-5 text-[var(--text)]" />
                    </span>
                    <span className="est-radio" />
                  </div>
                  <div className="font-bold text-sm text-[var(--text)] mb-1">{p.label}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-soft)] font-semibold">from <b className="text-[var(--text)] font-extrabold">${p.base}</b></span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)] font-medium"><Clock className="w-3 h-3" /> {p.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-[var(--text)]" style={{ backgroundImage: 'var(--grad-primary)' }}>2</span>
              <h4 className="text-sm font-bold text-[var(--text)] tracking-normal font-sans">Add optional extras</h4>
            </div>
            {missing.length > 0 && (
              <button onClick={() => setAddons((p) => Array.from(new Set([...p, ...missing])))}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full text-amber-700 border border-amber-300/40 bg-amber-100 hover:bg-amber-400/20 transition-colors flex items-center gap-1.5">
                <Wand2 className="w-3 h-3" /> Add suggested for {curr.label}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.addons.map((a) => {
              const Icon = addonIcon[a.id] || Sparkles;
              const on = addons.includes(a.id);
              const rec = suggested.includes(a.id);
              return (
                <button key={a.id} role="checkbox" aria-checked={on} onClick={() => toggle(a.id)} className={`est-option !p-3.5 ${on ? 'on' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="est-check"><Check className="w-3.5 h-3.5 stroke-[3]" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-sky-700 shrink-0" />
                        <span className="text-xs font-bold text-[var(--text)] leading-snug">{a.label}</span>
                      </div>
                      {rec && !on && <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Suggested</span>}
                    </div>
                    <span className="font-display font-extrabold text-sm text-[var(--text)] shrink-0">+${a.price}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───────── Right: live quote ───────── */}
      <div className={`est-summary p-6 sm:p-7 relative ${compact ? '' : 'lg:sticky lg:top-28'}`}>
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none\" style={{ backgroundImage: 'radial-gradient(circle, rgba(125, 202, 250,0.38) 0%, rgba(94, 180, 234,0.16) 45%, rgba(255, 255, 255,0) 70%)' }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700">Your estimate</span>
            {changed && (
              <button onClick={reset} className="text-[11px] font-bold text-sky-700 hover:text-[var(--text)] flex items-center gap-1 transition-colors" aria-label="Reset estimator">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
          <div className="est-total text-5xl sm:text-6xl text-[var(--text)] flex items-start gap-1 mb-1">
            <span className="text-2xl sm:text-3xl mt-2 text-sky-700">$</span>
            <span key={total} className="pop grad-text">{animTotal}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700 mb-5">
            <Clock className="w-3.5 h-3.5" /> Delivery in <b className="text-[var(--text)]">{curr.time}</b>
          </div>

          {/* Size meter */}
          <div className="mb-5">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-sky-700/80 mb-1.5">
              <span>Starter</span><span>Project size</span><span>Full build</span>
            </div>
            <div className="est-meter"><i style={{ width: `${pct}%` }} /></div>
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl bg-white/65 border border-sky-300/30 p-4 mb-5 space-y-2.5 text-xs">
            <div className="flex justify-between font-semibold text-[var(--text)]" key={scope}>
              <span className="line-in">{curr.label}</span><span className="line-in">${curr.base}</span>
            </div>
            {picked.map((a) => (
              <div key={a.id} className="line-in flex justify-between text-sky-700 font-medium">
                <span>+ {a.label}</span><span>${a.price}</span>
              </div>
            ))}
            {picked.length === 0 && <div className="text-sky-700/70 italic">No extras selected</div>}
            <div className="pt-2.5 border-t border-sky-500/15 flex justify-between font-extrabold text-sm text-[var(--text)]">
              <span>Total</span><span>${total}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-2.5">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp py-3.5 text-sm w-full">
              <MessageSquare className="w-4 h-4" /> Send Quote on WhatsApp
            </a>
            <div className="grid grid-cols-2 gap-2.5">
              <a href={mailHref} className="btn btn-ghost py-3 text-xs"><Mail className="w-4 h-4" /> Email</a>
              <button onClick={copy} className="btn btn-ghost py-3 text-xs">
                {copied ? <span className="pop flex items-center gap-1.5 text-sky-700"><Check className="w-4 h-4" /> Copied</span> : <><Copy className="w-4 h-4" /> Copy quote</>}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-sky-700/70 mt-4 leading-relaxed">Starting estimate — the final price is confirmed after we discuss your exact requirements.</p>
        </div>
      </div>
    </div>
  );
}
