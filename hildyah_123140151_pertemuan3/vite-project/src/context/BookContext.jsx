import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [
    // Default example books
    { id: uuidv4(), title: '1984', author: 'George Orwell', status: 'own' },
    { id: uuidv4(), title: 'Atomic Habits', author: 'James Clear', status: 'reading' },
    { id: uuidv4(), title: 'The Psychology of Money', author: 'Morgan Housel', status: 'to-buy' }
  ])

  /**
   * Add a new book to the collection
   * @param {Object} book - Book object with title, author, and status
   */
  const addBook = (book) => {
    setBooks(prev => [{ ...book, id: uuidv4() }, ...prev])
  }

  /**
   * Update an existing book
   * @param {string} id - Book ID
   * @param {Object} updates - Fields to update
   */
  const updateBook = (id, updates) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)))
  }

  /**
   * Delete a book from the collection
   * @param {string} id - Book ID
   */
  const deleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  )
}

/**
 * Custom hook to access book context
 * @returns {Object} Context value with books array and CRUD functions
 */
export function useBooks() {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error('useBooks must be used within BookProvider')
  return ctx
}