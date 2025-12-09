from modules.data_manager import tentukan_grade


def cari_nilai_tertinggi(data):
    """
    Mencari mahasiswa dengan nilai akhir tertinggi.
    
    Args:
        data (list): List dictionary data mahasiswa
    
    Returns:
        dict: Data mahasiswa dengan nilai tertinggi
    """
    if not data:
        return None
    return max(data, key=lambda x: x["nilai_akhir"])


def cari_nilai_terendah(data):
    """
    Mencari mahasiswa dengan nilai akhir terendah.
    
    Args:
        data (list): List dictionary data mahasiswa
    
    Returns:
        dict: Data mahasiswa dengan nilai terendah
    """
    if not data:
        return None
    return min(data, key=lambda x: x["nilai_akhir"])


def filter_berdasarkan_grade(data, grade):
    """
    Memfilter mahasiswa berdasarkan grade tertentu.
    
    Args:
        data (list): List dictionary data mahasiswa
        grade (str): Grade yang dicari (A, B, C, D, E)
    
    Returns:
        list: List mahasiswa dengan grade yang sesuai
    """
    return [mhs for mhs in data if mhs["grade"] == grade.upper()]


def hitung_rata_rata_kelas(data):
    """
    Menghitung rata-rata nilai akhir kelas.
    
    Args:
        data (list): List dictionary data mahasiswa
    
    Returns:
        float: Rata-rata nilai akhir kelas
    """
    if not data:
        return 0
    total = sum(mhs["nilai_akhir"] for mhs in data)
    return total / len(data)