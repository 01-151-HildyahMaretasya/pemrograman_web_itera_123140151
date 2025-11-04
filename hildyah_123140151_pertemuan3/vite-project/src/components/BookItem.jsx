import React from 'react'
import { useBooks } from '../context/BookContext'

export default function BookItem({ book, onEdit }) {
  const { deleteBook, updateBook } = useBooks()

  const toggleStatus = () => {
    const next = book.status === 'reading' ? 'own' : (book.status === 'own' ? 'to-buy' : 'own')
    updateBook(book.id, { status: next })
  }

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 'bold' }}>{book.title}</div>
        <div style={{ fontSize: 13 }}>{book.author}</div>
        <div style={{ fontSize: 12, color: '#666' }}>Status: {book.status}</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => deleteBook(book.id)}>Delete</button>
        <button onClick={toggleStatus} title="Cycle status">Cycle</button>
      </div>
    </div>
  )
}