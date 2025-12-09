# 📚 My Bookshelf - Personal Book Collection Manager
**My Bookshelf** adalah aplikasi web untuk mengelola koleksi buku pribadi. Dibangun dengan React dan dilengkapi dengan fitur-fitur canggih untuk memudahkan tracking buku yang miliki, sedang baca, atau ingin beli.

---

## Fitur Utama

### Manajemen Buku
- ✅ **Tambah Buku Baru**: Input judul, penulis, dan status buku
- ✏️ **Edit Buku**: Update informasi buku yang sudah ada
- 🗑️ **Hapus Buku**: Hapus buku dari koleksi dengan konfirmasi
- 🔄 **Cycle Status**: Ubah status buku dengan satu klik (Reading → Own → To Buy → Reading)

### Pencarian & Filter
- 🔎 **Search Bar**: Cari buku berdasarkan judul atau nama penulis
- 🏷️ **Filter Status**: Filter buku berdasarkan kategori (All, Owned, Reading, To Buy)
- 📊 **Real-time Updates**: Filter dan pencarian bekerja secara real-time

### Statistik
- 📊 **Dashboard Statistik**: Lihat overview koleksi buku Anda
- 📉 **Progress Tracking**: Monitor persentase buku yang dimiliki dan sedang dibaca
- 🎯 **Visual Cards**: Statistik ditampilkan dalam card yang menarik dan informatif

### Penyimpanan Data
- 💽 **LocalStorage**: Data tersimpan otomatis di browser
- 🔄 **Auto-sync**: Perubahan langsung tersinkronisasi
- 🛡️ **Data Persistence**: Data tetap tersimpan meski browser ditutup

---

## Teknologi yang Digunakan

### Core Technologies
- **React 18.x** - Library JavaScript untuk membangun UI
- **React Router DOM** - Navigasi multi-halaman
- **Lucide React** - Icon library modern
- **Vite** - Build tool yang cepat

### React Features Implemented
| Feature | Implementation | Location |
|---------|---------------|----------|
| **useState** | State management untuk form, filter, search | `Home.jsx`, `BookForm.jsx` |
| **useEffect** | Sync dengan localStorage | `useLocalStorage.js` |
| **useContext** | Global state untuk books | `BookContext.jsx` |
| **useMemo** | Optimasi filter & statistik | `Home.jsx`, `useBookStats.js` |
| **Custom Hooks** | `useLocalStorage`, `useBookStats` | `hooks/` folder |
| **Context API** | BookContext untuk state management | `context/BookContext.jsx` |
| **React Router** | Navigasi Home & Stats page | `App.jsx` |

---

## 📁 Struktur Folder

```
vite-project/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── components/           # Reusable Components
│   │   ├── BookFilter/
│   │   │   └── BookFilter.jsx
│   │   │   └── BookFilter.test.jsx
│   │   ├── BookForm/
│   │   │   └── BookForm.jsx
│   │   │   └── BookForm.test.jsx
│   │   ├── BookItem/
│   │   │   └── BookItem.jsx
│   │   │   └── BookItem.test.jsx
│   │   ├── BookList/
│   │   │   └── BookList.jsx
│   │   │   └── BookList.test.jsx
│   │   └── SearchBar/
│   │   │   └── SearchBar.jsx
│   │   │   └── SearchBar.test.jsx
│   │
│   ├── context/              # Context API
│   │   └── BookContext.jsx
│   │   └── BookContext.testjsx
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── useBookStats.js
│   │   └── useBookStats.test.js
│   │   └── useLocalStorage.js
│   │   └── useBookStorage.test.js
│   │
│   ├── pages/                # Page Components
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   └── Stats/
│   │       └── Stats.jsx
│   │
│   ├── test/                # testing
│   │   ├── setup.js
│   │
│   ├── App.jsx               # Main App Component
│   ├── App.css               # Main Styles
│   ├── index.css             # Global Styles
│   └── main.jsx              # Entry Point
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Instalasi dan Cara Menjalankan

### Prerequisites
Pastikan Anda sudah menginstall:
- **Node.js** (v16 atau lebih tinggi)
- **npm** atau **yarn**

### Langkah Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd vite-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Jalankan development server**
```bash
npm run dev
```

4. **Buka browser**
```
http://localhost:5173
```

### Build untuk Production

```bash
npm run build
```

Output akan tersimpan di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

---

## Screenshot Aplikasi

### Home Page - Book List
<img width="959" height="414" alt="image" src="https://github.com/user-attachments/assets/dc6a8ef0-504a-43d2-a964-5f8620f3954e" />

### ➕ Add Book Form
<img width="959" height="413" alt="image" src="https://github.com/user-attachments/assets/2d37be82-de3e-4376-a266-9e53d07ed425" />

### ✏️ Edit Book
<img width="959" height="412" alt="image" src="https://github.com/user-attachments/assets/ec0fb8d2-7343-41ca-9118-b17d8c54eca8" />

### 📊 Statistics Page
<img width="959" height="410" alt="image" src="https://github.com/user-attachments/assets/0c483e88-168b-4fbb-a37e-62f702bfce49" />


### 🔍 Search & Filter
<img width="959" height="408" alt="image" src="https://github.com/user-attachments/assets/c9d35ae0-445c-45a8-b73d-0b7676e34802" />

<img width="959" height="410" alt="image" src="https://github.com/user-attachments/assets/426fec51-a45a-4844-ab7b-798b68b88596" />

---

## 🎯 Penjelasan Fitur React

### 1. **State Management dengan useState**
```jsx
// Home.jsx
const [statusFilter, setStatusFilter] = useState('all');
const [query, setQuery] = useState('');
const [editing, setEditing] = useState(null);
```
**Penggunaan**: Mengelola state lokal untuk filter, search query, dan mode editing.

### 2. **Side Effects dengan useEffect**
```jsx
// useLocalStorage.js
useEffect(() => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error('useLocalStorage setItem error:', err);
  }
}, [key, state]);
```
**Penggunaan**: Sinkronisasi otomatis state dengan localStorage setiap ada perubahan.

### 3. **Context API untuk Global State**
```jsx
// BookContext.jsx
const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);
  
  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}
```
**Penggunaan**: Menyediakan state dan fungsi CRUD untuk seluruh aplikasi tanpa prop drilling.

### 4. **Custom Hook - useLocalStorage**
```jsx
// hooks/useLocalStorage.js
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState];
}
```
**Penggunaan**: Abstraksi logika localStorage untuk reusability.

### 5. **Custom Hook - useBookStats**
```jsx
// hooks/useBookStats.js
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const own = books.filter(b => b.status === 'own').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const toBuy = books.filter(b => b.status === 'to-buy').length;
    
    return { total, own, reading, toBuy };
  }, [books]);
}
```
**Penggunaan**: Menghitung statistik dengan memoization untuk performa optimal.

### 6. **Performance Optimization dengan useMemo**
```jsx
// Home.jsx
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
```
**Penggunaan**: Mencegah re-filtering yang tidak perlu, hanya re-compute saat dependencies berubah.

### 7. **React Router untuk Multi-Page Navigation**
```jsx
// App.jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/stats" element={<StatsPage />} />
</Routes>
```
**Penggunaan**: Navigasi antar halaman tanpa reload browser (SPA).

### 8. **Reusable Components**

#### 📦 Komponen Utama:
1. **SearchBar** - Input pencarian reusable
2. **BookFilter** - Tombol filter dengan status
3. **BookItem** - Card untuk menampilkan satu buku
4. **BookList** - Container untuk list buku
5. **BookForm** - Form untuk add/edit buku

Setiap komponen menerima props dan bisa digunakan ulang di berbagai bagian aplikasi.

---

## 🧪 Testing

### Menjalankan Test
```bash
npm run test
```

### Test Coverage
```bash
npm run test:coverage
```

```bash
npm run test:ui
```

### 📊 Test Results

![Gambar WhatsApp 2025-11-09 pukul 14 00 10_a6990056](https://github.com/user-attachments/assets/7e55a5a8-c24d-4f29-9372-441b25afee44)

<img width="959" height="412" alt="image" src="https://github.com/user-attachments/assets/d411271e-b0eb-4f5b-8163-0557410f3e19" />

---

## Error Handling

### Form Validation
```jsx
const validate = () => {
  const e = {};
  if (!form.title.trim()) e.title = 'Title is required';
  if (!form.author.trim()) e.author = 'Author is required';
  if (!['own', 'reading', 'to-buy'].includes(form.status)) {
    e.status = 'Invalid status';
  }
  setErrors(e);
  return Object.keys(e).length === 0;
};
```

### LocalStorage Error Handling
```jsx
try {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : initialValue;
} catch (err) {
  console.error('useLocalStorage initial parse error:', err);
  return initialValue;
}
```

### Delete Confirmation
```jsx
onClick={() => {
  if (window.confirm(`Delete "${book.title}"?`)) {
    deleteBook(book.id);
  }
}}
```
