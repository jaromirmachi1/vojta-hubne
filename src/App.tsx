import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LaunchingSoonPage } from './pages/LaunchingSoonPage'
import { ProductPage } from './pages/ProductPage'
import {
  ShopifyCartRedirectPage,
  ShopifyCollectionRedirectPage,
} from './pages/ShopifyRedirectPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchingSoonPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="/collections/*" element={<ShopifyCollectionRedirectPage />} />
        <Route path="/cart" element={<ShopifyCartRedirectPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
