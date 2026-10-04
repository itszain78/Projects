import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { config } from '../config.js';
import { GithubIcon, WhatsappIcon } from '../Icons.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: 'Full-Stack PHP/SQL Web App', budget: '$100 - $250', message: '' });
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

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="fade-up text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Mail className="w-4 h-4 text-blue-600" /> Let's Work Together
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Contact Me</h2>
          <div className="section-divider" />
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-medium">Have a web project or idea in mind? Get in touch for a fast response.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">

          {/* Left Column Info */}
          <div className="fade-up lg:col-span-5 space-y-4">

            {/* WhatsApp Highlight Box */}
            <div className="hover-lift glass border border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-6 sm:p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center mb-5">
                <WhatsappIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Fastest Response</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-5 leading-relaxed font-medium">Message me directly on WhatsApp for instant discussions and quick project quotes.</p>
              <a href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain! I visited your portfolio and would like to start a project.')}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-shine w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2">
                <WhatsappIcon className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>

            {/* Phone */}
            <div className="hover-lift glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Contact Number</div>
                <a href={`tel:+${config.whatsapp}`} className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block">
                  {config.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="hover-lift glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Email Address</div>
                <a href={`mailto:${config.email}`} className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors truncate block">
                  {config.email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="hover-lift glass p-5 rounded-2xl flex items-center gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Location</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{config.location}</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass p-5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-400 uppercase mb-3">Connect Direct</div>
              <div className="flex items-center gap-3">
                <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  title="WhatsApp"
                  className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-all">
                  <WhatsappIcon className="w-5 h-5" />
                </a>
                {config.github && (
                  <a href={config.github} target="_blank" rel="noopener noreferrer"
                    title="GitHub"
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="fade-up lg:col-span-7">
            <div className="hover-lift glass p-6 sm:p-10 rounded-3xl border border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Send a Message</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6 font-medium">Fill in your requirements to receive a project proposal.</p>

              {sent ? (
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <CheckCircle className="w-10 h-10 text-blue-600 mx-auto mb-3 animate-bounce" />
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Message Received!</h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">Thank you {form.name || 'friend'}! I will get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-xs font-bold text-blue-600 underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Your Name</label>
                      <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Zain Ul Haseeb"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors shadow-2xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="zaindev788@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors shadow-2xs" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Required Service</label>
                      <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors shadow-2xs">
                        <option>Full-Stack PHP/SQL Web App</option>
                        <option>Modern UI Web Design</option>
                        <option>PHP & Database Backend</option>
                        <option>Custom Web Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Estimated Budget</label>
                      <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors shadow-2xs">
                        <option>$100 - $250</option>
                        <option>$250 - $500</option>
                        <option>$500 - $1000</option>
                        <option>$1000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Project Details</label>
                    <textarea required rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Describe your project goals, features, or timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none transition-colors resize-none shadow-2xs" />
                  </div>
                  {error && <p className="text-xs text-red-600 font-semibold">Something went wrong. Please try WhatsApp instead.</p>}
                  <button type="submit" disabled={sending}
                    className="btn-shine w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="fade-up max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {config.faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="glass border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-2xs">
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left font-semibold text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-blue-600 transition-colors">
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200 pt-3 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
