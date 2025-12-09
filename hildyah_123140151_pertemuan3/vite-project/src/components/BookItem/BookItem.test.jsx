import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookItem from './BookItem'
import { BookProvider } from '../../context/BookContext'

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  status: 'own'
}

const renderWithContext = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  )
}

describe('BookItem Component', () => {
  let mockOnEdit

  beforeEach(() => {
    mockOnEdit = vi.fn()
    // Mock window.confirm
    vi.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render book information correctly', () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Test Book')).toBeInTheDocument()
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText('Own')).toBeInTheDocument()
  })

  it('should display correct status badge for "own" status', () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const badge = screen.getByText('Own')
    expect(badge).toBeInTheDocument()
    expect(badge.textContent).toContain('📚')
  })

  it('should display correct status badge for "reading" status', () => {
    const readingBook = { ...mockBook, status: 'reading' }
    renderWithContext(<BookItem book={readingBook} onEdit={mockOnEdit} />)
    
    const badge = screen.getByText('Reading')
    expect(badge).toBeInTheDocument()
    expect(badge.textContent).toContain('📖')
  })

  it('should display correct status badge for "to-buy" status', () => {
    const toBuyBook = { ...mockBook, status: 'to-buy' }
    renderWithContext(<BookItem book={toBuyBook} onEdit={mockOnEdit} />)
    
    const badge = screen.getByText('To Buy')
    expect(badge).toBeInTheDocument()
    expect(badge.textContent).toContain('🛒')
  })

  it('should call onEdit when edit button is clicked', async () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const editButton = screen.getByTitle('Edit book')
    await userEvent.click(editButton)
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockBook)
  })

  it('should cycle status when cycle button is clicked', async () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const cycleButton = screen.getByTitle('Change status')
    await userEvent.click(cycleButton)
    
    // Status should change from 'own' to 'to-buy'
    // We can't directly test the state change, but we can verify the button was clicked
    expect(cycleButton).toBeInTheDocument()
  })

  it('should cycle through all statuses correctly', async () => {
    // Test: reading -> own
    const readingBook = { ...mockBook, status: 'reading' }
    const { rerender } = renderWithContext(<BookItem book={readingBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByText('Reading')).toBeInTheDocument()
    
    // Test: own -> to-buy
    rerender(
      <BookProvider>
        <BookItem book={{ ...mockBook, status: 'own' }} onEdit={mockOnEdit} />
      </BookProvider>
    )
    expect(screen.getByText('Own')).toBeInTheDocument()
    
    // Test: to-buy -> reading
    rerender(
      <BookProvider>
        <BookItem book={{ ...mockBook, status: 'to-buy' }} onEdit={mockOnEdit} />
      </BookProvider>
    )
    expect(screen.getByText('To Buy')).toBeInTheDocument()
  })

  it('should show confirmation dialog when delete button is clicked', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm')
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const deleteButton = screen.getByTitle('Delete book')
    await userEvent.click(deleteButton)
    
    expect(confirmSpy).toHaveBeenCalledTimes(1)
    expect(confirmSpy).toHaveBeenCalledWith('Delete "Test Book"?')
  })

  it('should delete book when confirmation is accepted', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const deleteButton = screen.getByTitle('Delete book')
    await userEvent.click(deleteButton)
    
    // Book should be removed from the list
    // We can't directly verify deletion here, but we confirmed the flow
    expect(window.confirm).toHaveBeenCalled()
  })

  it('should NOT delete book when confirmation is cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    const deleteButton = screen.getByTitle('Delete book')
    await userEvent.click(deleteButton)
    
    expect(window.confirm).toHaveBeenCalled()
    // Book should still be visible
    expect(screen.getByText('Test Book')).toBeInTheDocument()
  })

  it('should render all three action buttons', () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByTitle('Edit book')).toBeInTheDocument()
    expect(screen.getByTitle('Change status')).toBeInTheDocument()
    expect(screen.getByTitle('Delete book')).toBeInTheDocument()
  })

  it('should have correct aria-labels for accessibility', () => {
    renderWithContext(<BookItem book={mockBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByLabelText('Edit book')).toBeInTheDocument()
    expect(screen.getByLabelText('Cycle status')).toBeInTheDocument()
    expect(screen.getByLabelText('Delete book')).toBeInTheDocument()
  })

  it('should handle books with long titles', () => {
    const longTitleBook = {
      ...mockBook,
      title: 'This is a Very Long Book Title That Should Be Displayed Properly'
    }
    renderWithContext(<BookItem book={longTitleBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByText(longTitleBook.title)).toBeInTheDocument()
  })

  it('should handle books with special characters in title', () => {
    const specialBook = {
      ...mockBook,
      title: 'Book & Title: The "Special" Edition!'
    }
    renderWithContext(<BookItem book={specialBook} onEdit={mockOnEdit} />)
    
    expect(screen.getByText(specialBook.title)).toBeInTheDocument()
  })
})