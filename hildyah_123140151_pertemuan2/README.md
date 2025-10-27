# 📊 Personal Dashboard - Next Gen JavaScript

**Nama:** Hildyah Maretasya  
**NIM:** 123140151  
**Kelas:** RB

---

## Deskripsi

Personal Dashboard adalah aplikasi web interaktif untuk mengelola tugas harian dan catatan pribadi. Aplikasi ini dibangun menggunakan fitur-fitur modern JavaScript (ES6+) dan menyimpan data secara lokal di browser menggunakan localStorage.

---

## Fitur Utama

### 1. **Manajemen Tugas**
- ➕ Tambah tugas baru dengan informasi lengkap (nama, tanggal, prioritas, catatan)
- ✏️ Edit tugas yang sudah ada
- ❌ Hapus tugas
- ✅ Tandai tugas selesai/belum selesai
- 🔍 Filter tugas (Semua/Aktif/Selesai)
- 📊 Statistik real-time (Total/Selesai/Belum Selesai)

### 2. **Prioritas Tugas**
- Prioritas Tinggi
- Prioritas Sedang
- Prioritas Rendah

### 3. **Catatan Singkat**
- Tulis dan simpan catatan pribadi
- Timestamp otomatis saat menyimpan
- Hapus catatan

### 4. **Export/Import Data**
- 📥 Export tugas ke file JSON
- 📤 Import tugas dari file JSON
- 🗑️ Hapus semua tugas

### 5. **Informasi Real-time**
- Jam digital yang berjalan
- Deteksi timezone otomatis

---

## Screenshot

### Tampilan Utama
<img width="544" height="443" alt="image" src="https://github.com/user-attachments/assets/a20dfbe2-f7a8-462e-a14a-900d03596880" />

### Form Tambah Tugas
<img width="524" height="380" alt="image" src="https://github.com/user-attachments/assets/e7f36717-8105-4a7b-98a5-148de42ea4f0" />

### Form Edit Tugas
<img width="524" height="380" alt="image" src="https://github.com/user-attachments/assets/ba7a4e1c-0327-4e31-b723-91751ae9ca17" />

### Form Hapus Tugas
<img width="524" height="310" alt="image" src="https://github.com/user-attachments/assets/461d2bab-53d7-4f09-9257-2052b241d9fc" />

### Filter dan Statistik
<img width="506" height="318" alt="image" src="https://github.com/user-attachments/assets/e8e234c0-7417-4480-8954-22ca684d4ae4" />

### Catatan Singkat
<img width="300" height="271" alt="image" src="https://github.com/user-attachments/assets/eae5c5f4-80e3-47c4-a2df-04fc57592a4f" />

---

## Fitur ES6+ yang Diimplementasikan

| Fitur | Deskripsi | Status |
|-------|------------|--------|
| `let` & `const` | Deklarasi variabel modern yang aman | ✅ |
| **Arrow Function** | >3 fungsi ditulis dalam bentuk arrow function | ✅ |
| **Template Literals** | Render dinamis elemen tugas dan pesan kosong | ✅ |
| **Async / Await** | Digunakan untuk simulasi proses asinkron (delay, save, import, dsb) | ✅ |
| **Classes** | 3 Class utama: `Task`, `StorageManager`, `DashboardApp` | ✅ |
| **Spread Operator** | Untuk menggabungkan data import dan data lokal | ✅ |
| **Destructuring** | Digunakan saat memetakan data dari localStorage | ✅ |
| **Promises** | Diterapkan melalui fungsi `delay()` | ✅ |
| **Default Parameters** | Pada konstruktor dan fungsi asinkron | ✅ |

### Implementasi Tambahan:

| Fitur | Jumlah | Keterangan |
|-------|--------|------------|
| **Spread Operator** | 2+ | `[...validTasks, ...this.tasks]` |
| **Array Methods** | 10+ | `map()`, `filter()`, `find()`, `forEach()` |
| **Destructuring** | Tersedia | Bisa digunakan pada parameter |
| **Default Parameters** | 3+ | `due = '', notes = '', priority = 'medium'` |
| **Promises** | 2+ | `new Promise(resolve => setTimeout(resolve, ms))` |
| **IIFE** | 1 | `(function init() { ... })()` |

---

## Struktur Kode

### **1. Class `Task`**
Model data untuk tugas dengan properties:
- `id`, `text`, `due`, `notes`, `priority`, `completed`, `createdAt`
- Methods: `toggleComplete()`, `getPriorityLabel()`, `getFormattedDate()`

### **2. Class `StorageManager`**
Mengelola operasi localStorage:
- `load()` - Membaca data dari localStorage
- `save()` - Menyimpan data ke localStorage
- `clear()` - Menghapus data dari localStorage

### **3. Class `DashboardApp`**
Main application logic:
- CRUD operations untuk tasks
- Event handling
- Rendering UI
- State management

---

## Penyimpanan Data

Aplikasi menggunakan **localStorage** untuk menyimpan data secara persisten di browser:

| Key | Data | Format |
|-----|------|--------|
| `pd_tasks_v3` | Daftar tugas | JSON Array |
| `pd_notes_v3` | Catatan pribadi | JSON Object |

Data akan tetap tersimpan meskipun browser ditutup, kecuali localStorage dibersihkan secara manual.

---

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan custom properties (CSS Variables)
- **JavaScript ES6+** - Logic aplikasi
- **localStorage API** - Penyimpanan data lokal
- **No Framework/Library** - Pure Vanilla JavaScript

---

## Cara Menggunakan

1. Buka file `index.html` di browser.  
2. Tambahkan tugas melalui form di bagian “Daftar Tugas”.  
3. Klik tombol `○` untuk menandai tugas selesai.  
4. Gunakan filter untuk menampilkan kategori tugas tertentu.  
5. Catat ide di bagian “Catatan Pribadi”.  
6. Data akan otomatis tersimpan di perangkat Anda (localStorage). 

---

## Acknowledgments

- Modern JavaScript features (ES6+)
- localStorage API Documentation
- CSS Grid & Flexbox
- Dark Theme Design Inspiration

---

**© 2025 Hildyah Maretasya - Personal Dashboard**
