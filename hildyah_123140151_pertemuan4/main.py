from modules.data_manager import data_mahasiswa, tambah_nilai_akhir_dan_grade
from modules.calculator import (
    cari_nilai_tertinggi, 
    cari_nilai_terendah,
    filter_berdasarkan_grade,
    hitung_rata_rata_kelas,
    tentukan_grade
)
from modules.display import (
    tampilkan_header,
    tampilkan_menu,
    tampilkan_tabel,
    tampilkan_statistik
)
from modules.input_handler import input_mahasiswa_baru


def main():
    """Fungsi utama program."""
    # Inisialisasi: hitung nilai akhir dan grade untuk data awal
    tambah_nilai_akhir_dan_grade(data_mahasiswa)
    
    while True:
        tampilkan_header()
        tampilkan_menu()
        
        try:
            pilihan = input("\nPilih menu (0-7): ").strip()
            
            if pilihan == "1":
                print("\n" + "="*50)
                print("DATA SEMUA MAHASISWA".center(50))
                print("="*50)
                tampilkan_tabel(data_mahasiswa)
            
            elif pilihan == "2":
                mahasiswa_baru = input_mahasiswa_baru()
                if mahasiswa_baru:
                    data_mahasiswa.append(mahasiswa_baru)
                    print("\n✅ Data mahasiswa berhasil ditambahkan!")
                    tampilkan_tabel([mahasiswa_baru])
            
            elif pilihan == "3":
                tertinggi = cari_nilai_tertinggi(data_mahasiswa)
                if tertinggi:
                    print("\n" + "="*50)
                    print("MAHASISWA DENGAN NILAI TERTINGGI".center(50))
                    print("="*50)
                    tampilkan_tabel([tertinggi])
            
            elif pilihan == "4":
                terendah = cari_nilai_terendah(data_mahasiswa)
                if terendah:
                    print("\n" + "="*50)
                    print("MAHASISWA DENGAN NILAI TERENDAH".center(50))
                    print("="*50)
                    tampilkan_tabel([terendah])
            
            elif pilihan == "5":
                grade = input("\nMasukkan grade (A/B/C/D/E): ").strip().upper()
                if grade in ["A", "B", "C", "D", "E"]:
                    hasil = filter_berdasarkan_grade(data_mahasiswa, grade)
                    print(f"\n{'='*50}")
                    print(f"MAHASISWA DENGAN GRADE {grade}".center(50))
                    print("="*50)
                    tampilkan_tabel(hasil)
                else:
                    print("\n❌ Grade tidak valid!")
            
            elif pilihan == "6":
                rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
                print("\n" + "="*50)
                print(f"📊 Rata-rata Nilai Kelas: {rata_rata:.2f}")
                print(f"📝 Grade Kelas: {tentukan_grade(rata_rata)}")
                print("="*50)
            
            elif pilihan == "7":
                tampilkan_statistik(data_mahasiswa)
            
            elif pilihan == "0":
                print("\n" + "="*50)
                print("Terima kasih telah menggunakan program ini!".center(50))
                print("="*50)
                break
            
            else:
                print("\n❌ Pilihan tidak valid! Silakan pilih 0-7.")
            
            input("\nTekan Enter untuk melanjutkan...")
        
        except KeyboardInterrupt:
            print("\n\n" + "="*50)
            print("Program dihentikan oleh user.".center(50))
            print("="*50)
            break
        except Exception as e:
            print(f"\n❌ Terjadi error: {e}")
            input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()