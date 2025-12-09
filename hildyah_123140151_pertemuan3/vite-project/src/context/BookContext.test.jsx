import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { BookProvider, useBooks } from './BookContext'

describe('BookContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should provide initial books', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    expect(result.current.books).toHaveLength(3) // Default books
    expect(result.current.books[0]).toHaveProperty('title')
    expect(result.current.books[0]).toHaveProperty('author')
    expect(result.current.books[0]).toHaveProperty('status')
  })

  it('should add a new book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    const newBook = {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      status: 'to-buy'
    }

    act(() => {
      result.current.addBook(newBook)
    })

    expect(result.current.books).toHaveLength(4)
    expect(result.current.books[0].title).toBe('Clean Code')
    expect(result.current.books[0].author).toBe('Robert C. Martin')
  })

  it('should update an existing book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    const bookId = result.current.books[0].id

    act(() => {
      result.current.updateBook(bookId, { 
        title: 'Updated Title',
        status: 'reading' 
      })
    })

    const updatedBook = result.current.books.find(b => b.id === bookId)
    expect(updatedBook.title).toBe('Updated Title')
    expect(updatedBook.status).toBe('reading')
  })

  it('should delete a book', () => {
    const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>
    const { result } = renderHook(() => useBooks(), { wrapper })
    
    const initialLength = result.current.books.length
    const bookId = result.current.books[0].id

    act(() => {
      result.current.deleteBook(bookId)
    })

    expect(result.current.books).toHaveLength(initialLength - 1)
    expect(result.current.books.find(b => b.id === bookId)).toBeUndefined()
  })

  it('should throw error when useBooks is used outside provider', () => {
    expect(() => {
      renderHook(() => useBooks())
    }).toThrow('useBooks must be used within BookProvider')
  })
})