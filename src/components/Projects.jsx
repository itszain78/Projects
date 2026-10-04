import { useState } from 'react';
import { ExternalLink, X, CheckCircle, Eye, Clock } from 'lucide-react';
import { config } from '../config.js';
import { GithubIcon } from '../Icons.jsx';

const CATS = ['All', 'Full-Stack PHP/SQL', 'Frontend & UI'];

export default function Projects() {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);

  const filtered = cat === 'All' ? config.projects : config.projects.filter(p => p.cat === cat);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="fade-up text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Recent Projects</h2>
          <div className="section-divider" />
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-medium">Custom-built web applications using PHP, MySQL, JavaScript, and modern responsive CSS.</p>
        </div>

        {/* Filter tabs */}
        <div className="fade-up flex flex-wrap justify-center gap-2 mb-10">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${cat === c ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="hover-lift glass rounded-3xl overflow-hidden flex flex-col group border border-slate-200">
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-slate-100">
                <img src={p.img} alt={`${p.title} — ${p.cat} project by Zain Ul Haseeb`} width="800" height="533" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                {p.status && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-50/95 backdrop-blur text-amber-700 border border-amber-300 shadow-sm flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {p.status}
                  </span>
                )}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur text-blue-700 border border-blue-200 shadow-sm">
                  {p.cat}
                </span>
              </div>
              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1">{p.short}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t, i) => <span key={i} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700">{t}</span>)}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button onClick={() => setModal(p)} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>
                  <div className="flex items-center gap-2">
                    {p.status && (
                      <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">Coming Soon</span>
                    )}
                    {!p.status && p.repo && (
                      <a href={p.repo} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {!p.status && p.demo && (
                      <a href={p.demo} className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setModal(null)} className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">{modal.cat}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{modal.title}</h3>
            <img src={modal.img} alt={`${modal.title} — ${modal.cat} project by Zain Ul Haseeb`} width="800" height="533" decoding="async" className="w-full h-52 object-cover rounded-2xl mb-5 border border-slate-200" />
            {modal.status && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold mb-5">
                <Clock className="w-4 h-4 shrink-0" /> {modal.status} — this project is under active development and will be available soon.
              </div>
            )}
            <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">{modal.full}</p>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Features</h4>
            <div className="space-y-2 mb-6">
              {modal.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> {f}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-200">
              {modal.tags.map((t, i) => <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 font-semibold">{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
