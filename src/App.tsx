import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
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
        <Route path="/homepage/*" element={<LegacyHomepageRedirect />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="/collections/*" element={<ShopifyCollectionRedirectPage />} />
        <Route path="/cart" element={<ShopifyCartRedirectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
