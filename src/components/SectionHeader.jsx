export default function SectionHeader({ icon: Icon, badge, title, accent, text }) {
  return (
    <div className="fade-up text-center max-w-2xl mx-auto mb-14">
      <div className="badge mb-5">
        {Icon && <Icon className="w-4 h-4 text-sky-700" />} {badge}
      </div>
      <h2 className="section-title text-3xl sm:text-5xl">
        {title} {accent && <span className="grad-text">{accent}</span>}
      </h2>
      <div className="section-divider" />
      <p className="mt-5 text-[var(--text-soft)] text-sm sm:text-base font-medium leading-relaxed">{text}</p>
    </div>
  );
}
