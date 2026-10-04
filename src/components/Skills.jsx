import { useState, useEffect } from 'react';
import { config } from '../config.js';
import { Cpu } from 'lucide-react';

const TABS = config.skills.map(s => s.cat);

export default function Skills() {
  const [tab, setTab] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(t);
  }, [tab]);

  const catData = config.skills[tab];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="fade-up text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Cpu className="w-4 h-4 text-indigo-600" /> Technical Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Skills & Expertise</h2>
          <div className="section-divider" />
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-medium">Certified skills across frontend development, backend logic, and software engineering.</p>
        </div>

        {/* Tab Buttons */}
        <div className="fade-up flex flex-wrap justify-center gap-2.5 mb-10">
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                tab === i
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Progress Bars Grid */}
        <div className="fade-up grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {catData.items.map((skill, i) => (
            <div key={`${tab}-${i}`} className="hover-lift glass p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">{skill.pct}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500"
                  style={{
                    width: animate ? `${skill.pct}%` : '0%',
                    transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
