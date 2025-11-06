import React, { useState, useEffect } from 'react'
import { Plus, Edit2, X } from 'lucide-react'
import { useBooks } from '../../context/BookContext'

const initialForm = { title: '', author: '', status: 'own' }

/**
 * BookForm component - form for adding/editing books
 * @param {Object} editBook - Book object to edit (null for add mode)
 * @param {Function} onDone - Callback when form is submitted or cancelled
 */
export default function BookForm({ editBook = null, onDone }) {
  const { addBook, updateBook } = useBooks()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  // Update form when editBook changes
  useEffect(() => {
    if (editBook) {
      setForm({ 
        title: editBook.title, 
        author: editBook.author, 
        status: editBook.status 
      })
    } else {
      setForm(initialForm)
    }
    setErrors({}) // Clear errors when switching mode
  }, [editBook])

  /**
   * Validate form fields
   * @returns {boolean} True if valid, false otherwise
   */
  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.author.trim()) e.author = 'Author is required'
    if (!['own', 'reading', 'to-buy'].includes(form.status)) {
      e.status = 'Invalid status'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /**
   * Handle form submission
   */
  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return

    if (editBook) {
      updateBook(editBook.id, form)
      onDone?.()
    } else {
      addBook(form)
      setForm(initialForm) // Reset form after adding
    }
  }

  // Status color schemes
  const statusColors = {
    own: 'bg-green-50 border-green-200',
    reading: 'bg-blue-50 border-blue-200',
    'to-buy': 'bg-orange-50 border-orange-200'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {editBook ? <Edit2 size={20} /> : <Plus size={20} />}
          {editBook ? 'Edit Book' : 'Add New Book'}
        </h3>
        {editBook && (
          <button 
            onClick={onDone} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close edit mode"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Book Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value })}
            placeholder="Enter book title"
            aria-label="title-input"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.title ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.title}
            </p>
          )}
        </div>

        {/* Author Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.author}
            onChange={e => setForm({...form, author: e.target.value })}
            placeholder="Enter author name"
            aria-label="author-input"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.author ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span> {errors.author}
            </p>
          )}
        </div>

        {/* Status Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={form.status}
            onChange={e => setForm({...form, status: e.target.value })}
            aria-label="status-select"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer ${statusColors[form.status]}`}
          >
            <option value="own">📚 Own</option>
            <option value="reading">📖 Reading</option>
            <option value="to-buy">🛒 To Buy</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95"
          >
            {editBook ? '💾 Save Changes' : '➕ Add Book'}
          </button>
          {editBook && (
            <button
              onClick={onDone}
              className="px-6 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}