import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with default value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default-value')
    )
    
    expect(result.current[0]).toBe('default-value')
  })

  it('should initialize with value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'))
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'default-value')
    )
    
    expect(result.current[0]).toBe('stored-value')
  })

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    )
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(result.current[0]).toBe('updated')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('updated'))
  })

  it('should work with objects', () => {
    const testObject = { name: 'Test', value: 123 }
    
    const { result } = renderHook(() => 
      useLocalStorage('test-obj', testObject)
    )
    
    expect(result.current[0]).toEqual(testObject)
    
    act(() => {
      result.current[1]({ name: 'Updated', value: 456 })
    })
    
    expect(result.current[0]).toEqual({ name: 'Updated', value: 456 })
  })

  it('should work with arrays', () => {
    const testArray = [1, 2, 3]
    
    const { result } = renderHook(() => 
      useLocalStorage('test-arr', testArray)
    )
    
    expect(result.current[0]).toEqual(testArray)
    
    act(() => {
      result.current[1]([...result.current[0], 4])
    })
    
    expect(result.current[0]).toEqual([1, 2, 3, 4])
  })

  it('should handle corrupted localStorage data', () => {
    localStorage.setItem('test-key', 'invalid-json{')
    
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'fallback')
    )
    
    expect(result.current[0]).toBe('fallback')
  })
})