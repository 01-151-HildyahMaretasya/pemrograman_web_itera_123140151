# API Manajemen Matakuliah
Aplikasi REST API sederhana untuk manajemen data mata kuliah menggunakan Pyramid Web Framework dan SQLAlchemy.

## Deskripsi Proyek
Aplikasi ini adalah sistem manajemen mata kuliah berbasis REST API yang memungkinkan pengguna untuk melakukan operasi CRUD (Create, Read, Update, Delete) terhadap data mata kuliah. Dibangun menggunakan Pyramid framework dengan SQLAlchemy sebagai ORM dan SQLite sebagai database.

## Fitur

- Menampilkan semua data mata kuliah
- Menampilkan detail mata kuliah berdasarkan ID
- Menambahkan mata kuliah baru
- Mengupdate data mata kuliah
- Menghapus data mata kuliah
- Validasi data input
- Error handling yang baik
- Response dalam format JSON

## Struktur Database

### Tabel: matakuliah

| Kolom | Tipe | Constraint | Deskripsi |
|-------|------|------------|-----------|
| id | Integer | Primary Key, Auto Increment | ID unik mata kuliah |
| kode_mk | Text | Unique, Not Null | Kode mata kuliah |
| nama_mk | Text | Not Null | Nama mata kuliah |
| sks | Integer | Not Null | Jumlah SKS |
| semester | Integer | Not Null | Semester pengambilan |

## Cara Instalasi

### 1. Clone atau Download Project

```bash
cd pyramid_matakuliah
```

### 2. Buat Virtual Environment

```bash
# Untuk Linux/Mac
python3 -m venv env
source env/bin/activate

# Untuk Windows
python -m venv env
env\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -e .
```

Atau install secara manual:

```bash
pip install pyramid pyramid_jinja2 pyramid_debugtoolbar pyramid_tm pyramid_retry
pip install SQLAlchemy transaction zope.sqlalchemy
pip install alembic waitress
pip install pytest pytest-cov WebTest
```

### 4. Konfigurasi Database

File konfigurasi database sudah tersedia di `development.ini`. Secara default menggunakan SQLite:

```ini
sqlalchemy.url = sqlite:///%(here)s/pyramid_matakuliah.sqlite
```

## Cara Menjalankan

### 1. Inisialisasi Database

```bash
# Generate migration script
alembic -c development.ini revision --autogenerate -m "create matakuliah table"

# Jalankan migration
alembic -c development.ini upgrade head
```

### 2. Tambahkan Data Awal (Opsional)

```bash
python -m pyramid_matakuliah.scripts.initialize_db development.ini
```

Atau bisa juga menggunakan pshell untuk menambahkan data manual:

```bash
pshell development.ini
```

Kemudian di pshell:

```python
from pyramid_matakuliah.models.matakuliah import Matakuliah

mk1 = Matakuliah(kode_mk='IF101', nama_mk='Algoritma dan Pemrograman', sks=3, semester=1)
mk2 = Matakuliah(kode_mk='IF102', nama_mk='Basis Data', sks=3, semester=2)
mk3 = Matakuliah(kode_mk='IF103', nama_mk='Pemrograman Web', sks=3, semester=3)

dbsession.add_all([mk1, mk2, mk3])
import transaction
transaction.commit()
```

### 3. Jalankan Server

```bash
pserve development.ini
```

Server akan berjalan di `http://localhost:6543`

## API Endpoints

### 1. Get All Matakuliah

Mendapatkan semua data mata kuliah.

**Request:**

```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "IF102",
      "nama_mk": "Basis Data",
      "sks": 3,
      "semester": 2
    }
  ]
}
```

### 2. Get Matakuliah by ID

Mendapatkan detail satu mata kuliah berdasarkan ID.

**Request:**

```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Response Success:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
}
```

**Response Error (Not Found):**

```json
{
  "status": "error",
  "message": "Matakuliah tidak ditemukan"
}
```

### 3. Create Matakuliah

Menambahkan mata kuliah baru.

**Request:**

```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "IF104",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }'
```

**Response Success:**

```json
{
  "status": "success",
  "message": "Matakuliah berhasil ditambahkan",
  "data": {
    "id": 4,
    "kode_mk": "IF104",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }
}
```

**Response Error (Validation):**

```json
{
  "status": "error",
  "message": "Field kode_mk, nama_mk, sks, dan semester wajib diisi"
}
```

**Response Error (Duplicate):**

```json
{
  "status": "error",
  "message": "Kode mata kuliah sudah ada"
}
```

### 4. Update Matakuliah

Mengupdate data mata kuliah berdasarkan ID.

**Request:**

```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman Dasar",
    "sks": 4,
    "semester": 1
  }'
```

**Response Success:**

```json
{
  "status": "success",
  "message": "Matakuliah berhasil diupdate",
  "data": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman Dasar",
    "sks": 4,
    "semester": 1
  }
}
```

**Response Error (Not Found):**

```json
{
  "status": "error",
  "message": "Matakuliah tidak ditemukan"
}
```

### 5. Delete Matakuliah

Menghapus data mata kuliah berdasarkan ID.

**Request:**

```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

**Response Success:**

```json
{
  "status": "success",
  "message": "Matakuliah berhasil dihapus"
}
```

**Response Error (Not Found):**

```json
{
  "status": "error",
  "message": "Matakuliah tidak ditemukan"
}
```

## Testing dengan Postman

### 1. Import Collection

Buat collection baru di Postman dengan endpoints berikut:

- **GET All**: `http://localhost:6543/api/matakuliah`
- **GET by ID**: `http://localhost:6543/api/matakuliah/1`
- **POST**: `http://localhost:6543/api/matakuliah`
  - Body (raw JSON):
    ```json
    {
      "kode_mk": "IF105",
      "nama_mk": "Pemrograman Mobile",
      "sks": 3,
      "semester": 5
    }
    ```
- **PUT**: `http://localhost:6543/api/matakuliah/1`
  - Body (raw JSON):
    ```json
    {
      "kode_mk": "IF101",
      "nama_mk": "Algoritma Lanjut",
      "sks": 4,
      "semester": 1
    }
    ```
- **DELETE**: `http://localhost:6543/api/matakuliah/1`

### 2. Testing Flow

1. Tambahkan beberapa mata kuliah menggunakan POST
2. Lihat semua data menggunakan GET All
3. Lihat detail satu data menggunakan GET by ID
4. Update data menggunakan PUT
5. Hapus data menggunakan DELETE
6. Verifikasi dengan GET All lagi

## Testing dengan Unit Test

Jalankan unit test yang sudah dibuat:

```bash
pytest pyramid_matakuliah/tests.py -v
```

Atau dengan coverage:

```bash
pytest --cov=pyramid_matakuliah pyramid_matakuliah/tests.py
```

## Troubleshooting

### Error: Database not initialized

**Solusi:**
```bash
alembic -c development.ini upgrade head
```

### Error: Port already in use

**Solusi:**
Ganti port di `development.ini`:
```ini
[server:main]
listen = localhost:6544
```

### Error: Module not found

**Solusi:**
Install ulang dependencies:
```bash
pip install -e .
```

### Error: Permission denied (Linux/Mac)

**Solusi:**
Berikan permission pada file:
```bash
chmod +x env/bin/activate
```

## Screenshot 
<img width="666" height="200" alt="image" src="https://github.com/user-attachments/assets/7b0cab9e-60f3-481a-9e8c-04244bbe86f6" />
<img width="667" height="133" alt="image" src="https://github.com/user-attachments/assets/3e8e37dc-195b-4f17-bbed-1485a11e0c51" />


## Struktur Project

```
pyramid_matakuliah/
├── pyramid_matakuliah/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── meta.py
│   │   ├── mymodel.py
│   │   └── matakuliah.py
│   ├── views/
│   │   ├── __init__.py
│   │   ├── default.py
│   │   ├── notfound.py
│   │   └── matakuliah.py
│   ├── templates/
│   │   ├── layout.jinja2
│   │   ├── mytemplate.jinja2
│   │   └── 404.jinja2
│   ├── routes.py
│   ├── tests.py
│   └── alembic/
├── development.ini
├── production.ini
├── setup.py
└── README.md
```

