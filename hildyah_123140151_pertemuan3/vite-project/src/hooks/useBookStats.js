import { useMemo } from 'react'

/**
 * Custom hook to calculate book statistics
 * Uses useMemo to prevent unnecessary recalculations
 * @param {Array} books - Array of book objects
 * @returns {Object} Statistics object with total, own, reading, toBuy counts
 */
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length
    const own = books.filter(b => b.status === 'own').length
    const reading = books.filter(b => b.status === 'reading').length
    const toBuy = books.filter(b => b.status === 'to-buy').length
    
    return { 
      total, 
      own, 
      reading, 
      toBuy 
    }
  }, [books])
}