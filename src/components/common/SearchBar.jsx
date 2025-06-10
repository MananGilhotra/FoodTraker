import { useState } from 'react'

function SearchBar() {
  const [search, setSearch] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', search)
    setSearch('')
  }
  
  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search restaurants or dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-primary-300"
      />
      <button 
        type="submit"
        className="absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg 
          className="w-5 h-5 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar