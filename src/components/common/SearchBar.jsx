import { useState } from 'react'

function SearchBar() {
  const [search, setSearch] = useState('')
  
  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', search)
    setSearch('')
  }
  
  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs px-2 md:px-0">
      <input
        type="text"
        placeholder="Search restaurants or dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full my-1 py-2 pl-4 pr-4 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-primary-300"
      />
    </form>
  )
}

export default SearchBar