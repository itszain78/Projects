import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { normalize } from './router.jsx'

// Unknown paths and aliases (/work, /pricing ...) are rewritten to their real page.
const canonical = normalize(window.location.pathname)
if (window.location.pathname.replace(/\/+$/, '') !== (canonical === '/' ? '' : canonical)) {
  window.history.replaceState(null, '', canonical + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
