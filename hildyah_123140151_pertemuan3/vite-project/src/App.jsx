import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { BookOpen, Home, BarChart3 } from 'lucide-react'
import HomePage from './pages/Home/Home'
import StatsPage from './pages/Stats/Stats'
import './App.css'

export default function App() {
  const location = useLocation()

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <div className="header-logo-icon">
              <BookOpen size={24} />
            </div>
            <h1 className="header-title">My Bookshelf</h1>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link
              to="/stats"
              className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
            >
              <BarChart3 size={18} />
              <span>Statistics</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <span>© 2024 My Bookshelf</span>
            <span>•</span>
            <span>Built with React & ❤️</span>
          </p>
        </div>
      </footer>
    </div>
  )
}