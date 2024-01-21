import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SectionDataProvider } from './SectionData/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SectionDataProvider>
      <App />
    </SectionDataProvider>
  </React.StrictMode>,
)
