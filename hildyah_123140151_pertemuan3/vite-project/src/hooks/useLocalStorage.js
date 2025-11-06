import { useState, useEffect } from 'react'

/**
 * Custom hook for syncing state with localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {Array} [state, setState] tuple
 */
export default function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or use initialValue
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initialValue
    } catch (err) {
      console.error('useLocalStorage initial parse error:', err)
      return initialValue
    }
  })

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (err) {
      console.error('useLocalStorage setItem error:', err)
    }
  }, [key, state])

  return [state, setState]
}