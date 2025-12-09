import React, { useMemo, useState } from 'react'
import { useBooks } from '../../context/BookContext'
import BookForm from '../../components/BookForm/BookForm'
import BookList from '../../components/BookList/BookList'
import BookFilter from '../../components/BookFilter/BookFilter'
import SearchBar from '../../components/SearchBar/SearchBar'

/**
 * Home page component - main page with book list and form
 */
export default function Home() {
  const { books } = useBooks()
  const [statusFilter, setStatusFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)

  /**
   * Filter books based on status and search query
   * Uses useMemo to optimize performance
   */
  const filtered = useMemo(() => {
    let result = books

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter)
    }

    // Filter by search query (title or author)
    if (query.trim()) {
      const searchTerm = query.toLowerCase()
      result = result.filter(b => 
        b.title.toLowerCase().includes(searchTerm) || 
        b.author.toLowerCase().includes(searchTerm)
      )
    }

    return result
  }, [books, statusFilter, query])

  return (
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Main Content - Book List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search Bar */}
        <SearchBar query={query} setQuery={setQuery} />

        {/* Filter Buttons */}
        <BookFilter status={statusFilter} setStatus={setStatusFilter} />

        {/* Results Count */}
        {query.trim() && (
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            Found <span className="font-bold text-blue-600">{filtered.length}</span> book{filtered.length !== 1 ? 's' : ''} 
            {statusFilter !== 'all' && ` in "${statusFilter}"`}
          </div>
        )}

        {/* Book List */}
        <BookList books={filtered} onEdit={setEditing} />
      </div>

      {/* Sidebar - Add/Edit Form */}
      <aside className="lg:col-span-1">
        <BookForm 
          editBook={editing} 
          onDone={() => setEditing(null)} 
        />
      </aside>
    </div>
  )
}