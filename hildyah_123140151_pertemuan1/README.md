# Tugas Praktikum Pemrograman Web – Aplikasi Manajemen Tugas Mahasiswa

Repository ini berisi proyek **Aplikasi Manajemen Tugas Mahasiswa**, dibuat sebagai bagian dari tugas praktikum mata kuliah **Pemrograman Aplikasi Web**.

* **Nama:** Hildyah Maretaysa Araffad
* **NIM:** 123140151
* **Kelas:** RB
* **Program Studi:** Teknik Informatika

---

## 📝 Deskripsi Aplikasi

Aplikasi **Manajemen Tugas Mahasiswa** berfungsi untuk membantu mahasiswa dalam **mengelola daftar tugas akademik**.
Seluruh data disimpan di browser menggunakan `localStorage`, sehingga pengguna dapat menutup dan membuka kembali aplikasi tanpa kehilangan data.

Aplikasi ini dibuat menggunakan:

* **HTML** untuk struktur tampilan,
* **CSS (tema pastel ungu)** untuk desain antarmuka, dan
* **JavaScript** untuk logika aplikasi dan penyimpanan data.

---

### ✨ Fitur Utama

* **CRUD Lengkap:** Tambah, tampilkan, edit, tandai selesai, dan hapus tugas.
* **Penyimpanan Otomatis:** Semua data tugas tersimpan di `localStorage`.
* **Filter & Pencarian:** Memudahkan mencari tugas berdasarkan nama atau status (selesai/belum selesai).
* **Statistik Tugas:** Menampilkan jumlah tugas yang belum selesai secara *real-time*.
* **Validasi Input:** Tidak bisa menyimpan tugas dengan data kosong.
* **Desain Responsif:** Tampilan rapi di perangkat desktop maupun mobile.

---

## 📸 Tampilan Aplikasi

Berikut beberapa cuplikan tampilan aplikasi:

### 1️⃣ Tampilan Utama Saat Aplikasi Dibuka

### 2️⃣ Proses Menambah Tugas

### 3️⃣ Tampilan Daftar Tugas dengan Filter dan Pencarian

### 4️⃣ Tampilan Filter dan Pencarian

### 5️⃣ Tampilan Edit Tugas 

---

## Penjelasan Teknis

### Penggunaan `localStorage`

`localStorage` digunakan untuk menyimpan data tugas secara permanen di sisi klien.
Data tidak akan hilang meskipun browser ditutup atau di-refresh.

1. **Menyimpan Data:**
   Setiap kali pengguna menambah, mengedit, atau menghapus tugas, data akan disimpan ulang ke `localStorage` dalam bentuk string JSON.

   ```javascript
   function saveTasks() {
     localStorage.setItem('tasks', JSON.stringify(tasks));
   }
   ```

2. **Mengambil Data:**
   Saat halaman dibuka, aplikasi akan memuat kembali data tugas dari `localStorage`.

   ```javascript
   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   ```

---

### 🧩 Validasi Form

Sebelum menambah tugas baru, aplikasi akan memeriksa apakah seluruh input telah diisi.
Jika salah satu field kosong, maka akan muncul peringatan:

```javascript
if (!name || !course || !deadline) {
  alert('Semua kolom wajib diisi!');
  return;
}
```

Hal ini mencegah data tidak valid masuk ke daftar tugas.

---

## 💻 Cara Menjalankan Aplikasi (Langkah Penggunaan di Web)

1. **Buka Halaman Aplikasi**
   Setelah halaman dibuka, kamu akan melihat judul *“Manajemen Tugas Mahasiswa”* dan daftar tugas (jika sudah pernah menambahkan sebelumnya).

2. **Menambahkan Tugas Baru**

   * Isi kolom:

     * **Nama Tugas** → misal “Laporan AI”
     * **Mata Kuliah** → misal “Kecerdasan Buatan”
     * **Deadline** → pilih tanggal di kalender
   * Klik tombol **“Tambah Tugas”**.
   * Tugas baru akan muncul di daftar dengan status *Belum Selesai*.

3. **Menandai Tugas Selesai**

   * Klik tombol **✔** di samping tugas yang sudah dikerjakan.
   * Tugas akan berubah menjadi tampilan *coret* dan warna lebih lembut.

4. **Mengedit Tugas**

   * Klik tombol **✏ (Edit)** pada tugas yang ingin diubah.
   * Akan muncul prompt untuk mengganti *nama tugas*, *mata kuliah*, dan *deadline*.
   * Setelah dikonfirmasi, data tugas akan diperbarui.

5. **Menghapus Tugas**

   * Klik tombol **🗑 (Hapus)** untuk menghapus tugas yang sudah tidak dibutuhkan.
   * Data akan langsung hilang dari daftar dan dari penyimpanan lokal.

6. **Menggunakan Filter dan Pencarian**

   * Gunakan dropdown di bagian atas untuk menampilkan:

     * Semua tugas
     * Hanya tugas selesai
     * Hanya tugas belum selesai
   * Atau ketik di kolom **“Cari tugas…”** untuk mencari tugas tertentu.

7. **Melihat Statistik Tugas**

   * Di bagian bawah daftar akan muncul jumlah tugas yang *belum selesai* secara otomatis.

---

## 🎨 Teknologi yang Digunakan

| Teknologi                     | Fungsi                                                    |
| ----------------------------- | --------------------------------------------------------- |
| **HTML5**                     | Struktur halaman dan elemen form                          |
| **CSS3 (Pastel Purple/Pink)** | Desain UI lembut dan responsif                            |
| **JavaScript (Vanilla JS)**   | Logika CRUD, validasi, filter, dan penyimpanan data lokal |


