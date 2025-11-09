import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookForm from './BookForm'
import { BookProvider } from '../../context/BookContext'

// Wrapper for testing with Context
const renderWithContext = (component) => {
  return render(
    <BookProvider>
      {component}
    </BookProvider>
  )
}

describe('BookForm Component', () => {
  it('should render form with all fields', () => {
    renderWithContext(<BookForm />)
    
    expect(screen.getByLabelText(/book title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/author name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add book/i })).toBeInTheDocument()
  })

  it('should show validation error when title is empty', async () => {
    renderWithContext(<BookForm />)
    
    const submitButton = screen.getByRole('button', { name: /add book/i })
    await userEvent.click(submitButton)
    
    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
  })

  it('should show validation error when author is empty', async () => {
    renderWithContext(<BookForm />)
    
    const titleInput = screen.getByLabelText(/book title/i)
    await userEvent.type(titleInput, 'Test Book')
    
    const submitButton = screen.getByRole('button', { name: /add book/i })
    await userEvent.click(submitButton)
    
    expect(screen.getByText(/author is required/i)).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    renderWithContext(<BookForm />)
    
    const titleInput = screen.getByLabelText(/book title/i)
    const authorInput = screen.getByLabelText(/author name/i)
    
    await userEvent.type(titleInput, 'Test Book')
    await userEvent.type(authorInput, 'Test Author')
    
    const submitButton = screen.getByRole('button', { name: /add book/i })
    await userEvent.click(submitButton)
    
    // Form should be cleared after submission
    expect(titleInput).toHaveValue('')
    expect(authorInput).toHaveValue('')
  })

  it('should render in edit mode when editBook prop is provided', () => {
    const editBook = {
      id: '1',
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'reading'
    }
    
    const mockOnDone = vi.fn()
    renderWithContext(<BookForm editBook={editBook} onDone={mockOnDone} />)
    
    expect(screen.getByDisplayValue('Existing Book')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing Author')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('should call onDone when cancel button is clicked in edit mode', async () => {
    const editBook = {
      id: '1',
      title: 'Test',
      author: 'Test',
      status: 'own'
    }
    
    const mockOnDone = vi.fn()
    renderWithContext(<BookForm editBook={editBook} onDone={mockOnDone} />)
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    await userEvent.click(cancelButton)
    
    expect(mockOnDone).toHaveBeenCalledTimes(1)
  })

  it('should change status color when status is selected', async () => {
    renderWithContext(<BookForm />)
    
    const statusSelect = screen.getByLabelText(/status/i)
    
    await userEvent.selectOptions(statusSelect, 'reading')
    expect(statusSelect).toHaveValue('reading')
    
    await userEvent.selectOptions(statusSelect, 'to-buy')
    expect(statusSelect).toHaveValue('to-buy')
  })
})