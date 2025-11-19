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

### Daftar Fitur (Menu 1-8)

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

### Tampilan Awal
<img width="547" height="226" alt="image" src="https://github.com/user-attachments/assets/3f6ab418-e614-4361-b7fe-75a85ee3217f" />

### 1. Penambahan Buku
<img width="557" height="170" alt="image" src="https://github.com/user-attachments/assets/858751d7-3458-4bcf-b0ec-95e13a693469" />

### 2. Tambah Majalah
<img width="508" height="181" alt="image" src="https://github.com/user-attachments/assets/d75e6e64-96bf-44b0-9a09-24eb055fdb6b" />

### 3. Tampilkan Semua Item
<img width="529" height="298" alt="image" src="https://github.com/user-attachments/assets/04807f50-e0a7-4f05-b4ab-4df735a7de13" />

### 4. Cari Item berdasarkan Judul
<img width="482" height="230" alt="image" src="https://github.com/user-attachments/assets/8c66ec6c-eb0f-4c61-9cf3-6e90fa7878b2" />

### 5. Cari Item berdasarkan ID
<img width="470" height="101" alt="image" src="https://github.com/user-attachments/assets/d9a1ad2a-6f19-4969-a841-22898328084b" />
<img width="503" height="226" alt="image" src="https://github.com/user-attachments/assets/a19c079c-6847-4845-857c-7abf251829d4" />

### 6. Pinjam Item
<img width="487" height="103" alt="image" src="https://github.com/user-attachments/assets/325f4e3c-22fd-4c09-b979-a0a8bb1b8c69" />

### 7. Kembalikan Item
<img width="490" height="101" alt="image" src="https://github.com/user-attachments/assets/a62b0cbf-1d61-423d-ac51-201b2b82d8cc" />

### 8. Lihat Statistik
<img width="470" height="158" alt="image" src="https://github.com/user-attachments/assets/675ff85d-fe16-4996-bb08-a91d6fc85957" />

### 0. Keluar
<img width="476" height="86" alt="image" src="https://github.com/user-attachments/assets/17b06dc6-5763-462c-9ff1-35267a60362e" />

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
