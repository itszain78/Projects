import { useState } from 'react';
import { ExternalLink, X, CheckCircle, Eye, Clock, FolderGit2 } from 'lucide-react';
import { config } from '../config.js';
import { GithubIcon } from '../Icons.jsx';
import { useModal } from '../hooks.js';
import SectionHeader from './SectionHeader.jsx';

const CATS = ['All', 'Full-Stack PHP/SQL', 'Frontend & UI'];

function DetailModal({ project, onClose }) {
  useModal(onClose);
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="modal-panel max-w-2xl p-6 sm:p-8">
        <button onClick={onClose} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/90 text-sky-900 hover:bg-white hover:rotate-90 transition-all duration-300" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <span className="grad-text text-xs font-bold uppercase tracking-wider block mb-1 w-fit">{project.cat}</span>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] mb-4 pr-10">{project.title}</h3>
        <div className="relative rounded-2xl overflow-hidden mb-5 border border-sky-500/15">
          <img src={project.img} alt={`${project.title} — ${project.cat} project by Zain Ul Haseeb`} width="800" height="533" decoding="async" className="w-full h-52 object-cover" />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg, transparent 55%, rgba(255, 255, 255,0.7))' }} />
        </div>
        {project.status && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 border border-amber-300/30 text-amber-700 text-xs sm:text-sm font-semibold mb-5">
            <Clock className="w-4 h-4 shrink-0" /> {project.status} — this project is under active development and will be available soon.
          </div>
        )}
        {project.demo && (
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-xs px-4 py-2.5 inline-flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xs px-4 py-2.5 inline-flex items-center gap-2">
                <GithubIcon className="w-4 h-4" /> Source Code
              </a>
            )}
          </div>
        )}
        <p className="text-[var(--text-soft)] text-sm leading-relaxed mb-5 font-medium">{project.full}</p>
        <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider mb-3 font-sans">Key Features</h4>
        <div className="space-y-2 mb-6">
          {project.features.map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-soft)] font-medium line-in" style={{ animationDelay: `${150 + i * 70}ms` }}>
              <CheckCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" /> {f}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-5 border-t border-sky-500/15">
          {project.tags.map((t, i) => <span key={i} className="chip text-xs px-2.5 py-1">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [cat, setCat] = useState('All');
  const [modal, setModal] = useState(null);

  const filtered = cat === 'All' ? config.projects : config.projects.filter((p) => p.cat === cat);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader icon={FolderGit2} badge="Portfolio Showcase" title="Recent" accent="Projects"
          text="Custom-built web applications using PHP, MySQL, JavaScript, and modern responsive CSS." />

        {/* Filter tabs */}
        <div className="fade-up flex flex-wrap justify-center gap-2 mb-10">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-magnetic
              className={`btn px-4 py-2 text-xs ${cat === c ? 'btn-primary' : 'btn-ghost !text-[var(--text-soft)]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Project Cards (remount on filter so they re-animate in) */}
        <div key={cat} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <div key={p.id} className="fade-up" style={{ '--d': `${i * 110}ms` }}>
              <div data-tilt="5" className="card spot group overflow-hidden flex flex-col h-full">
                <span className="spot-glow" />
                {/* Image */}
                <div className="relative h-52 overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg,#c7e9fe,#cfeafb)' }}>
                  <img src={p.img} alt={`${p.title} — ${p.cat} project by Zain Ul Haseeb`} width="800" height="533" loading="lazy" decoding="async"
                    className="w-full h-full object-cover text-transparent group-hover:scale-110 group-hover:rotate-[0.6deg] transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg, rgba(199, 233, 254,0.05) 0%, rgba(255, 255, 255,0.55) 100%)' }} />
                  {p.status && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-100/90 backdrop-blur text-amber-800 border border-amber-300 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {p.status}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-white/85 backdrop-blur text-sky-900 border border-white">
                    {p.cat}
                  </span>
                  <button onClick={() => setModal(p)} aria-label={`View details of ${p.title}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="btn btn-primary px-4 py-2 text-xs translate-y-3 group-hover:translate-y-0 transition-transform duration-300"><Eye className="w-4 h-4" /> Quick view</span>
                  </button>
                </div>
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mb-2 group-hover:text-sky-700 transition-colors">{p.title}</h3>
                  <p className="text-[var(--text-soft)] text-xs sm:text-sm leading-relaxed mb-4 flex-1">{p.short}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t, j) => <span key={j} className="chip text-[11px] px-2.5 py-0.5">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-sky-500/15">
                    <button onClick={() => setModal(p)} className="text-xs font-bold text-sky-700 hover:text-[var(--text)] flex items-center gap-1.5 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                    <div className="flex items-center gap-2">
                      {p.status && <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300/30 text-amber-700">Coming Soon</span>}
                      {!p.status && p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="chip p-2"><GithubIcon className="w-4 h-4" /></a>
                      )}
                      {!p.status && p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo" className="chip px-3 py-1.5 text-xs text-sky-700 font-bold hover:text-sky-900 flex items-center gap-1.5">
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && <DetailModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
