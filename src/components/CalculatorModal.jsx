import { X } from 'lucide-react';
import { useModal } from '../hooks.js';
import Estimator from './Estimator.jsx';

export default function CalculatorModal({ est, onClose }) {
  useModal(onClose);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label="Project estimator">
      <div className="modal-panel max-w-3xl p-6 sm:p-8">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full pointer-events-none\" style={{ backgroundImage: 'radial-gradient(circle, rgba(125, 202, 250,0.38) 0%, rgba(94, 180, 234,0.16) 45%, rgba(255, 255, 255,0) 70%)' }} />
        <button onClick={onClose} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-sky-500/10 text-sky-900/70 hover:text-sky-900 hover:bg-sky-500/20 hover:rotate-90 transition-all duration-300" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="relative">
          <div className="badge mb-3">Interactive Pricing</div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] mb-6">Calculate your <span className="grad-text">project estimate</span></h3>
          <Estimator est={est} compact />
        </div>
      </div>
    </div>
  );
}
