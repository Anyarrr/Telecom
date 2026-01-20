import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Layout } from './Telecom/Layout/Layout.tsx'
import { HomePage } from './Telecom/Pages/HomePage.tsx'
import { TelephonyPage } from './Telecom/Pages/TelephonyPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="telephony" element={<TelephonyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
