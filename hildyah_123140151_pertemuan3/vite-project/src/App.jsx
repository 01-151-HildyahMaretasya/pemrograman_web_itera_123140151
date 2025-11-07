import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BookOpen, Home, BarChart3, Search, Edit2, Trash2, RefreshCw, Plus, X } from 'lucide-react';

// ============================================
// CONTEXT & HOOKS
// ============================================

const BookContext = createContext();

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (err) {
      console.error('useLocalStorage initial parse error:', err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error('useLocalStorage setItem error:', err);
    }
  }, [key, state]);

  return [state, setState];
}

function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', [
    { id: '1', title: '1984', author: 'George Orwell', status: 'own' },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'reading' },
    { id: '3', title: 'The Psychology of Money', author: 'Morgan Housel', status: 'to-buy' }
  ]);

  const addBook = (book) => {
    setBooks(prev => [{ ...book, id: Date.now().toString() }, ...prev]);
  };

  const updateBook = (id, updates) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks must be used within BookProvider');
  return ctx;
}

function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const own = books.filter(b => b.status === 'own').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const toBuy = books.filter(b => b.status === 'to-buy').length;
    
    return { total, own, reading, toBuy };
  }, [books]);
}

// ============================================
// COMPONENTS
// ============================================

function SearchBar({ query, setQuery }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
}

function BookFilter({ status, setStatus }) {
  const filters = [
    { value: 'all', label: 'All Books', emoji: '📚' },
    { value: 'own', label: 'Owned', emoji: '✅' },
    { value: 'reading', label: 'Reading', emoji: '📖' },
    { value: 'to-buy', label: 'To Buy', emoji: '🛒' }
  ];

  return (
    <div className="filter-container">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => setStatus(filter.value)}
          className={`filter-btn ${status === filter.value ? 'active' : ''}`}
        >
          <span className="filter-emoji">{filter.emoji}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}

function BookItem({ book, onEdit }) {
  const { deleteBook, updateBook } = useBooks();

  const toggleStatus = () => {
    const statusCycle = {
      'reading': 'own',
      'own': 'to-buy',
      'to-buy': 'reading'
    };
    updateBook(book.id, { status: statusCycle[book.status] });
  };

  const statusConfig = {
    own: { icon: '📚', label: 'Own' },
    reading: { icon: '📖', label: 'Reading' },
    'to-buy': { icon: '🛒', label: 'To Buy' }
  };

  const config = statusConfig[book.status];

  return (
    <div className="book-item">
      <div className="book-item-content">
        <div className="book-info">
          <h4 className="book-title">{book.title}</h4>
          <p className="book-author">by {book.author}</p>
          <span className={`book-status ${book.status}`}>
            <span>{config.icon}</span>
            {config.label}
          </span>
        </div>

        <div className="book-actions">
          <button
            onClick={() => onEdit(book)}
            className="book-action-btn edit"
            title="Edit book"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={toggleStatus}
            className="book-action-btn cycle"
            title="Change status"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Delete "${book.title}"?`)) {
                deleteBook(book.id);
              }
            }}
            className="book-action-btn delete"
            title="Delete book"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function BookList({ books, onEdit }) {
  if (!books || books.length === 0) {
    return (
      <div className="book-list-empty">
        <div className="empty-icon-wrapper">
          <BookOpen size={48} />
        </div>
        <h3 className="book-list-empty-title">No books found</h3>
        <p className="book-list-empty-text">
          Add your first book to get started or adjust your search filters!
        </p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem key={book.id} book={book} onEdit={onEdit} />
      ))}
    </div>
  );
}

function BookForm({ editBook = null, onDone }) {
  const { addBook, updateBook } = useBooks();
  const initialForm = { title: '', author: '', status: 'own' };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editBook) {
      setForm({ 
        title: editBook.title, 
        author: editBook.author, 
        status: editBook.status 
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editBook]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.author.trim()) e.author = 'Author is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    if (editBook) {
      updateBook(editBook.id, form);
      onDone?.();
    } else {
      addBook(form);
      setForm(initialForm);
    }
  };

  return (
    <div className="book-form">
      <div className="book-form-header">
        <h3 className="book-form-title">
          {editBook ? <Edit2 size={20} /> : <Plus size={20} />}
          {editBook ? 'Edit Book' : 'Add New Book'}
        </h3>
        {editBook && (
          <button onClick={onDone} className="book-form-close">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="book-form-content">
        <div className="form-group">
          <label className="form-label">
            Book Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value })}
            placeholder="Enter book title"
            className={`form-input ${errors.title ? 'error' : ''}`}
          />
          {errors.title && (
            <p className="form-error">⚠️ {errors.title}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">
            Author Name <span className="required">*</span>
          </label>
          <input
            type="text"
            value={form.author}
            onChange={e => setForm({...form, author: e.target.value })}
            placeholder="Enter author name"
            className={`form-input ${errors.author ? 'error' : ''}`}
          />
          {errors.author && (
            <p className="form-error">⚠️ {errors.author}</p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            value={form.status}
            onChange={e => setForm({...form, status: e.target.value })}
            className={`form-select ${form.status}`}
          >
            <option value="own">📚 Own</option>
            <option value="reading">📖 Reading</option>
            <option value="to-buy">🛒 To Buy</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="form-btn-primary">
            {editBook ? '💾 Save Changes' : '➕ Add Book'}
          </button>
          {editBook && (
            <button type="button" onClick={onDone} className="form-btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function HomePage() {
  const { books } = useBooks();
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    let result = books;

    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter);
    }

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(searchTerm) || 
        b.author.toLowerCase().includes(searchTerm)
      );
    }

    return result;
  }, [books, statusFilter, query]);

  return (
    <div className="home-container">
      <div className="home-main">
        <SearchBar query={query} setQuery={setQuery} />
        <BookFilter status={statusFilter} setStatus={setStatusFilter} />
        <BookList books={filtered} onEdit={setEditing} />
      </div>
      <aside>
        <BookForm editBook={editing} onDone={() => setEditing(null)} />
      </aside>
    </div>
  );
}

function StatsPage() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const statCards = [
    { 
      label: 'Total Books', 
      value: stats.total, 
      icon: '📚',
      description: 'Books in collection',
      color: 'purple'
    },
    { 
      label: 'Owned', 
      value: stats.own, 
      icon: '✅',
      description: 'Books you own',
      color: 'green'
    },
    { 
      label: 'Reading', 
      value: stats.reading, 
      icon: '📖',
      description: 'Currently reading',
      color: 'blue'
    },
    { 
      label: 'To Buy', 
      value: stats.toBuy, 
      icon: '🛒',
      description: 'Books to purchase',
      color: 'orange'
    }
  ];

  const ownPercentage = stats.total > 0 ? Math.round((stats.own / stats.total) * 100) : 0;
  const readingPercentage = stats.total > 0 ? Math.round((stats.reading / stats.total) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h2>📊 Statistics</h2>
        <p>Overview of your book collection</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-card-header">
              <span className="stat-card-icon">{stat.icon}</span>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
            <div className="stat-card-desc">{stat.description}</div>
          </div>
        ))}
      </div>

      {books.length === 0 ? (
        <div className="book-list-empty">
          <div className="empty-icon-wrapper">
            <BarChart3 size={48} />
          </div>
          <h3 className="book-list-empty-title">No data to display</h3>
          <p className="book-list-empty-text">Add some books to see your statistics!</p>
        </div>
      ) : null}
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <BookProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="header-logo">
              <div className="header-logo-icon">
                <BookOpen size={24} />
              </div>
              <h1 className="header-title">My Bookshelf</h1>
            </div>

            <nav className="header-nav">
              <button
                onClick={() => setCurrentPage('home')}
                className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              >
                <Home size={18} />
                <span>Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('stats')}
                className={`nav-link ${currentPage === 'stats' ? 'active' : ''}`}
              >
                <BarChart3 size={18} />
                <span>Statistics</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="main-content">
          {currentPage === 'home' ? <HomePage /> : <StatsPage />}
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            © 2025 My Bookshelf • 123140151
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-attachment: fixed;
          min-height: 100vh;
          color: #111827;
          -webkit-font-smoothing: antialiased;
          line-height: 1.5;
        }

        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-header {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-logo-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          transition: transform 0.3s ease;
        }

        .header-logo-icon:hover {
          transform: rotate(5deg) scale(1.05);
        }

        .header-title {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .header-nav {
          display: flex;
          gap: 8px;
          background: #f3f4f6;
          padding: 6px;
          border-radius: 14px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #6366f1;
          transform: translateY(-2px);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
          width: 100%;
          flex: 1;
        }

        .home-container {
          display: grid;
          grid-template-columns: 1fr 450px;
          gap: 32px;
          align-items: start;
        }

        .home-main {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .search-container {
          margin-bottom: 0;
        }

        .search-wrapper {
          position: relative;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .search-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .search-wrapper:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15), 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .search-wrapper:focus-within::before {
          transform: scaleX(1);
        }

        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .search-wrapper:focus-within .search-icon {
          color: #6366f1;
        }

        .search-input {
          width: 100%;
          padding: 18px 20px 18px 56px;
          background: transparent;
          border: none;
          font-size: 15px;
          font-weight: 500;
          color: #111827;
        }

        .search-input:focus {
          outline: none;
        }

        .search-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .filter-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          background: white;
          color: #4b5563;
          border: 2px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .filter-btn span {
          position: relative;
          z-index: 1;
        }

        .filter-btn:hover {
          border-color: #6366f1;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
        }

        .filter-btn.active {
          color: white;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
          transform: translateY(-3px);
        }

        .filter-btn.active::before {
          opacity: 1;
        }

        .filter-emoji {
          font-size: 18px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .book-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .book-item {
          background: white;
          padding: 28px;
          border-radius: 18px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .book-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(180deg, #6366f1, #ec4899);
          transform: scaleY(0);
          transition: transform 0.3s ease;
          transform-origin: top;
        }

        .book-item:hover {
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          transform: translateY(-6px);
        }

        .book-item:hover::before {
          transform: scaleY(1);
        }

        .book-item-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }

        .book-info {
          flex: 1;
          min-width: 0;
        }

        .book-title {
          font-weight: 800;
          font-size: 20px;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .book-author {
          color: #6b7280;
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 14px;
        }

        .book-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .book-status:hover {
          transform: scale(1.05);
        }

        .book-status.own {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          color: #065f46;
        }

        .book-status.reading {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1e40af;
        }

        .book-status.to-buy {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          color: #92400e;
        }

        .book-actions {
          display: flex;
          gap: 8px;
        }

        .book-action-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f3f4f6;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
        }

        .book-action-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .book-action-btn.edit {
          color: #6366f1;
        }

        .book-action-btn.edit:hover {
          background: #eef2ff;
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
        }

        .book-action-btn.cycle {
          color: #10b981;
        }

        .book-action-btn.cycle:hover {
          background: #d1fae5;
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
        }

        .book-action-btn.delete {
          color: #ef4444;
        }

        .book-action-btn.delete:hover {
          background: #fee2e2;
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
        }

        .book-list-empty {
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 3px dashed #e5e7eb;
          position: relative;
          overflow: hidden;
        }

        .empty-icon-wrapper {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.3);
          position: relative;
        }

        .empty-icon-wrapper::before {
          content: '';
          position: absolute;
          width: 120px;
          height: 120px;
          border: 3px solid rgba(99, 102, 241, 0.2);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.5; }
        }

        .empty-icon-wrapper svg {
          color: white;
        }

        .book-list-empty-title {
          color: #111827;
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .book-list-empty-text {
          color: #6b7280;
          font-size: 16px;
          font-weight: 500;
          max-width: 400px;
          margin: 0 auto;
        }

        .book-form {
          background: white;
          border-radius: 18px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
          padding: 32px;
          position: sticky;
          top: 120px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .book-form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 3px solid #f3f4f6;
        }

        .book-form-title {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -0.02em;
        }

        .book-form-title svg {
          color: #6366f1;
        }

        .book-form-close {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .book-form-close:hover {
          background: #ef4444;
          color: white;
          transform: rotate(90deg);
        }

        .book-form-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 10px;
          letter-spacing: 0.01em;
        }

        .form-label .required {
          color: #ef4444;
          margin-left: 3px;
        }

        .form-input,
        .form-select {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:hover,
        .form-select:hover {
          border-color: #d1d5db;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .form-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .form-error {
          margin-top: 8px;
          font-size: 13px;
          color: #ef4444;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-select {
          cursor: pointer;
          font-weight: 700;
        }

        .form-select.own {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          border-color: #6ee7b7;
          color: #065f46;
        }

        .form-select.reading {
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          border-color: #93c5fd;
          color: #1e40af;
        }

        .form-select.to-buy {
          background: linear-gradient(135deg, #fed7aa, #fdba74);
          border-color: #fdba74;
          color: #92400e;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          padding-top: 8px;
        }

        .form-btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        .form-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(99, 102, 241, 0.5);
        }

        .form-btn-primary:active {
          transform: translateY(-1px);
        }

        .form-btn-secondary {
          padding: 16px 28px;
          background: #f3f4f6;
          color: #374151;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-btn-secondary:hover {
          background: #e5e7eb;
          transform: translateY(-3px);
        }

        .stats-container {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .stats-header h2 {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.03em;
        }

        .stats-header p {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          font-weight: 500;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
          padding: 32px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--card-color-1), var(--card-color-2));
        }

        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .stat-card.purple { --card-color-1: #a855f7; --card-color-2: #ec4899; }
        .stat-card.green { --card-color-1: #10b981; --card-color-2: #34d399; }
        .stat-card.blue { --card-color-1: #3b82f6; --card-color-2: #60a5fa; }
        .stat-card.orange { --card-color-1: #f59e0b; --card-color-2: #fbbf24; }

        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .stat-card-icon {
          font-size: 48px;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
        }

        .stat-card-value {
          font-size: 48px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 8px;
          letter-spacing: -0.03em;
        }

        .stat-card-label {
          font-weight: 700;
          font-size: 16px;
          color: #374151;
          margin-bottom: 4px;
        }

        .stat-card-desc {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
        }

        .app-footer {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(99, 102, 241, 0.1);
          margin-top: auto;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 28px 40px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
        }

        @media (max-width: 1200px) {
          .home-container {
            grid-template-columns: 1fr;
          }
          
          .book-form {
            position: relative;
            top: 0;
          }
        }

        @media (max-width: 768px) {
          .header-content,
          .main-content,
          .footer-content {
            padding-left: 24px;
            padding-right: 24px;
          }
          
          .header-title {
            font-size: 22px;
          }
          
          .header-logo-icon {
            width: 40px;
            height: 40px;
          }
          
          .nav-link span {
            display: none;
          }
          
          .nav-link {
            padding: 10px 14px;
          }
          
          .book-item {
            padding: 20px;
          }
          
          .book-actions {
            flex-direction: column;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </BookProvider>
  );
}