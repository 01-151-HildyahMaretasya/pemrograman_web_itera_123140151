import React from 'react'
import { useBooks } from '../../context/BookContext'
import useBookStats from '../../hooks/useBookStats'

export default function Stats() {
  const { books } = useBooks()
  const stats = useBookStats(books)

  return (
    <div>
      <h2>Stats</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div>Total</div>
          <div style={{ fontSize: 24 }}>{stats.total}</div>
        </div>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div>Own</div>
          <div style={{ fontSize: 24 }}>{stats.own}</div>
        </div>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div>Reading</div>
          <div style={{ fontSize: 24 }}>{stats.reading}</div>
        </div>
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
          <div>To buy</div>
          <div style={{ fontSize: 24 }}>{stats.toBuy}</div>
        </div>
      </div>
    </div>
  )
}