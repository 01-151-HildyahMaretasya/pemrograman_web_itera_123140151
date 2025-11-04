import React from 'react'

export default function SearchBar({ query, setQuery }) {
  return (
    <input
      placeholder="Search by title or author..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      aria-label="search-input"
      style={{ padding: 8, width: '100%', marginBottom: 12 }}
    />
  )
}