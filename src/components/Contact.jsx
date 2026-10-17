import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, ChevronDown, Phone, Copy, Check } from 'lucide-react';
import { config } from '../config.js';
import { GithubIcon, WhatsappIcon } from '../Icons.jsx';
import SectionHeader from './SectionHeader.jsx';

const CONFETTI = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2;
  const d = 90 + (i % 5) * 28;
  const colors = ['#63bbf1', '#55b9f7', '#48adec', '#f59e0b', '#22a0ee', '#1078b9'];
  return { tx: Math.cos(a) * d, ty: Math.sin(a) * d - 40, r: (i * 47) % 360, c: colors[i % colors.length], dl: (i % 6) * 30 };
});

function InfoRow({ icon: Icon, label, children, grad, copyText, delay }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(copyText); } catch { /* ignore */ }
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <div className="fade-up" style={{ '--d': `${delay}ms` }}>
      <div className="card spot group p-5 flex items-center gap-4 hover:translate-x-1.5">
        <span className="spot-glow" />
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-[-8deg] group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: grad }}>
          <Icon className="w-5 h-5 text-[var(--text)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{label}</div>
          {children}
        </div>
        {copyText && (
          <button onClick={copy} className="relative z-10 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-sky-500/10 transition-all" aria-label={`Copy ${label}`}>
            {done ? <Check className="w-4 h-4 text-sky-700 pop" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: 'Full-Stack PHP/SQL Web App', budget: '$30 - $100', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'a3f9d749-42cd-42d1-ae78-68819c61f07f',
          subject: `Portfolio inquiry from ${form.name}`,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const msgLen = form.message.length;

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader icon={Mail} badge="Let's Work Together" title="Contact" accent="Me"
          text="Have a web project or idea in mind? Get in touch for a fast response." />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

          {/* Left column */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp highlight */}
            <div className="fade-up fade-left">
              <div data-tilt="4" className="card spot p-6 sm:p-8" style={{ backgroundImage: 'linear-gradient(145deg, rgba(167, 214, 243,0.85) 0%, rgba(204, 233, 251,0.7) 45%, rgba(255, 255, 255,0.8) 100%)', borderColor: 'rgba(52, 150, 211,0.5)' }}>
                <span className="spot-glow" />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 animate-[waPulse_3s_infinite]" style={{ backgroundImage: 'linear-gradient(135deg,#055e96,#1078b9,#2d94d4)' }}>
                  <WhatsappIcon className="w-6 h-6 text-[var(--text)]" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text)] mb-2">Fastest Response</h3>
                <p className="text-[var(--text-soft)] text-xs sm:text-sm mb-5 leading-relaxed font-medium">Message me directly on WhatsApp for instant discussions and quick project quotes.</p>
                <a href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and would like to start a project.')}`}
                  target="_blank" rel="noopener noreferrer" data-magnetic
                  className="btn btn-whatsapp w-full py-3.5 text-sm">
                  <WhatsappIcon className="w-5 h-5" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <InfoRow icon={Phone} label="Contact Number" grad="var(--grad-cool)" copyText={config.phoneDisplay} delay={80}>
              <a href={`tel:+${config.whatsapp}`} className="text-xs sm:text-sm font-bold text-[var(--text)] hover:text-sky-700 transition-colors truncate block">{config.phoneDisplay}</a>
            </InfoRow>
            <InfoRow icon={Mail} label="Email Address" grad="var(--grad-primary)" copyText={config.email} delay={160}>
              <a href={`mailto:${config.email}`} className="text-xs sm:text-sm font-bold text-[var(--text)] hover:text-sky-700 transition-colors truncate block">{config.email}</a>
            </InfoRow>
            <InfoRow icon={MapPin} label="Location" grad="var(--grad-warm)" delay={240}>
              <div className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">{config.location}</div>
            </InfoRow>

            <div className="fade-up" style={{ '--d': '320ms' }}>
              <div className="card p-5">
                <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">Connect Direct</div>
                <div className="flex items-center gap-3">
                  <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp"
                    className="chip p-3 !text-sky-700 hover:!border-sky-400/70"><WhatsappIcon className="w-5 h-5" /></a>
                  {config.github && (
                    <a href={config.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" className="chip p-3"><GithubIcon className="w-5 h-5" /></a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 fade-up fade-right">
            <div className="card p-6 sm:p-10 relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-1">Send a Message</h3>
              <p className="text-[var(--text-soft)] text-xs sm:text-sm mb-6 font-medium">Fill in your requirements to receive a project proposal.</p>

              {sent ? (
                <div className="relative p-8 rounded-2xl text-center border border-sky-400/30 pop" style={{ backgroundImage: 'linear-gradient(145deg, rgba(167, 214, 243,0.7), rgba(199, 233, 254,0.6))' }}>
                  {CONFETTI.map((c, i) => (
                    <span key={i} className="confetti" style={{ '--tx': `${c.tx}px`, '--ty': `${c.ty}px`, '--r': `${c.r}deg`, background: c.c, animationDelay: `${c.dl}ms` }} />
                  ))}
                  <CheckCircle className="w-12 h-12 text-sky-700 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-[var(--text)] mb-1">Message Received!</h4>
                  <p className="text-[var(--text-soft)] text-xs sm:text-sm font-medium">Thank you {form.name || 'friend'}! I will get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-xs font-bold text-sky-700 hover:text-[var(--text)] underline underline-offset-4">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-wider mb-2">Your Name</label>
                      <input id="c-name" required type="text" value={form.name} onChange={set('name')} placeholder="Your full name" className="field" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-wider mb-2">Email Address</label>
                      <input id="c-email" required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className="field" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-service" className="block text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-wider mb-2">Required Service</label>
                      <select id="c-service" value={form.service} onChange={set('service')} className="field">
                        <option>Full-Stack PHP/SQL Web App</option>
                        <option>Modern UI Web Design</option>
                        <option>PHP & Database Backend</option>
                        <option>Custom Web Application</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="c-budget" className="block text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-wider mb-2">Estimated Budget</label>
                      <select id="c-budget" value={form.budget} onChange={set('budget')} className="field">
                        <option>$30 - $100</option>
                        <option>$100 - $200</option>
                        <option>$200 - $400</option>
                        <option>$400+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label htmlFor="c-msg" className="block text-[11px] font-bold text-[var(--text-soft)] uppercase tracking-wider">Project Details</label>
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">{msgLen} chars</span>
                    </div>
                    <textarea id="c-msg" required rows={4} value={form.message} onChange={set('message')} placeholder="Describe your project goals, features, or timeline..." className="field resize-none" />
                  </div>
                  {error && <p className="text-xs text-rose-700 font-semibold line-in">Something went wrong. Please try WhatsApp instead.</p>}
                  <button type="submit" disabled={sending} data-magnetic className="btn btn-primary w-full py-4 text-sm disabled:opacity-70">
                    {sending ? <><span className="w-4 h-4 rounded-full border-2 border-sky-900/30 border-t-sky-900 animate-spin" aria-hidden="true" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="fade-up max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-3xl font-bold text-[var(--text)] text-center mb-8">Frequently Asked <span className="grad-text">Questions</span></h3>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`card overflow-hidden !rounded-2xl ${isOpen ? 'is-active' : ''}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left font-semibold text-sm text-[var(--text)] flex items-center justify-between gap-4 hover:text-sky-700 transition-colors">
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'rotate-180 text-[var(--text)]' : 'bg-sky-500/10 text-[var(--text-muted)]'}`} style={isOpen ? { backgroundImage: 'var(--grad-primary)' } : undefined}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                    <div>
                      <div className="px-5 pb-5 text-[var(--text-soft)] text-xs sm:text-sm leading-relaxed border-t border-sky-500/15 pt-3 font-medium">{faq.a}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
