import React from 'react'

/**
 * BookFilter component - filter buttons for book status
 * @param {string} status - Current active filter
 * @param {Function} setStatus - Function to update filter
 */
export default function BookFilter({ status, setStatus }) {
  const filters = [
    { value: 'all', label: 'All Books', emoji: '📚' },
    { value: 'own', label: 'Owned', emoji: '✅' },
    { value: 'reading', label: 'Reading', emoji: '📖' },
    { value: 'to-buy', label: 'To Buy', emoji: '🛒' }
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => setStatus(filter.value)}
          aria-label={`Filter by ${filter.label}`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            status === filter.value
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <span>{filter.emoji}</span>
          <span className="hidden sm:inline">{filter.label}</span>
        </button>
      ))}
    </div>
  )
}