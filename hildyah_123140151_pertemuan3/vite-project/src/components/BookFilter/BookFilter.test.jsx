import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookFilter from './BookFilter'

describe('BookFilter Component', () => {
  it('should render all filter buttons', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    expect(screen.getByText('All Books')).toBeInTheDocument()
    expect(screen.getByText('Owned')).toBeInTheDocument()
    expect(screen.getByText('Reading')).toBeInTheDocument()
    expect(screen.getByText('To Buy')).toBeInTheDocument()
  })

  it('should render all filter emojis', () => {
    const mockSetStatus = vi.fn()
    const { container } = render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    expect(container.textContent).toContain('📚')
    expect(container.textContent).toContain('✅')
    expect(container.textContent).toContain('📖')
    expect(container.textContent).toContain('🛒')
  })

  it('should highlight active filter with correct styles', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="own" setStatus={mockSetStatus} />)
    
    const ownButton = screen.getByText('Owned').closest('button')
    // Check for active state classes
    expect(ownButton).toHaveClass('bg-blue-600')
    expect(ownButton).toHaveClass('text-white')
  })

  it('should call setStatus when "all" filter is clicked', async () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="own" setStatus={mockSetStatus} />)
    
    const allButton = screen.getByText('All Books')
    await userEvent.click(allButton)
    
    expect(mockSetStatus).toHaveBeenCalledWith('all')
    expect(mockSetStatus).toHaveBeenCalledTimes(1)
  })

  it('should call setStatus when "own" filter is clicked', async () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const ownButton = screen.getByText('Owned')
    await userEvent.click(ownButton)
    
    expect(mockSetStatus).toHaveBeenCalledWith('own')
  })

  it('should call setStatus when "reading" filter is clicked', async () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const readingButton = screen.getByText('Reading')
    await userEvent.click(readingButton)
    
    expect(mockSetStatus).toHaveBeenCalledWith('reading')
  })

  it('should call setStatus when "to-buy" filter is clicked', async () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const toBuyButton = screen.getByText('To Buy')
    await userEvent.click(toBuyButton)
    
    expect(mockSetStatus).toHaveBeenCalledWith('to-buy')
  })

  it('should have correct aria-labels', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    expect(screen.getByLabelText('Filter by All Books')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by Owned')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by Reading')).toBeInTheDocument()
    expect(screen.getByLabelText('Filter by To Buy')).toBeInTheDocument()
  })

  it('should only have one active filter at a time', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="reading" setStatus={mockSetStatus} />)
    
    const buttons = screen.getAllByRole('button')
    // Check for active state by looking for bg-blue-600 class
    const activeButtons = buttons.filter(btn => btn.classList.contains('bg-blue-600'))
    
    expect(activeButtons).toHaveLength(1)
  })

  it('should change active state when status prop changes', () => {
    const mockSetStatus = vi.fn()
    const { rerender } = render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    let allButton = screen.getByText('All Books').closest('button')
    expect(allButton).toHaveClass('bg-blue-600')
    expect(allButton).toHaveClass('text-white')
    
    rerender(<BookFilter status="own" setStatus={mockSetStatus} />)
    
    allButton = screen.getByText('All Books').closest('button')
    const ownButton = screen.getByText('Owned').closest('button')
    
    // All button should now be inactive (bg-white)
    expect(allButton).toHaveClass('bg-white')
    expect(allButton).toHaveClass('text-gray-700')
    
    // Own button should be active
    expect(ownButton).toHaveClass('bg-blue-600')
    expect(ownButton).toHaveClass('text-white')
  })

  it('should render buttons in correct order', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toHaveTextContent('All Books')
    expect(buttons[1]).toHaveTextContent('Owned')
    expect(buttons[2]).toHaveTextContent('Reading')
    expect(buttons[3]).toHaveTextContent('To Buy')
  })

  it('should apply inactive styles to non-selected filters', () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const ownButton = screen.getByText('Owned').closest('button')
    const readingButton = screen.getByText('Reading').closest('button')
    
    // Inactive buttons should have bg-white
    expect(ownButton).toHaveClass('bg-white')
    expect(readingButton).toHaveClass('bg-white')
  })

  it('should handle rapid filter changes', async () => {
    const mockSetStatus = vi.fn()
    render(<BookFilter status="all" setStatus={mockSetStatus} />)
    
    const ownButton = screen.getByText('Owned')
    const readingButton = screen.getByText('Reading')
    const toBuyButton = screen.getByText('To Buy')
    
    await userEvent.click(ownButton)
    await userEvent.click(readingButton)
    await userEvent.click(toBuyButton)
    
    expect(mockSetStatus).toHaveBeenCalledTimes(3)
    expect(mockSetStatus).toHaveBeenNthCalledWith(1, 'own')
    expect(mockSetStatus).toHaveBeenNthCalledWith(2, 'reading')
    expect(mockSetStatus).toHaveBeenNthCalledWith(3, 'to-buy')
  })
})