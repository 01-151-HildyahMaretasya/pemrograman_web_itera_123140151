import React from 'react'
import { Search } from 'lucide-react'

/**
 * SearchBar component for filtering books by title or author
 * @param {string} query - Current search query
 * @param {Function} setQuery - Function to update search query
 */
export default function SearchBar({ query, setQuery }) {
  return (
    <div className="relative">
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      <input
        type="text"
        placeholder="Search by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="search-input"
        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  )
}