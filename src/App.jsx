import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/common/NavBar.jsx';
import Footer from './components/common/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import OrderTracking from './pages/OrderTracking.jsx'
import ScrollToTop from './utils/ScrollToTop.jsx'
import OrderProvider from './Context/OrderContext.jsx';
import CartProvider from './Context/CartContext.jsx';
import Restaurant from './pages/Restaurant.jsx';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
          <h1 className="mt-4 text-xl font-bold text-primary-500">FoodTraker</h1>
          <p className="text-sm text-gray-500 mt-2">Loading amazing food experiences...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <OrderProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/track/:orderId" element={<OrderTracking />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </OrderProvider>
    </Router>
  )
}

export default App