import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useBookStats from './useBookStats'

describe('useBookStats Hook', () => {
  it('should return zero stats for empty array', () => {
    const { result } = renderHook(() => useBookStats([]))
    
    expect(result.current).toEqual({
      total: 0,
      own: 0,
      reading: 0,
      toBuy: 0
    })
  })

  it('should calculate correct stats for mixed books', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'own' },
      { id: '3', title: 'Book 3', author: 'Author 3', status: 'reading' },
      { id: '4', title: 'Book 4', author: 'Author 4', status: 'to-buy' },
      { id: '5', title: 'Book 5', author: 'Author 5', status: 'to-buy' },
      { id: '6', title: 'Book 6', author: 'Author 6', status: 'to-buy' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current).toEqual({
      total: 6,
      own: 2,
      reading: 1,
      toBuy: 3
    })
  })

  it('should calculate stats for all "own" books', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'own' },
      { id: '3', title: 'Book 3', author: 'Author 3', status: 'own' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current).toEqual({
      total: 3,
      own: 3,
      reading: 0,
      toBuy: 0
    })
  })

  it('should calculate stats for all "reading" books', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'reading' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'reading' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current).toEqual({
      total: 2,
      own: 0,
      reading: 2,
      toBuy: 0
    })
  })

  it('should calculate stats for all "to-buy" books', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'to-buy' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current).toEqual({
      total: 1,
      own: 0,
      reading: 0,
      toBuy: 1
    })
  })

  it('should memoize results when books array does not change', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' }
    ]
    
    const { result, rerender } = renderHook(
      ({ booksArray }) => useBookStats(booksArray),
      { initialProps: { booksArray: books } }
    )
    
    const firstResult = result.current
    
    // Rerender with same books array reference
    rerender({ booksArray: books })
    
    // Result should be the same object (memoized)
    expect(result.current).toBe(firstResult)
  })

  it('should recalculate when books array changes', () => {
    const books1 = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' }
    ]
    
    const books2 = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'reading' }
    ]
    
    const { result, rerender } = renderHook(
      ({ booksArray }) => useBookStats(booksArray),
      { initialProps: { booksArray: books1 } }
    )
    
    expect(result.current.total).toBe(1)
    
    // Update with new books array
    rerender({ booksArray: books2 })
    
    expect(result.current.total).toBe(2)
    expect(result.current.reading).toBe(1)
  })

  it('should handle single book correctly', () => {
    const books = [
      { id: '1', title: 'Single Book', author: 'Single Author', status: 'own' }
    ]
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current.total).toBe(1)
    expect(result.current.own).toBe(1)
  })

  it('should handle large number of books', () => {
    const books = Array.from({ length: 100 }, (_, i) => ({
      id: `${i}`,
      title: `Book ${i}`,
      author: `Author ${i}`,
      status: i % 3 === 0 ? 'own' : i % 3 === 1 ? 'reading' : 'to-buy'
    }))
    
    const { result } = renderHook(() => useBookStats(books))
    
    expect(result.current.total).toBe(100)
    expect(result.current.own + result.current.reading + result.current.toBuy).toBe(100)
  })

  it('should return consistent stats across multiple renders', () => {
    const books = [
      { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' },
      { id: '2', title: 'Book 2', author: 'Author 2', status: 'reading' }
    ]
    
    const { result, rerender } = renderHook(() => useBookStats(books))
    
    const stats1 = result.current
    rerender()
    const stats2 = result.current
    
    expect(stats1).toEqual(stats2)
  })
})