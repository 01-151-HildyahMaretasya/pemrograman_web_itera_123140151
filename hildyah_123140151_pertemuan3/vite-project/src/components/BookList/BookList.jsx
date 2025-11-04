import React from 'react'
import BookItem from '../BookItem'

export default function BookList({ books, onEdit }) {
  if (!books || books.length === 0) return <div>No books found.</div>
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
      {books.map(b => <BookItem key={b.id} book={b} onEdit={onEdit} />)}
    </div>
  )
}