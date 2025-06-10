import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    setIsOpen(false)
  }, [location])
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'bg-white shadow-md py-3' 
      : 'bg-transparent py-5'
  }`
  
  const linkClasses = ({ isActive }) => 
    `font-medium text-sm md:text-base px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'text-primary-500' 
        : isScrolled 
          ? 'text-gray-700 hover:text-primary-500' 
          : 'text-gray-700 hover:text-primary-500'
    }`
  
  return (
    <nav className={navbarClasses}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-primary-500 font-bold text-2xl">Food<span className="text-accent-500">Khoj</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/services" className={linkClasses}>Services</NavLink>
          <NavLink to="/blog" className={linkClasses}>Blog</NavLink>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />
          <Link to="/track/order2" className="btn-primary">
            Track Order
          </Link>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
      } bg-white shadow-md`}>
        <div className="container-custom flex flex-col space-y-4">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/services" className={linkClasses}>Services</NavLink>
          <NavLink to="/blog" className={linkClasses}>Blog</NavLink>
          <div className="pt-2">
            <SearchBar />
          </div>
          <Link to="/track/order2" className="btn-primary w-full text-center">
            Track Order
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar