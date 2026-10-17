import { useState, useEffect } from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle, ZoomIn, X } from 'lucide-react';
import { config } from '../config.js';
import { useInView } from '../hooks.js';
import SectionHeader from './SectionHeader.jsx';

const timeline = [
  { period: '2024 – 2028 (Current)', title: 'BS Software Engineering', inst: 'NFC IET Multan', badge: 'Undergraduate', desc: 'Studying Relational SQL Databases, OOP, Data Structures & Algorithms, Software Architecture, and Web Engineering.' },
  { period: 'Certified Professional', title: 'Web Development Certification', inst: 'Corvit Systems Multan', badge: 'Completed', desc: 'Hands-on practical training in HTML5, CSS3, JavaScript, PHP backend, and MySQL database management.' },
  { period: 'Ongoing', title: 'Freelance Web Developer', inst: 'Remote & Client Projects', badge: 'Active', desc: 'Building modern, responsive websites and custom PHP/SQL web applications for clients.' },
];

// "Click to view certificate" — opens ONLY the certificate image. Hidden if the file is missing.
function Certificate({ src, alt }) {
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setOk(true);
    img.src = src;
  }, [src]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  if (!ok) return null;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn btn-primary px-3.5 py-1.5 text-xs">
        <ZoomIn className="w-3.5 h-3.5" /> Click to view certificate
      </button>
      {open && (
        <div className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70" role="dialog" aria-modal="true" aria-label="Certificate" onClick={() => setOpen(false)}>
          <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute top-4 right-4 btn btn-ghost p-2.5"><X className="w-5 h-5" /></button>
          <img src={src} alt={alt} className="max-h-[90vh] max-w-full rounded-lg shadow-2xl bg-white" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

function EduCard({ action, icon: Icon, grad, tag, tagClass, kicker, title, place, text, label, items, dot, delay, dir }) {
  return (
    <div className={`fade-up ${dir}`} style={{ '--d': `${delay}ms` }}>
      <div data-tilt="4" className="card spot group p-6 sm:p-8 h-full">
        <span className="spot-glow" />
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div className="w-14 h-14 rounded-2xl p-[1.5px] shadow-lg group-hover:rotate-[-6deg] group-hover:scale-110 transition-transform duration-500" style={{ backgroundImage: grad }}>
            <div className="w-full h-full rounded-[14px] flex items-center justify-center" style={{ background: '#ffffff' }}>
              <Icon className="w-6 h-6 text-[var(--text)]" />
            </div>
          </div>
          <span className={`px-3.5 py-1 rounded-full text-xs font-bold border ${tagClass}`}>{tag}</span>
        </div>
        <div className="text-xs font-bold uppercase tracking-wider mb-1 grad-text w-fit">{kicker}</div>
        <h3 className="text-xl font-bold text-[var(--text)] mb-1">{title}</h3>
        <p className="text-[var(--text-soft)] font-semibold text-sm mb-4">{place}</p>
        <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed mb-5">{text}</p>
        <div className="pt-4 border-t border-sky-500/15">
          <div className="flex items-center justify-between gap-3 mb-2.5 min-h-[28px]">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase">{label}</div>
            {action}
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((t, i) => (
              <span key={i} className="chip text-xs px-2.5 py-1">
                <CheckCircle className={`w-3 h-3 ${dot}`} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [tlRef, tlSeen] = useInView(0.2);

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader icon={GraduationCap} badge="Academic Background" title="Education &" accent="Certifications"
          text="Strong software engineering foundation backed by certified web development training." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          <EduCard dir="fade-left" delay={0} icon={GraduationCap} grad="var(--grad-cool)"
            tag="Undergraduate Program" tagClass="bg-sky-100 text-sky-700 border-sky-300"
            kicker="2024 – 2028" title={config.degree} place={config.university}
            text="Core subjects include Relational Databases (SQL), Object-Oriented Programming, Data Structures & Algorithms, Software Architecture, and Web Engineering."
            label="Focus Areas" items={['SQL Databases', 'OOP', 'Software Architecture', 'Web Security', 'Agile']} dot="text-sky-700" />
          <EduCard dir="fade-right" delay={120} icon={Award} grad="var(--grad-sunset)"
            tag="Certified Professional" tagClass="bg-emerald-100 text-emerald-700 border-emerald-300"
            kicker="Professional Track" title="Web Development Certification" place="Corvit Systems Multan"
            text="Rigorous hands-on training in full-stack web development: HTML5, CSS3, JavaScript, PHP backend logic, and MySQL database management."
            label="Certified Skills" items={['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'Responsive UI']} dot="text-sky-700"
            action={<Certificate src="/certificate.jpg" alt="Web Development Certificate — Corvit Systems Multan" />} />
        </div>

        {/* Timeline — the line draws itself as it scrolls into view */}
        <div ref={tlRef} className="fade-up card p-6 sm:p-10 max-w-4xl mx-auto">
          <h3 className="text-lg font-bold text-[var(--text)] mb-8 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-700" /> Journey Timeline
          </h3>
          <div className="space-y-8 relative" style={{ '--tl': tlSeen ? 1 : 0 }}>
            <div className="timeline-line" />
            {timeline.map((t, i) => (
              <div key={i} className="timeline-item relative pl-9 sm:pl-14 group"
                style={{ opacity: tlSeen ? 1 : 0, transform: tlSeen ? 'none' : 'translateX(-18px)', transition: `all .7s var(--ease-out) ${300 + i * 350}ms` }}>
                <div className="timeline-dot absolute left-[5px] sm:left-[9px] top-1 w-4 h-4 rounded-full border-2 border-sky-300" style={{ backgroundImage: 'var(--grad-sunset)' }} />
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">{t.period}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/70 text-[var(--text-soft)] border border-sky-500/15">{t.badge}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[var(--text)] group-hover:text-sky-700 transition-colors">{t.title}</h4>
                <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{t.inst}</p>
                <p className="text-[var(--text-soft)] text-xs sm:text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
