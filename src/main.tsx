import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ApplyFlow } from './ApplyFlow'
import { installMetaPixel } from './lib/metaPixel'

installMetaPixel()

const root = document.getElementById('root')!
createRoot(root).render(
  <StrictMode>
    {window.location.pathname.startsWith('/apply') ? <ApplyFlow /> : <App />}
  </StrictMode>,
)
