# Data mahasiswa awal
data_mahasiswa = [
    {
        "nama": "Budi Santoso",
        "nim": "2024001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Siti Aminah",
        "nim": "2024002",
        "nilai_uts": 78,
        "nilai_uas": 82,
        "nilai_tugas": 80
    },
    {
        "nama": "Ahmad Rizki",
        "nim": "2024003",
        "nilai_uts": 92,
        "nilai_uas": 88,
        "nilai_tugas": 95
    },
    {
        "nama": "Dewi Lestari",
        "nim": "2024004",
        "nilai_uts": 65,
        "nilai_uas": 70,
        "nilai_tugas": 68
    },
    {
        "nama": "Eko Prasetyo",
        "nim": "2024005",
        "nilai_uts": 45,
        "nilai_uas": 50,
        "nilai_tugas": 48
    }
]


def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """
    Menghitung nilai akhir berdasarkan bobot:
    - UTS: 30%
    - UAS: 40%
    - Tugas: 30%
    
    Args:
        nilai_uts (float): Nilai UTS mahasiswa
        nilai_uas (float): Nilai UAS mahasiswa
        nilai_tugas (float): Nilai Tugas mahasiswa
    
    Returns:
        float: Nilai akhir yang sudah dihitung
    """
    return (nilai_uts * 0.3) + (nilai_uas * 0.4) + (nilai_tugas * 0.3)


def tentukan_grade(nilai_akhir):
    """
    Menentukan grade berdasarkan nilai akhir.
    
    Kriteria:
    - A: >= 80
    - B: >= 70
    - C: >= 60
    - D: >= 50
    - E: < 50
    
    Args:
        nilai_akhir (float): Nilai akhir mahasiswa
    
    Returns:
        str: Grade mahasiswa (A, B, C, D, atau E)
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def tambah_nilai_akhir_dan_grade(data):
    """
    Menambahkan field nilai_akhir dan grade ke setiap mahasiswa.
    
    Args:
        data (list): List dictionary data mahasiswa
    """
    for mahasiswa in data:
        nilai_akhir = hitung_nilai_akhir(
            mahasiswa["nilai_uts"],
            mahasiswa["nilai_uas"],
            mahasiswa["nilai_tugas"]
        )
        mahasiswa["nilai_akhir"] = round(nilai_akhir, 2)
        mahasiswa["grade"] = tentukan_grade(nilai_akhir)