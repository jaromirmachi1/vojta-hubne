import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { LaunchingSoonPage } from './pages/LaunchingSoonPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchingSoonPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
