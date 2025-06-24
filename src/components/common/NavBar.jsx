import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isLoginPage = location.pathname === '/login';
  
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
    <nav className={navbarClasses + ' min-h-[56px]'}>
      <div className="container-custom flex flex-col md:flex-row items-center justify-between px-0 sm:px-2">
        <div className="w-full flex items-center justify-between md:w-auto">
          <Link to="/" className="flex items-center">
            <span className="text-primary-500 font-bold text-lg xs:text-xl sm:text-2xl">Food<span className="text-accent-500">Traker</span></span>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none ml-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6 xs:w-5 xs:h-5"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className="w-full flex justify-center md:hidden mt-2 mb-2 px-2"></div>
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/services" className={linkClasses}>Services</NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {!isLoginPage && <SearchBar />}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0 w-full md:w-auto">
          {!isLoginPage && <Link to="/login" className="hidden md:block w-full md:w-auto px-3 py-2 md:px-4 md:py-2 rounded-lg text-primary-500 hover:bg-primary-50 font-semibold transition text-sm md:text-base text-center">Login</Link>}
          {!isLoginPage && <Link to="/signup" className="hidden md:block w-full md:w-auto px-3 py-2 md:px-4 md:py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition text-sm md:text-base text-center">Sign Up</Link>}
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
      } bg-white shadow-lg border-t border-gray-200 w-full`}> 
        <div className="flex flex-col space-y-3 px-4 py-2">
          <NavLink to="/" className={linkClasses + ' w-full text-center py-3'}>Home</NavLink>
          <NavLink to="/about" className={linkClasses + ' w-full text-center py-3'}>About</NavLink>
          <NavLink to="/services" className={linkClasses + ' w-full text-center py-3'}>Services</NavLink>
          {!isLoginPage && <SearchBar />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar