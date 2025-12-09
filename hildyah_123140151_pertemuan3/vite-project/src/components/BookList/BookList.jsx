import React from 'react'
import { BookOpen } from 'lucide-react'
import BookItem from '../BookItem/BookItem'

/**
 * BookList component - displays a list of books or empty state
 * @param {Array} books - Array of book objects to display
 * @param {Function} onEdit - Callback when edit button is clicked
 */
export default function BookList({ books, onEdit }) {
  // Empty state when no books match the filter
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg font-medium mb-2">No books found</p>
        <p className="text-gray-400 text-sm">
          {books === null || books.length === 0 
            ? 'Add your first book to get started!' 
            : 'Try adjusting your search or filter.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {books.map(book => (
        <BookItem 
          key={book.id} 
          book={book} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  )
}