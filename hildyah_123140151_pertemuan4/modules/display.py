from modules.calculator import (
    cari_nilai_tertinggi,
    cari_nilai_terendah,
    filter_berdasarkan_grade,
    hitung_rata_rata_kelas
)


def tampilkan_header():
    """Menampilkan header program."""
    print("\n" + "="*80)
    print("SISTEM MANAJEMEN NILAI MAHASISWA".center(80))
    print("="*80)


def tampilkan_menu():
    """Menampilkan menu utama."""
    print("\n" + "="*50)
    print("MENU UTAMA".center(50))
    print("="*50)
    print("1. Tampilkan Semua Data Mahasiswa")
    print("2. Tambah Data Mahasiswa Baru")
    print("3. Cari Mahasiswa Nilai Tertinggi")
    print("4. Cari Mahasiswa Nilai Terendah")
    print("5. Filter Mahasiswa Berdasarkan Grade")
    print("6. Hitung Rata-rata Nilai Kelas")
    print("7. Statistik Lengkap")
    print("0. Keluar")
    print("="*50)


def tampilkan_tabel(data):
    """
    Menampilkan data mahasiswa dalam format tabel.
    
    Args:
        data (list): List dictionary data mahasiswa
    """
    if not data:
        print("\n⚠️  Tidak ada data untuk ditampilkan.")
        return
    
    print("\n" + "-"*110)
    print(f"{'No':<4} {'Nama':<20} {'NIM':<10} {'UTS':<6} {'UAS':<6} {'Tugas':<7} {'N.Akhir':<9} {'Grade':<6}")
    print("-"*110)
    
    for idx, mhs in enumerate(data, 1):
        print(f"{idx:<4} {mhs['nama']:<20} {mhs['nim']:<10} "
              f"{mhs['nilai_uts']:<6} {mhs['nilai_uas']:<6} "
              f"{mhs['nilai_tugas']:<7} {mhs['nilai_akhir']:<9.2f} {mhs['grade']:<6}")
    
    print("-"*110)


def tampilkan_statistik(data):
    """
    Menampilkan statistik lengkap kelas.
    
    Args:
        data (list): List dictionary data mahasiswa
    """
    if not data:
        print("\n⚠️  Tidak ada data untuk statistik.")
        return
    
    print("\n" + "="*60)
    print("STATISTIK KELAS".center(60))
    print("="*60)
    
    # Total mahasiswa
    print(f"\n📊 Total Mahasiswa: {len(data)}")
    
    # Rata-rata
    rata_rata = hitung_rata_rata_kelas(data)
    print(f"📈 Rata-rata Nilai Kelas: {rata_rata:.2f}")
    
    # Nilai tertinggi dan terendah
    tertinggi = cari_nilai_tertinggi(data)
    terendah = cari_nilai_terendah(data)
    
    print(f"\n🏆 Nilai Tertinggi: {tertinggi['nilai_akhir']:.2f} - {tertinggi['nama']}")
    print(f"📉 Nilai Terendah: {terendah['nilai_akhir']:.2f} - {terendah['nama']}")
    
    # Distribusi grade
    print("\n📋 Distribusi Grade:")
    for grade in ["A", "B", "C", "D", "E"]:
        jumlah = len(filter_berdasarkan_grade(data, grade))
        persentase = (jumlah / len(data)) * 100
        print(f"   Grade {grade}: {jumlah} mahasiswa ({persentase:.1f}%)")
    
    print("="*60)