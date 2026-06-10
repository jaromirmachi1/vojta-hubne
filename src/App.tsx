import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
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
