import React from 'react'
import { BarChart3 } from 'lucide-react'
import { useBooks } from '../../context/BookContext'
import useBookStats from '../../hooks/useBookStats'

/**
 * Stats page component - displays statistics about book collection
 */
export default function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)

  // Stat card configuration
  const statCards = [
    { 
      label: 'Total Books', 
      value: stats.total, 
      color: 'from-purple-500 to-purple-600', 
      icon: '📚',
      description: 'Books in collection'
    },
    { 
      label: 'Owned', 
      value: stats.own, 
      color: 'from-green-500 to-green-600', 
      icon: '✅',
      description: 'Books you own'
    },
    { 
      label: 'Reading', 
      value: stats.reading, 
      color: 'from-blue-500 to-blue-600', 
      icon: '📖',
      description: 'Currently reading'
    },
    { 
      label: 'To Buy', 
      value: stats.toBuy, 
      color: 'from-orange-500 to-orange-600', 
      icon: '🛒',
      description: 'Books to purchase'
    }
  ]

  // Calculate percentages
  const ownPercentage = stats.total > 0 ? Math.round((stats.own / stats.total) * 100) : 0
  const readingPercentage = stats.total > 0 ? Math.round((stats.reading / stats.total) * 100) : 0

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Statistics</h2>
        <p className="text-gray-600">Overview of your book collection</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{stat.icon}</span>
              <BarChart3 size={24} className="opacity-70" />
            </div>
            <div className="text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-white/90 font-medium mb-1">{stat.label}</div>
            <div className="text-white/70 text-sm">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Progress Sections */}
      {books.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ownership Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📚</span> Ownership Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Books Owned</span>
                  <span className="text-sm font-bold text-green-600">
                    {ownPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${ownPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {stats.own} out of {stats.total} books
                </p>
              </div>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📖</span> Reading Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Currently Reading</span>
                  <span className="text-sm font-bold text-blue-600">
                    {readingPercentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${readingPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {stats.reading} out of {stats.total} books
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Card */}
      {books.length > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white fade-in">
          <h3 className="text-xl font-bold mb-4">Collection Summary</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 mb-1">Completion Rate</p>
              <p className="text-2xl font-bold">{ownPercentage}%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 mb-1">Books to Purchase</p>
              <p className="text-2xl font-bold">{stats.toBuy}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <BarChart3 size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg font-medium mb-2">No data to display</p>
          <p className="text-gray-400 text-sm">Add some books to see your statistics!</p>
        </div>
      )}
    </div>
  )
}