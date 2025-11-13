# Tugas Praktikum PAW - Sistem Manajemen Nilai Mahasiswa
![Python Version](https://img.shields.io/badge/python-3.7+-blue.svg)

**Nama**: Hildyah Maretasya Araffad
**NIM**: 123140151
**Kelas**: RB 

---

## Tentang Project

**Sistem Manajemen Nilai Mahasiswa** adalah aplikasi berbasis Python yang dirancang untuk membantu pengelolaan data nilai mahasiswa secara efisien. Program ini menyediakan antarmuka terminal yang user-friendly dengan berbagai fitur analisis dan pelaporan.

### Dibuat Untuk:
- Tugas Pemrograman Python
- Manajemen nilai kelas/mata kuliah
- Analisis performa akademik mahasiswa
- Pembelajaran pemrograman modular

### Teknologi:
- **Bahasa**: Python 3.7+
- **Paradigma**: Object-Oriented Programming
- **Arsitektur**: Modular Design Pattern
- **UI**: Terminal/CLI (Command Line Interface)

---

## Fitur

### Fitur Utama

| No | Fitur | Deskripsi |
|----|-------|-----------|
| 1️⃣ | **Tampilkan Data** | Menampilkan semua data mahasiswa dalam format tabel |
| 2️⃣ | **Tambah Mahasiswa** | Input data mahasiswa baru dengan validasi |
| 3️⃣ | **Nilai Tertinggi** | Cari dan tampilkan mahasiswa dengan nilai terbaik |
| 4️⃣ | **Nilai Terendah** | Cari dan tampilkan mahasiswa dengan nilai terendah |
| 5️⃣ | **Filter Grade** | Filter mahasiswa berdasarkan grade (A/B/C/D/E) |
| 6️⃣ | **Rata-rata Kelas** | Hitung rata-rata nilai seluruh kelas |
| 7️⃣ | **Statistik Lengkap** | Tampilkan statistik dan distribusi grade |

### Fitur Tambahan
- ✅ **Auto Calculate**: Perhitungan nilai akhir otomatis
- ✅ **Grade System**: Sistem grading A-E otomatis
- ✅ **Input Validation**: Validasi input untuk mencegah error
- ✅ **Error Handling**: Penanganan error yang comprehensive
- ✅ **Clean UI**: Antarmuka terminal yang rapi dan mudah dipahami
- ✅ **Documentation**: Dokumentasi lengkap dengan docstring

---

## Instalasi

### Metode 1: Download Manual

#### Step 1: Download atau Clone Repository
```bash
# Clone via Git
git clone https://github.com/username/student-management-system.git
cd student-management-system

# Atau download ZIP dan extract
```

#### Step 2: Buat Struktur Folder
```bash
mkdir student-management-system
cd student-management-system
mkdir modules
```

#### Step 3: Buat File-file
Buat file dengan struktur berikut:

```
student-management-system/
├── main.py
├── modules/
│   ├── __init__.py
│   ├── data_manager.py
│   ├── calculator.py
│   ├── display.py
│   └── input_handler.py
└── README.md
```

#### Step 4: Copy-Paste Kode
1. Copy kode dari dokumentasi ke masing-masing file
2. Simpan semua file
3. Pastikan semua file ada di lokasi yang benar

#### Step 5: Verifikasi Instalasi
```bash
# Cek struktur folder
ls -R

# Cek versi Python
python --version

# Test run program
python main.py
```


## 📁 Struktur Folder

```
student-management-system/
│
├── 📄 main.py                          # Program utama (entry point)
│   └── Fungsi: Menjalankan aplikasi dan menu utama
│
├── 📁 modules/                         # Package untuk semua modul
│   │
│   ├── 📄 __init__.py                  # Init file (bisa kosong)
│   │   └── Fungsi: Penanda Python package
│   │
│   ├── 📄 data_manager.py              # Manajemen data
│   │   ├── data_mahasiswa              # List data mahasiswa
│   │   ├── hitung_nilai_akhir()        # Hitung nilai akhir
│   │   ├── tentukan_grade()            # Tentukan grade
│   │   └── tambah_nilai_akhir_dan_grade()
│   │
│   ├── 📄 calculator.py                # Fungsi perhitungan
│   │   ├── cari_nilai_tertinggi()      # Cari nilai max
│   │   ├── cari_nilai_terendah()       # Cari nilai min
│   │   ├── filter_berdasarkan_grade()  # Filter by grade
│   │   └── hitung_rata_rata_kelas()    # Hitung rata-rata
│   │
│   ├── 📄 display.py                   # Fungsi tampilan
│   │   ├── tampilkan_header()          # Header program
│   │   ├── tampilkan_menu()            # Menu utama
│   │   ├── tampilkan_tabel()           # Tabel data
│   │   └── tampilkan_statistik()       # Statistik lengkap
│   │
│   └── 📄 input_handler.py             # Fungsi input
│       └── input_mahasiswa_baru()      # Input data baru
│
└── 📄 README.md                        # Dokumentasi (file ini)
```

### Penjelasan Setiap File:

| File | Lines of Code | Fungsi Utama |
|------|---------------|--------------|
| `main.py` | ~100 | Entry point, menu loop, routing |
| `data_manager.py` | ~80 | Data storage, basic calculations |
| `calculator.py` | ~60 | Analysis & filtering functions |
| `display.py` | ~90 | UI & output formatting |
| `input_handler.py` | ~50 | User input & validation |

---

## 📖 Penggunaan

### Menjalankan Program

```bash
# Masuk ke folder project
cd student-management-system

# Jalankan program
python main.py
```

### Menu dan Fungsinya

<img width="658" height="291" alt="image" src="https://github.com/user-attachments/assets/99c2f83e-4f14-4ecc-80c9-5f6fc0442bd9" />

#### Menu 1: Tampilkan Semua Data
```
Input  : Pilih menu 1
Output : Tabel berisi semua data mahasiswa
         - Nomor urut
         - Nama lengkap
         - NIM
         - Nilai UTS, UAS, Tugas
         - Nilai Akhir
         - Grade
```
<img width="642" height="236" alt="image" src="https://github.com/user-attachments/assets/9da56900-1f18-43cf-a5da-4d2835d6fc96" />

#### Menu 2: Tambah Mahasiswa Baru
```
Input  : - Nama lengkap
         - NIM
         - Nilai UTS (0-100)
         - Nilai UAS (0-100)
         - Nilai Tugas (0-100)

Proses : - Validasi semua input
         - Hitung nilai akhir otomatis
         - Tentukan grade otomatis
         - Tambahkan ke database

Output : Konfirmasi berhasil + tampilkan data baru
```
<img width="625" height="275" alt="image" src="https://github.com/user-attachments/assets/ac95783f-bdfb-4892-bce9-b545b34da3d1" />

#### Menu 3: Cari Nilai Tertinggi
```
Input  : Pilih menu 3
Proses : Cari mahasiswa dengan nilai_akhir tertinggi
Output : Tampilkan data mahasiswa tersebut
```
<img width="628" height="154" alt="image" src="https://github.com/user-attachments/assets/b5a01a12-450a-4158-9e4e-e34cf3214231" />

#### Menu 4: Cari Nilai Terendah
```
Input  : Pilih menu 4
Proses : Cari mahasiswa dengan nilai_akhir terendah
Output : Tampilkan data mahasiswa tersebut
```
<img width="623" height="185" alt="image" src="https://github.com/user-attachments/assets/79a9e195-387f-4a8f-88bf-47786aa1c906" />

#### Menu 5: Filter Berdasarkan Grade
```
Input  : - Pilih menu 5
         - Input grade (A/B/C/D/E)

Proses : Filter semua mahasiswa dengan grade tersebut
Output : Tabel mahasiswa yang sesuai grade
```
<img width="637" height="207" alt="image" src="https://github.com/user-attachments/assets/48428ae0-d6c0-4fe1-a740-24dc34960019" />

#### Menu 6: Rata-rata Kelas
```
Input  : Pilih menu 6
Proses : - Hitung total nilai_akhir semua mahasiswa
         - Bagi dengan jumlah mahasiswa
         - Tentukan grade rata-rata

Output : - Nilai rata-rata kelas
         - Grade rata-rata kelas
```
<img width="554" height="122" alt="image" src="https://github.com/user-attachments/assets/9936a0be-d333-403c-817c-d827949c4cd0" />


#### Menu 7: Statistik Lengkap
```
Input  : Pilih menu 7
Output : - Total mahasiswa
         - Rata-rata nilai kelas
         - Nilai tertinggi (nama + nilai)
         - Nilai terendah (nama + nilai)
         - Distribusi grade:
           * Jumlah mahasiswa per grade
           * Persentase per grade
```
<img width="612" height="276" alt="image" src="https://github.com/user-attachments/assets/e19c90ee-25aa-4bde-89c0-a02ff91cdef4" />

#### Menu 8: Keluar 
```
Input  : Pilih menu 8
Output : Terima kasih telah menggunakan program ini!
```
<img width="605" height="236" alt="image" src="https://github.com/user-attachments/assets/8877abf8-25f3-4a55-9f90-2b69cab5ea0e" />

#### MenuError Handling - Input Tidak Valid
<img width="581" height="236" alt="image" src="https://github.com/user-attachments/assets/837caed7-24d2-4c4e-b88f-3199316cf44d" />

---

## Dokumentasi Fungsi

### Module: data_manager.py

#### 1. `hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas)`
```python
"""
Menghitung nilai akhir berdasarkan bobot.

Parameters:
    nilai_uts (float): Nilai UTS mahasiswa
    nilai_uas (float): Nilai UAS mahasiswa
    nilai_tugas (float): Nilai Tugas mahasiswa

Returns:
    float: Nilai akhir yang sudah dihitung

Formula:
    nilai_akhir = (UTS × 30%) + (UAS × 40%) + (Tugas × 30%)

Example:
    >>> hitung_nilai_akhir(80, 85, 90)
    85.0
"""
```

#### 2. `tentukan_grade(nilai_akhir)`
```python
"""
Menentukan grade berdasarkan nilai akhir.

Parameters:
    nilai_akhir (float): Nilai akhir mahasiswa

Returns:
    str: Grade mahasiswa (A, B, C, D, atau E)

Kriteria:
    A: >= 80
    B: >= 70
    C: >= 60
    D: >= 50
    E: < 50

Example:
    >>> tentukan_grade(85)
    'A'
    >>> tentukan_grade(65)
    'C'
"""
```

### Module: calculator.py

#### 3. `cari_nilai_tertinggi(data)`
```python
"""
Mencari mahasiswa dengan nilai akhir tertinggi.

Parameters:
    data (list): List dictionary data mahasiswa

Returns:
    dict: Data mahasiswa dengan nilai tertinggi
    None: Jika data kosong

Example:
    >>> tertinggi = cari_nilai_tertinggi(data_mahasiswa)
    >>> print(tertinggi['nama'])
    'Ahmad Rizki'
"""
```

#### 4. `filter_berdasarkan_grade(data, grade)`
```python
"""
Memfilter mahasiswa berdasarkan grade tertentu.

Parameters:
    data (list): List dictionary data mahasiswa
    grade (str): Grade yang dicari (A, B, C, D, E)

Returns:
    list: List mahasiswa dengan grade yang sesuai

Example:
    >>> grade_a = filter_berdasarkan_grade(data_mahasiswa, 'A')
    >>> len(grade_a)
    3
"""
```

### Module: display.py

#### 5. `tampilkan_tabel(data)`
```python
"""
Menampilkan data mahasiswa dalam format tabel.

Parameters:
    data (list): List dictionary data mahasiswa

Output:
    Tabel dengan kolom:
    - No (nomor urut)
    - Nama (20 char)
    - NIM (10 char)
    - UTS, UAS, Tugas (6 char each)
    - Nilai Akhir (9 char, 2 decimal)
    - Grade (6 char)

Example:
    >>> tampilkan_tabel(data_mahasiswa)
    # Outputs formatted table
"""
```

---

## Sistem Penilaian

### Bobot Penilaian Nilai Akhir

| Komponen | Bobot | Keterangan |
|----------|-------|------------|
| **UTS** | 30% | Ujian Tengah Semester |
| **UAS** | 40% | Ujian Akhir Semester |
| **Tugas** | 30% | Tugas/Praktikum |
| **Total** | **100%** | Nilai Akhir |

### Formula Perhitungan
```
Nilai Akhir = (UTS × 0.3) + (UAS × 0.4) + (Tugas × 0.3)
```

### Tabel Konversi Grade

| Grade | Rentang Nilai | Predikat | Keterangan |
|-------|--------------|----------|------------|
| **A** | 80 - 100 | Sangat Baik | Excellent |
| **B** | 70 - 79 | Baik | Good |
| **C** | 60 - 69 | Cukup | Fair |
| **D** | 50 - 59 | Kurang | Poor |
| **E** | 0 - 49 | Sangat Kurang | Fail |

---

## Troubleshooting

### Problem 1: ModuleNotFoundError
```
Error: ModuleNotFoundError: No module named 'modules'
```
**Solusi:**
- Pastikan folder `modules/` ada di folder yang sama dengan `main.py`
- Pastikan file `modules/__init__.py` ada
- Jalankan dari folder root project: `python main.py`

### Problem 2: Import Error
```
Error: ImportError: cannot import name 'data_mahasiswa'
```
**Solusi:**
- Cek apakah semua file di folder `modules/` sudah dibuat
- Cek apakah tidak ada typo di nama fungsi/variabel
- Pastikan struktur import sesuai dokumentasi

### Problem 3: Encoding Error (Windows)
```
Error: UnicodeEncodeError: 'charmap' codec can't encode character
```
**Solusi:**
```python
# Tambahkan di awal main.py
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
```

### Problem 4: Program Tidak Bisa Keluar
```
Program terus loop, tidak bisa keluar
```
**Solusi:**
- Tekan `Ctrl + C` untuk force quit
- Atau pilih menu `0` untuk keluar normal
- Pastikan tidak ada infinite loop tanpa break

### Problem 5: Tabel Tidak Rapi
```
Tabel berantakan / kolom tidak aligned
```
**Solusi:**
- Gunakan terminal yang support Unicode
- Perbesar window terminal
- Gunakan monospace font (Consolas, Courier New)

---
