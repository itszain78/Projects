import { useSyncExternalStore } from 'react'

// Tiny History-API router (no extra dependency). Each section also has its own page.
export const ROUTES = ['about', 'skills', 'services', 'projects', 'contact']
const ALIASES = { project: 'projects', portfolio: 'projects', work: 'projects', pricing: 'services' }

export function normalize(pathname) {
  const s = pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
  if (!s) return '/'
  const r = ALIASES[s] || s
  return ROUTES.includes(r) ? '/' + r : '/'
}

const listeners = new Set()
const emit = () => listeners.forEach((f) => f())
const subscribe = (cb) => {
  listeners.add(cb)
  window.addEventListener('popstate', cb)
  return () => { listeners.delete(cb); window.removeEventListener('popstate', cb) }
}
const snapshot = () => normalize(window.location.pathname)

export const usePath = () => useSyncExternalStore(subscribe, snapshot, () => '/')

export function navigate(to) {
  if (to !== snapshot() || window.location.pathname !== to) {
    window.history.pushState(null, '', to)
    emit()
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

export function Link({ to, onClick, children, ...rest }) {
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
    >
      {children}
    </a>
  )
}
