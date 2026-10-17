import { useState, useEffect } from 'react';
import { Cpu, Layers, Server, Wrench } from 'lucide-react';
import { config } from '../config.js';
import { useInView, useAnimatedNumber } from '../hooks.js';
import SectionHeader from './SectionHeader.jsx';

const TABS = config.skills.map((s) => s.cat);
const TAB_ICONS = [Layers, Server, Wrench];

function SkillCard({ skill, index, play }) {
  const pct = useAnimatedNumber(play ? skill.pct : 0, 1300, true);
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!play) return;
    const id = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(id);
  }, [play]);
  return (
    <div className="fade-up" style={{ '--d': `${index * 70}ms` }}>
      <div data-tilt="5" className="card spot p-5">
        <span className="spot-glow" />
        <div className="flex items-center justify-between mb-3.5 gap-3">
          <span className="text-sm font-bold text-[var(--text)]">{skill.name}</span>
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full text-[var(--text)] tabular-nums" style={{ backgroundImage: 'var(--grad-primary)' }}>{pct}%</span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: go ? `${skill.pct}%` : '0%', transition: `width 1.3s cubic-bezier(0.22,1,0.36,1) ${index * 90}ms` }} />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [tab, setTab] = useState(0);
  const [ref, seen] = useInView(0.15);
  const catData = config.skills[tab];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader icon={Cpu} badge="Technical Proficiency" title="Skills &" accent="Expertise"
          text="Certified skills across frontend development, backend logic, and software engineering." />

        {/* Tabs with gradient pill */}
        <div className="fade-up flex flex-wrap justify-center gap-2.5 mb-10" role="tablist">
          {TABS.map((t, i) => {
            const Icon = TAB_ICONS[i] || Cpu;
            return (
              <button key={i} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} data-magnetic
                className={`btn px-5 py-2.5 text-xs sm:text-sm ${tab === i ? 'btn-primary' : 'btn-ghost !text-[var(--text-soft)]'}`}>
                <Icon className="w-4 h-4" /> {t}
              </button>
            );
          })}
        </div>

        <div ref={ref} className="max-w-4xl mx-auto">
          <div key={tab} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {catData.items.map((skill, i) => (
              <SkillCard key={`${tab}-${i}`} skill={skill} index={i} play={seen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
