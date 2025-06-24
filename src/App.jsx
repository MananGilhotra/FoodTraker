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
import Chatbot from './components/common/Chatbot.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import './App.css'

function ContactModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-primary-500 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-primary-500">Contact Us</h2>
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">Sector 23 MG Road, Mumbai</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">support@FoodTracker.com</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-primary-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">+91 1234567890</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactOpen, setContactOpen] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    window.openContactModal = () => setContactOpen(true)
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Chatbot />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
        </CartProvider>
      </OrderProvider>
    </Router>
  )
}

export default App