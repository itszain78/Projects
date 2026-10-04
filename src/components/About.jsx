import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { config } from '../config.js';

const timeline = [
  { period: '2024 – 2028 (Current)', title: 'BS Software Engineering', inst: 'NFC IET Multan', badge: 'Undergraduate', desc: 'Studying Relational SQL Databases, OOP, Data Structures & Algorithms, Software Architecture, and Web Engineering.' },
  { period: 'Certified Professional', title: 'Web Development Certification', inst: 'Corvit Systems Multan', badge: 'Completed', desc: 'Hands-on practical training in HTML5, CSS3, JavaScript, PHP backend, and MySQL database management.' },
  { period: 'Ongoing', title: 'Freelance Web Developer', inst: 'Remote & Client Projects', badge: 'Active', desc: 'Building modern, responsive websites and custom PHP/SQL web applications for clients.' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="fade-up text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <GraduationCap className="w-4 h-4 text-blue-600" /> Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Education & Certifications</h2>
          <div className="section-divider" />
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-medium">Strong software engineering foundation backed by certified web development training.</p>
        </div>

        {/* Two Cards */}
        <div className="fade-up grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {/* NFC IET */}
          <div className="hover-lift glass p-6 sm:p-8 rounded-3xl">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-2">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Undergraduate Program
              </span>
            </div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">2024 – 2028</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{config.degree}</h3>
            <p className="text-slate-700 font-semibold text-sm mb-4">{config.university}</p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
              Core subjects include Relational Databases (SQL), Object-Oriented Programming, Data Structures & Algorithms, Software Architecture, and Web Engineering.
            </p>
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Focus Areas</div>
              <div className="flex flex-wrap gap-2">
                {['SQL Databases','OOP','Software Architecture','Web Security','Agile'].map((t,i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3 text-blue-600" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Corvit */}
          <div className="hover-lift glass p-6 sm:p-8 rounded-3xl">
            <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-2">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Certified Professional
              </span>
            </div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">Professional Track</div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Web Development Certification</h3>
            <p className="text-slate-700 font-semibold text-sm mb-4">Corvit Systems Multan</p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
              Rigorous hands-on training in full-stack web development: HTML5, CSS3, JavaScript, PHP backend logic, and MySQL database management.
            </p>
            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Certified Skills</div>
              <div className="flex flex-wrap gap-2">
                {['HTML5','CSS3','JavaScript','PHP','MySQL','Responsive UI'].map((t,i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3 text-indigo-600" /> {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="fade-up glass p-6 sm:p-8 max-w-4xl mx-auto rounded-3xl">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Journey Timeline
          </h3>
          <div className="space-y-6 relative before:absolute before:left-[13px] sm:before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300">
            {timeline.map((t, i) => (
              <div key={i} className="relative pl-8 sm:pl-12">
                <div className="absolute left-0 sm:left-1 top-1 w-4 h-4 rounded-full bg-white border-2 border-blue-600 shadow-xs" />
                <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{t.period}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{t.badge}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">{t.title}</h4>
                <p className="text-xs font-medium text-slate-500 mb-1">{t.inst}</p>
                <p className="text-slate-600 text-xs sm:text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
