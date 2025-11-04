import React, { useState, useEffect } from 'react'
import { useBooks } from '../../context/BookContext'

const initialForm = { title: '', author: '', status: 'own' }

export default function BookForm({ editBook = null, onDone }) {
  const { addBook, updateBook } = useBooks()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editBook) setForm({ title: editBook.title, author: editBook.author, status: editBook.status })
    else setForm(initialForm)
  }, [editBook])

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.author.trim()) e.author = 'Author is required'
    if (!['own', 'reading', 'to-buy'].includes(form.status)) e.status = 'Invalid status'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    if (editBook) {
      updateBook(editBook.id, form)
      onDone?.()
    } else {
      addBook(form)
      setForm(initialForm)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h3>{editBook ? 'Edit Book' : 'Add Book'}</h3>

      <div style={{ marginBottom: 8 }}>
        <label>
          Title
          <input
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value })}
            aria-label="title-input"
            style={{ display: 'block', width: '100%', padding: 6 }}
          />
        </label>
        {errors.title && <small style={{ color: 'red' }}>{errors.title}</small>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Author
          <input
            value={form.author}
            onChange={e => setForm({...form, author: e.target.value })}
            aria-label="author-input"
            style={{ display: 'block', width: '100%', padding: 6 }}
          />
        </label>
        {errors.author && <small style={{ color: 'red' }}>{errors.author}</small>}
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>
          Status
          <select
            value={form.status}
            onChange={e => setForm({...form, status: e.target.value })}
            aria-label="status-select"
            style={{ display: 'block', width: '100%', padding: 6 }}
          >
            <option value="own">Own</option>
            <option value="reading">Reading</option>
            <option value="to-buy">To buy</option>
          </select>
        </label>
        {errors.status && <small style={{ color: 'red' }}>{errors.status}</small>}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">{editBook ? 'Save' : 'Add'}</button>
        {editBook && <button type="button" onClick={() => onDone?.()}>Cancel</button>}
      </div>
    </form>
  )
}