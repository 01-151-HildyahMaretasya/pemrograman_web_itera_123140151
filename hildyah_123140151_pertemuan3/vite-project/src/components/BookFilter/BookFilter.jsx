import React from 'react'

export default function BookFilter({ status, setStatus }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button onClick={() => setStatus('all')} style={{ fontWeight: status === 'all' ? 'bold' : 'normal' }}>All</button>
      <button onClick={() => setStatus('own')} style={{ fontWeight: status === 'own' ? 'bold' : 'normal' }}>Own</button>
      <button onClick={() => setStatus('reading')} style={{ fontWeight: status === 'reading' ? 'bold' : 'normal' }}>Reading</button>
      <button onClick={() => setStatus('to-buy')} style={{ fontWeight: status === 'to-buy' ? 'bold' : 'normal' }}>To-buy</button>
    </div>
  )
}