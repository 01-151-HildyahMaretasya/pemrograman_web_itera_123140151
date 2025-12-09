import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar Component', () => {
  it('should render search input', () => {
    const mockSetQuery = vi.fn()
    render(<SearchBar query="" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    expect(input).toBeInTheDocument()
  })

  it('should display current query value', () => {
    const mockSetQuery = vi.fn()
    render(<SearchBar query="test query" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    expect(input).toHaveValue('test query')
  })

  it('should call setQuery when user types', async () => {
    const mockSetQuery = vi.fn()
    render(<SearchBar query="" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    await userEvent.type(input, 'new search')
    
    // Should be called for each character typed
    expect(mockSetQuery).toHaveBeenCalled()
    expect(mockSetQuery).toHaveBeenCalledTimes(10) // 'new search' = 10 characters
  })

  it('should call setQuery with correct value', async () => {
    const mockSetQuery = vi.fn()
    render(<SearchBar query="" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    await userEvent.type(input, 'a')
    
    expect(mockSetQuery).toHaveBeenCalledWith('a')
  })

  it('should render search icon', () => {
    const mockSetQuery = vi.fn()
    const { container } = render(<SearchBar query="" setQuery={mockSetQuery} />)
    
    // Check if SVG icon is rendered
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('should allow clearing the search', async () => {
    const mockSetQuery = vi.fn()
    render(<SearchBar query="test" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    await userEvent.clear(input)
    
    expect(mockSetQuery).toHaveBeenCalled()
  })

  it('should have empty value after clearing', async () => {
    const mockSetQuery = vi.fn()
    const { rerender } = render(<SearchBar query="previous" setQuery={mockSetQuery} />)
    
    const input = screen.getByPlaceholderText(/search by title or author/i)
    await userEvent.clear(input)
    
    // Rerender with empty query to simulate state update
    rerender(<SearchBar query="" setQuery={mockSetQuery} />)
    
    expect(input).toHaveValue('')
  })
})