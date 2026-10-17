import { useEffect, useRef, useState, useCallback } from 'react';

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ───────────── Scroll reveal for every .fade-up (also picks up elements added later) ───────────── */
export function useAutoFadeUp() {
  useEffect(() => {
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    const add = (el) => { if (!seen.has(el) && !el.classList.contains('visible')) { seen.add(el); io.observe(el); } };
    const scan = (root) => {
      if (root.nodeType !== 1) return;
      if (root.classList.contains('fade-up')) add(root);
      root.querySelectorAll('.fade-up:not(.visible)').forEach(add);
    };
    scan(document.body);
    // only look at nodes that were actually added (not the whole page on every DOM change)
    const mo = new MutationObserver((list) => {
      for (const m of list) m.addedNodes.forEach(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

/* ───────────── Global pointer effects (event delegation, zero per-card listeners) ─────────────
   • .spot            → cursor-follow spotlight (sets --mx/--my)
   • [data-tilt]      → 3D tilt (sets --rx/--ry/--ty)
   • [data-magnetic]  → button gently follows cursor
   • .cursor-glow     → soft gradient glow trailing the cursor
   • .scroll-progress → gradient bar tied to scroll position                                   */
export function useGlobalFx() {
  useEffect(() => {
    const root = document.documentElement;
    const progress = document.querySelector('.scroll-progress');

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        progress?.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (prefersReduced() || !hasFinePointer()) {
      return () => window.removeEventListener('scroll', onScroll);
    }

    let tiltEl = null;
    let magEl = null;
    let raf = 0;
    let last = null;

    const resetTilt = (el) => {
      if (!el) return;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--ty', '0px');
      el.classList.remove('is-tilting');
    };
    const resetMag = (el) => { if (el) el.style.transform = ''; };

    const frame = () => {
      raf = 0;
      if (!last) return;
      const { x, y, target } = last;

      const spot = target.closest?.('.spot');
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty('--mx', `${x - r.left}px`);
        spot.style.setProperty('--my', `${y - r.top}px`);
      }

      const t = target.closest?.('[data-tilt]');
      if (tiltEl && tiltEl !== t) resetTilt(tiltEl);
      tiltEl = t || null;
      if (t) {
        const r = t.getBoundingClientRect();
        const max = Number(t.dataset.tilt) || 6;
        const px = (x - r.left) / r.width - 0.5;
        const py = (y - r.top) / r.height - 0.5;
        t.classList.add('is-tilting');
        t.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
        t.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
        t.style.setProperty('--ty', '-6px');
      }

      const m = target.closest?.('[data-magnetic]');
      if (magEl && magEl !== m) resetMag(magEl);
      magEl = m || null;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = (x - (r.left + r.width / 2)) * 0.18;
        const dy = (y - (r.top + r.height / 2)) * 0.28;
        m.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      }
    };

    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY, target: e.target };
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeaveWindow = () => {
      resetTilt(tiltEl); tiltEl = null;
      resetMag(magEl); magEl = null;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

/* ───────────── Is-in-view flag (fires once) ───────────── */
export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* ───────────── Smoothly tween a number (used by the estimator & skill %) ───────────── */
export function useAnimatedNumber(target, duration = 650, fromZero = false) {
  const [val, setVal] = useState(fromZero ? 0 : target);
  const from = useRef(fromZero ? 0 : target);
  useEffect(() => {
    if (prefersReduced()) { setVal(target); from.current = target; return; }
    const start = performance.now();
    const a = from.current;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const v = a + (target - a) * eased;
      from.current = v;
      setVal(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return Math.round(val);
}

/* ───────────── Typewriter that cycles through phrases ───────────── */
export function useTypewriter(words, { type = 70, erase = 35, hold = 1600 } = {}) {
  const [text, setText] = useState(prefersReduced() ? words[0] : '');
  useEffect(() => {
    if (prefersReduced()) return;
    let i = 0, n = 0, dir = 1, timer;
    const step = () => {
      const w = words[i];
      n += dir;
      setText(w.slice(0, n));
      let delay = dir === 1 ? type : erase;
      if (dir === 1 && n === w.length) { dir = -1; delay = hold; }
      else if (dir === -1 && n === 0) { dir = 1; i = (i + 1) % words.length; delay = 350; }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 500);
    return () => clearTimeout(timer);
  }, [words, type, erase, hold]);
  return text;
}

/* ───────────── Lock page scroll + close on Escape while a modal is open ───────────── */
export function useModal(onClose) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
}

/* ───────────── Shared estimator state (inline widget + modal stay in sync) ───────────── */
export function useEstimatorState(config) {
  const [scope, setScope] = useState(config.pricing[0].id);
  const [addons, setAddons] = useState([]);

  const curr = config.pricing.find((p) => p.id === scope) || config.pricing[0];
  const picked = config.addons.filter((a) => addons.includes(a.id));
  const total = curr.base + picked.reduce((s, a) => s + a.price, 0);
  const maxTotal = Math.max(...config.pricing.map((p) => p.base)) + config.addons.reduce((s, a) => s + a.price, 0);

  const toggle = useCallback((id) => setAddons((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const reset = useCallback(() => { setScope(config.pricing[0].id); setAddons([]); }, [config]);

  const quoteText = `Hi Zain!\nI used your project estimator:\n- Type: ${curr.label}\n- Time: ${curr.time}\n- Add-ons: ${picked.map((a) => a.label).join(', ') || 'None'}\n- Estimate: $${total}\n\nLet's discuss!`;

  return { scope, setScope, addons, setAddons, toggle, reset, curr, picked, total, maxTotal, quoteText };
}
