import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import BookList from './BookList'
import { BookProvider } from '../../context/BookContext'

const mockBooks = [
  { id: '1', title: 'Book 1', author: 'Author 1', status: 'own' },
  { id: '2', title: 'Book 2', author: 'Author 2', status: 'reading' },
  { id: '3', title: 'Book 3', author: 'Author 3', status: 'to-buy' }
]

const renderWithContext = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  )
}

describe('BookList Component', () => {
  it('should render list of books', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={mockBooks} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Book 1')).toBeInTheDocument()
    expect(screen.getByText('Book 2')).toBeInTheDocument()
    expect(screen.getByText('Book 3')).toBeInTheDocument()
    expect(screen.getByText('by Author 1')).toBeInTheDocument()
  })

  it('should show empty state when no books provided', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={[]} onEdit={mockOnEdit} />)
    
    expect(screen.getByText(/no books found/i)).toBeInTheDocument()
    expect(screen.getByText(/add your first book/i)).toBeInTheDocument()
  })

  it('should show empty state when books is null', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={null} onEdit={mockOnEdit} />)
    
    expect(screen.getByText(/no books found/i)).toBeInTheDocument()
  })

  it('should render correct number of BookItem components', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={mockBooks} onEdit={mockOnEdit} />)
    
    // Each book has a title heading
    const bookTitles = screen.getAllByRole('heading', { level: 4 })
    expect(bookTitles).toHaveLength(3)
  })

  it('should display book status correctly', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={mockBooks} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Own')).toBeInTheDocument()
    expect(screen.getByText('Reading')).toBeInTheDocument()
    expect(screen.getByText('To Buy')).toBeInTheDocument()
  })

  it('should render action buttons for each book', () => {
    const mockOnEdit = vi.fn()
    renderWithContext(<BookList books={mockBooks} onEdit={mockOnEdit} />)
    
    const editButtons = screen.getAllByTitle('Edit book')
    const deleteButtons = screen.getAllByTitle('Delete book')
    const cycleButtons = screen.getAllByTitle('Change status')
    
    expect(editButtons).toHaveLength(3)
    expect(deleteButtons).toHaveLength(3)
    expect(cycleButtons).toHaveLength(3)
  })
})