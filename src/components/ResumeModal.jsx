import { X, GraduationCap, Award, Code, Mail, MapPin, Download, Phone } from 'lucide-react';
import { config } from '../config.js';
import { useModal } from '../hooks.js';

const skillGroups = [
  { label: 'Web Stack:', val: 'HTML5, CSS3, JavaScript (ES6+), PHP 8+' },
  { label: 'Database:', val: 'SQL, MySQL Relational Design' },
  { label: 'Tools:', val: 'Git, Tailwind CSS, cPanel, REST APIs' },
  { label: 'Engineering:', val: 'OOP, Data Structures, Software Design' },
];

export default function ResumeModal({ onClose }) {
  useModal(onClose);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Resume">
      <div className="modal-panel max-w-2xl p-6 sm:p-10">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full pointer-events-none\" style={{ backgroundImage: 'radial-gradient(circle, rgba(125, 202, 250,0.38) 0%, rgba(94, 180, 234,0.16) 45%, rgba(255, 255, 255,0) 70%)' }} />
        <button onClick={onClose} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-sky-500/10 text-sky-900/70 hover:text-sky-900 hover:bg-sky-500/20 hover:rotate-90 transition-all duration-300" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          {/* Header */}
          <div className="border-b border-sky-500/15 pb-5 mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4 pr-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">{config.name}</h2>
                <p className="grad-text font-bold text-sm mt-1 w-fit">{config.title}</p>
                <p className="text-[var(--text-muted)] text-xs font-medium">{config.subtitle}</p>
              </div>
              <a
                href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain, I would like to request your full PDF resume.')}`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary px-4 py-2.5 text-xs"
              >
                <Download className="w-4 h-4" /> Request PDF Resume
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-[var(--text-soft)]">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-sky-700" /> {config.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-sky-700" /> {config.phoneDisplay}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-700" /> {config.location}</span>
            </div>
          </div>

          {/* Higher Education — CGPA shown strictly here */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 flex items-center gap-2 font-sans">
              <GraduationCap className="w-4 h-4" /> Higher Education
            </h3>
            <div className="lift p-4 rounded-2xl bg-white/70 border border-sky-500/15 flex flex-wrap justify-between items-start gap-3 hover:border-sky-400/50">
              <div>
                <h4 className="text-sm font-bold text-[var(--text)] font-sans">{config.degree}</h4>
                <p className="text-xs text-[var(--text-soft)] mt-0.5 font-medium">{config.university}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold text-amber-700 border border-amber-300/40 bg-amber-100">CGPA {config.cgpa}</span>
            </div>
          </div>

          {/* Certification */}
          <div className="mb-5">
            <h3 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 flex items-center gap-2 font-sans">
              <Award className="w-4 h-4" /> Professional Certification
            </h3>
            <div className="lift p-4 rounded-2xl bg-white/70 border border-sky-500/15 flex flex-wrap justify-between items-start gap-3 hover:border-sky-400/50">
              <div>
                <h4 className="text-sm font-bold text-[var(--text)] font-sans">Web Development Certification</h4>
                <p className="text-xs text-[var(--text-soft)] mt-0.5 font-medium">Corvit Systems Multan</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-sky-700 border border-sky-400/40 bg-sky-100">Completed</span>
            </div>
          </div>

          {/* Tech Skills */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-sky-700 uppercase tracking-wider mb-3 flex items-center gap-2 font-sans">
              <Code className="w-4 h-4" /> Technical Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[var(--text-soft)] font-medium">
              {skillGroups.map((item, i) => (
                <div key={i} className="lift p-3.5 rounded-xl bg-white/70 border border-sky-500/15 hover:border-sky-400/50">
                  <span className="font-bold text-[var(--text)] block mb-0.5">{item.label}</span>
                  {item.val}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-sky-500/15">
            <button onClick={onClose} className="btn btn-ghost px-6 py-2.5 text-xs">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
