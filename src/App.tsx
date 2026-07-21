import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AlternativeHomePage } from './pages/AlternativeHomePage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { CoChystamePage } from './pages/CoChystamePage'
import { KlubPage } from './pages/KlubPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import {
  ShopifyCartRedirectPage,
  ShopifyCollectionRedirectPage,
} from './pages/ShopifyRedirectPage'

function LegacyHomepageRedirect() {
  const { hash, search } = useLocation()
  return <Navigate to={{ pathname: '/', hash, search }} replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/co-chystame" element={<CoChystamePage />} />
        <Route path="/alt" element={<AlternativeHomePage />} />
        <Route path="/klub" element={<KlubPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/homepage/*" element={<LegacyHomepageRedirect />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="/collections/*" element={<ShopifyCollectionRedirectPage />} />
        <Route path="/cart" element={<ShopifyCartRedirectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
