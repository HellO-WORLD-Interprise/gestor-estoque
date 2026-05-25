import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // 👈 Volte para './index.css' para ele ler o @import "tailwindcss"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)