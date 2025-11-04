import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { v4 as uuidv4 } from 'uuid'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [
    // default example
    { id: uuidv4(), title: '1984', author: 'George Orwell', status: 'own' },
    { id: uuidv4(), title: 'Atomic Habits', author: 'James Clear', status: 'reading' }
  ])

  const addBook = (book) => {
    setBooks(prev => [{ ...book, id: uuidv4() }, ...prev])
  }

  const updateBook = (id, updates) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)))
  }

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error('useBooks must be used within BookProvider')
  return ctx
}