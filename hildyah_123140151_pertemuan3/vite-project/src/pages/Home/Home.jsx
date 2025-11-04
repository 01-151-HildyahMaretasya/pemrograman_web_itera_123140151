import React, { useMemo, useState } from 'react'
import { useBooks } from '../../context/BookContext'
import BookForm from '../../components/BookForm/BookForm'
import BookList from '../../components/BookList/BookList'
import BookFilter from '../../components/BookFilter/BookFilter'
import SearchBar from '../../components/SearchBar'

export default function Home() {
  const { books } = useBooks()
  const [statusFilter, setStatusFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    let out = books
    if (statusFilter !== 'all') out = out.filter(b => b.status === statusFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    }
    return out
  }, [books, statusFilter, query])

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div>
          <SearchBar query={query} setQuery={setQuery} />
          <BookFilter status={statusFilter} setStatus={setStatusFilter} />
          <div style={{ marginTop: 12 }}>
            <BookList books={filtered} onEdit={setEditing} />
          </div>
        </div>

        <aside>
          <BookForm editBook={editing} onDone={() => setEditing(null)} />
        </aside>
      </div>
    </div>
  )
}
