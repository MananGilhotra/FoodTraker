import { useState, useRef, useEffect } from 'react'
import { restaurants } from '../../utils/mockData'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  
  useEffect(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      setResults([])
      setShowResults(false)
      return
    }
    
    const restMatches = restaurants.filter(r => r.name.toLowerCase().includes(query))
    
    const dishMatches = []
    restaurants.forEach(r => {
      r.menu.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          dishMatches.push({ ...item, restaurant: r })
        }
      })
    })
    const formattedResults = [
      ...restMatches.map(r => ({ type: 'restaurant', id: r.id, name: r.name, image: r.image })),
      ...dishMatches.map(d => ({ type: 'dish', id: d.restaurant.id, name: d.name, image: d.image, restaurant: d.restaurant.name }))
    ]
    setResults(formattedResults)
    setShowResults(true)
  }, [search])

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleResultClick = (id) => {
    setShowResults(false)
    setSearch('')
    navigate(`/restaurant/${id}`)
  }
  
  return (
    <div className="relative w-full max-w-xs px-2 md:px-0" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search restaurants or dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full my-1 py-2 pl-3 pr-3 text-xs sm:text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-primary-300"
        onFocus={() => search && setShowResults(true)}
      />
      {showResults && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto text-xs sm:text-sm">
          {results.map((res, idx) => (
            <button
              key={idx}
              className="flex items-center w-full px-3 py-2 hover:bg-primary-50 text-left"
              onClick={() => handleResultClick(res.id)}
            >
              <img src={res.image} alt={res.name} className="w-7 h-7 rounded object-cover mr-2" />
              <div className="flex-1">
                <div className="font-medium text-xs sm:text-sm">{res.name}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{res.type === 'restaurant' ? 'Restaurant' : `Dish at ${res.restaurant}`}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      {showResults && results.length === 0 && search && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 text-center text-gray-500 text-xs sm:text-sm">
          No results found.
        </div>
      )}
    </div>
  )
}

export default SearchBar