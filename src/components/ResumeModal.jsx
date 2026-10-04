import { X, GraduationCap, Award, Code, Mail, MapPin, Download, Phone } from 'lucide-react';
import { config } from '../config.js';

export default function ResumeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div
        className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto relative shadow-2xl"
        style={{ animation: 'fadeIn .25s ease' }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-slate-200 pb-5 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{config.name}</h2>
              <p className="text-blue-700 font-bold text-sm mt-1">{config.title}</p>
              <p className="text-slate-500 text-xs font-medium">{config.subtitle}</p>
            </div>
            <a
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent('Hi Zain, I would like to request your full PDF resume.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-shine px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" /> Request PDF Resume
            </a>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-600" /> {config.email}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-600" /> {config.phoneDisplay}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {config.location}</span>
          </div>
        </div>

        {/* Higher Education — CGPA shown strictly here */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" /> Higher Education
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap justify-between items-start gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">{config.degree}</h4>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">{config.university}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-300">
              CGPA {config.cgpa}
            </span>
          </div>
        </div>

        {/* Certification */}
        <div className="mb-5">
          <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" /> Professional Certification
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap justify-between items-start gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Web Development Certification</h4>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">Corvit Systems Multan</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
              Completed
            </span>
          </div>
        </div>

        {/* Tech Skills Summary */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-600" /> Technical Competencies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
            {[
              { label: 'Web Stack:', val: 'HTML5, CSS3, JavaScript (ES6+), PHP 8+' },
              { label: 'Database:', val: 'SQL, MySQL Relational Design' },
              { label: 'Tools:', val: 'Git, Tailwind CSS, cPanel, REST APIs' },
              { label: 'Engineering:', val: 'OOP, Data Structures, Software Design' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">{item.label}</span>
                {item.val}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors">
            Close
          </button>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(.96) } to { opacity:1; transform:scale(1) } }`}</style>
    </div>
  );
}
