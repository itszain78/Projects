import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Any unknown path (e.g. /anything) shows the home page; normalise the URL back to "/".
if (window.location.pathname !== '/') {
  window.history.replaceState(null, '', '/' + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
)
