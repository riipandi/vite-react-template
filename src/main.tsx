import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'

import './assets/styles/fontface.css'
import './assets/styles/tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
