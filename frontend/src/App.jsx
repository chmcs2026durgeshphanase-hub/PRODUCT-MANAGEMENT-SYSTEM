import { Routes, Route } from 'react-router'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import ProductDeatilPage from './Pages/ProductDeatilPage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/product/:id" element={<ProductDeatilPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
