# Sistem Manajemen Perpustakaan - Python OOP

## Deskripsi Project

Sistem Manajemen Perpustakaan adalah aplikasi berbasis Python yang menerapkan konsep **Object-Oriented Programming (OOP)** secara lengkap. Program ini dirancang untuk mengelola koleksi item perpustakaan seperti buku dan majalah dengan fitur-fitur dasar seperti menambah, mencari, meminjam, dan mengembalikan item.

---

## Fitur Utama

### **Menu Interaktif - User Input**
Program ini menggunakan **menu interaktif** di mana pengguna bisa:
- **Input data sendiri** melalui keyboard
- **Memilih menu** dengan nomor (0-8)
- **Validasi input** otomatis
- **Loop menu** sampai user memilih keluar

### 📋 Daftar Fitur (Menu 1-8)

| Menu | Fitur | Deskripsi | Input User |
|------|-------|-----------|------------|
| **1** | Tambah Buku | Menambahkan buku baru ke perpustakaan | ID, Judul, Penulis, Tahun, Halaman |
| **2** | Tambah Majalah | Menambahkan majalah baru ke perpustakaan | ID, Judul, Penerbit, Tahun, Edisi |
| **3** | Tampilkan Semua Item | Menampilkan daftar lengkap semua koleksi | - |
| **4** | Cari berdasarkan Judul | Mencari item dengan kata kunci judul | Keyword judul |
| **5** | Cari berdasarkan ID | Mencari item spesifik dengan ID | ID item |
| **6** | Pinjam Item | Meminjam item dari perpustakaan | ID item |
| **7** | Kembalikan Item | Mengembalikan item yang dipinjam | ID item |
| **8** | Lihat Statistik | Menampilkan ringkasan statistik perpustakaan | - |
| **0** | Keluar | Keluar dari program | - |

---

## Konsep OOP yang Diterapkan

### 1. **Abstract Class & Inheritance** 

#### Abstract Base Class: `LibraryItem`
```python
from abc import ABC, abstractmethod

class LibraryItem(ABC):
    @abstractmethod
    def get_info(self) -> str:
        pass
    
    @abstractmethod
    def get_category(self) -> str:
        pass
```

**Penjelasan:**
- Menggunakan modul `ABC` (Abstract Base Class) dari Python
- Mendefinisikan method abstract yang **harus** diimplementasikan oleh subclass
- Menjadi "blueprint" untuk semua item perpustakaan

#### Inheritance Hierarchy
```
LibraryItem (Abstract)
    ├── Book (Concrete Class)
    └── Magazine (Concrete Class)
```

**Implementasi:**
- `Book`: Mewarisi dari `LibraryItem` dengan atribut khusus (author, pages)
- `Magazine`: Mewarisi dari `LibraryItem` dengan atribut khusus (publisher, issue_number)
- Kedua subclass **wajib** mengimplementasikan method abstract

---

### 2. **Encapsulation** 

#### Access Modifiers

**Private Attributes** (menggunakan `__`)
```python
self.__item_id = item_id      # Hanya bisa diakses dalam class
self.__items = []              # Tidak bisa diakses dari luar
```

**Protected Attributes** (menggunakan `_`)
```python
self._title = title           # Bisa diakses oleh subclass
self._year = year
```

#### Property Decorator
```python
@property
def item_id(self) -> str:
    """Read-only property"""
    return self.__item_id

@property
def title(self) -> str:
    return self._title

@title.setter
def title(self, value: str):
    """Setter dengan validasi"""
    if not value:
        raise ValueError("Judul tidak boleh kosong")
    self._title = value
```

**Keuntungan:**
- Melindungi data penting dari akses langsung
- Validasi data saat setting nilai
- Membuat atribut read-only (seperti `item_id`)

---

### 3. **Polymorphism** 

#### Method Overriding
Setiap subclass mengimplementasikan `get_info()` dengan cara berbeda:

**Book:**
```python
def get_info(self) -> str:
    return f"📚 BUKU\n   Judul: {self.title}\n   Penulis: {self._author}..."
```

**Magazine:**
```python
def get_info(self) -> str:
    return f"📰 MAJALAH\n   Judul: {self.title}\n   Penerbit: {self._publisher}..."
```

#### Polymorphic Behavior
```python
# Satu method, banyak implementasi
for item in library.items:
    print(item.get_info())  # Otomatis memanggil method yang sesuai
```

**Output berbeda tergantung tipe object:**
- Jika `item` adalah `Book` → Tampil format buku
- Jika `item` adalah `Magazine` → Tampil format majalah

---

### 4. **Composition** 

Class `Library` menggunakan **composition** dengan menyimpan collection of `LibraryItem`:

```python
class Library:
    def __init__(self, name: str):
        self.__items: List[LibraryItem] = []  # "Has-a" relationship
```

**Keuntungan:**
- Library "memiliki" banyak LibraryItem
- Fleksibel menambah tipe item baru
- Loose coupling antar class

---

## Cara Menjalankan Program

### Prasyarat
- Python 3.7 atau lebih tinggi
- VSCode (recommended) atau text editor lain

### Langkah-langkah Setup

1. **Download/Clone Project**
   ```bash
   git clone [repository-url]
   cd library-management
   ```

2. **Buka di VSCode**
   ```bash
   code .
   ```

3. **Jalankan Program**
   ```bash
   python main.py
   ```

   Atau di VSCode:
   - Buka `main.py`
   - Tekan `F5` atau klik tombol ▶️ Run

---

## Screenshot Hasil Running Program

### 1. Penambahan Item & Display

### 2. Statistik Perpustakaan

### 3. Pencarian Item

### 4. Peminjaman & Pengembalian

---

## Konsep Penting 

### 1. **Abstract Class**
- Tidak bisa diinstansiasi langsung
- Memaksa subclass implementasi method tertentu
- Menjamin interface consistency

### 2. **Inheritance**
- Code reusability
- Extends functionality parent class
- Override method untuk custom behavior

### 3. **Encapsulation**
- Data hiding dengan access modifiers
- Property untuk controlled access
- Validation di setter

### 4. **Polymorphism**
- One interface, multiple implementations
- Duck typing di Python
- Method overriding