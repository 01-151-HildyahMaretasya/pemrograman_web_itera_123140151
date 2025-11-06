import React from 'react'
import { Edit2, Trash2, RefreshCw } from 'lucide-react'
import { useBooks } from '../../context/BookContext'

/**
 * BookItem component - displays a single book with actions
 * @param {Object} book - Book object
 * @param {Function} onEdit - Callback when edit button is clicked
 */
export default function BookItem({ book, onEdit }) {
  const { deleteBook, updateBook } = useBooks()

  // Cycle through statuses: reading -> own -> to-buy -> reading
  const toggleStatus = () => {
    const statusCycle = {
      'reading': 'own',
      'own': 'to-buy',
      'to-buy': 'reading'
    }
    updateBook(book.id, { status: statusCycle[book.status] })
  }

  // Configuration for each status type
  const statusConfig = {
    own: { 
      bg: 'bg-green-100', 
      text: 'text-green-800', 
      icon: '📚', 
      label: 'Own' 
    },
    reading: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-800', 
      icon: '📖', 
      label: 'Reading' 
    },
    'to-buy': { 
      bg: 'bg-orange-100', 
      text: 'text-orange-800', 
      icon: '🛒', 
      label: 'To Buy' 
    }
  }

  const config = statusConfig[book.status]

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 fade-in">
      <div className="flex justify-between items-start gap-4">
        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">
            {book.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            by {book.author}
          </p>
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
            <span>{config.icon}</span>
            {config.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(book)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit book"
            aria-label="Edit book"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={toggleStatus}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Change status"
            aria-label="Cycle status"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${book.title}"?`)) {
                deleteBook(book.id)
              }
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete book"
            aria-label="Delete book"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}