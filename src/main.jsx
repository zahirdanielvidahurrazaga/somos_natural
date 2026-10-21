import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Inicio nuevo (rama inicio-nuevo). El diseño anterior sigue en src/App.jsx.
import App from './nuevo/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
