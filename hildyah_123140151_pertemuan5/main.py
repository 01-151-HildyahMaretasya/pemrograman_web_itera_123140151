"""
File: main.py
Deskripsi: Program utama dengan menu interaktif untuk sistem perpustakaan
Author: [Nama Anda]
Date: [Tanggal]
"""

from src.library import Library
from src.book import Book
from src.magazine import Magazine


def clear_screen():
    """Membersihkan layar terminal"""
    print("\n" * 2)


def print_header(title):
    """Menampilkan header dengan format rapi"""
    print("\n" + "="*60)
    print(f"  {title}")
    print("="*60)


def display_menu():
    """Menampilkan menu utama"""
    print_header("SISTEM MANAJEMEN PERPUSTAKAAN")
    print("\n🔹 MENU UTAMA:")
    print("   1. Tambah Buku")
    print("   2. Tambah Majalah")
    print("   3. Tampilkan Semua Item")
    print("   4. Cari Item berdasarkan Judul")
    print("   5. Cari Item berdasarkan ID")
    print("   6. Pinjam Item")
    print("   7. Kembalikan Item")
    print("   8. Lihat Statistik")
    print("   0. Keluar")
    print("-"*60)


def add_book(library):
    """Menu untuk menambahkan buku"""
    print_header("📚 TAMBAH BUKU BARU")
    
    try:
        item_id = input("Masukkan ID Buku (contoh: B001): ").strip()
        if not item_id:
            print("❌ ID tidak boleh kosong!")
            return
        
        title = input("Masukkan Judul Buku: ").strip()
        if not title:
            print("❌ Judul tidak boleh kosong!")
            return
        
        author = input("Masukkan Nama Penulis: ").strip()
        if not author:
            print("❌ Nama penulis tidak boleh kosong!")
            return
        
        year = int(input("Masukkan Tahun Terbit: "))
        pages = int(input("Masukkan Jumlah Halaman: "))
        
        # Buat object Book
        book = Book(item_id, title, author, year, pages)
        
        # Tambahkan ke perpustakaan
        library.add_item(book)
        
    except ValueError as e:
        print(f"❌ Error: Input tidak valid! {e}")
    except Exception as e:
        print(f"❌ Terjadi kesalahan: {e}")


def add_magazine(library):
    """Menu untuk menambahkan majalah"""
    print_header("📰 TAMBAH MAJALAH BARU")
    
    try:
        item_id = input("Masukkan ID Majalah (contoh: M001): ").strip()
        if not item_id:
            print("❌ ID tidak boleh kosong!")
            return
        
        title = input("Masukkan Judul Majalah: ").strip()
        if not title:
            print("❌ Judul tidak boleh kosong!")
            return
        
        publisher = input("Masukkan Nama Penerbit: ").strip()
        if not publisher:
            print("❌ Nama penerbit tidak boleh kosong!")
            return
        
        year = int(input("Masukkan Tahun Terbit: "))
        issue_number = int(input("Masukkan Nomor Edisi: "))
        
        # Buat object Magazine
        magazine = Magazine(item_id, title, publisher, year, issue_number)
        
        # Tambahkan ke perpustakaan
        library.add_item(magazine)
        
    except ValueError as e:
        print(f"❌ Error: Input tidak valid! {e}")
    except Exception as e:
        print(f"❌ Terjadi kesalahan: {e}")


def search_by_title(library):
    """Menu untuk mencari item berdasarkan judul"""
    print_header("🔍 CARI BERDASARKAN JUDUL")
    
    keyword = input("Masukkan kata kunci judul: ").strip()
    
    if not keyword:
        print("❌ Kata kunci tidak boleh kosong!")
        return
    
    results = library.search_by_title(keyword)
    
    if results:
        print(f"\n✅ Ditemukan {len(results)} item:")
        print("-"*60)
        for item in results:
            print(item.get_info())
            print("-"*60)
    else:
        print(f"❌ Tidak ada item dengan judul yang mengandung '{keyword}'")


def search_by_id(library):
    """Menu untuk mencari item berdasarkan ID"""
    print_header("🔍 CARI BERDASARKAN ID")
    
    item_id = input("Masukkan ID item: ").strip()
    
    if not item_id:
        print("❌ ID tidak boleh kosong!")
        return
    
    item = library.search_by_id(item_id)
    
    if item:
        print("\n✅ Item ditemukan:")
        print("-"*60)
        print(item.get_info())
        print("-"*60)
    else:
        print(f"❌ Item dengan ID '{item_id}' tidak ditemukan!")


def borrow_item_menu(library):
    """Menu untuk meminjam item"""
    print_header("📤 PINJAM ITEM")
    
    item_id = input("Masukkan ID item yang ingin dipinjam: ").strip()
    
    if not item_id:
        print("❌ ID tidak boleh kosong!")
        return
    
    library.borrow_item(item_id)


def return_item_menu(library):
    """Menu untuk mengembalikan item"""
    print_header("📥 KEMBALIKAN ITEM")
    
    item_id = input("Masukkan ID item yang ingin dikembalikan: ").strip()
    
    if not item_id:
        print("❌ ID tidak boleh kosong!")
        return
    
    library.return_item(item_id)


def show_statistics(library):
    """Menu untuk menampilkan statistik"""
    library.get_statistics()


def load_sample_data(library):
    """Memuat data contoh untuk demo"""
    print_header("🎬 MEMUAT DATA CONTOH")
    
    print("📥 Menambahkan koleksi buku...")
    book1 = Book("B001", "Laskar Pelangi", "Andrea Hirata", 2005, 529)
    book2 = Book("B002", "Bumi Manusia", "Pramoedya Ananta Toer", 1980, 535)
    book3 = Book("B003", "Sang Pemimpi", "Andrea Hirata", 2006, 292)
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)
    
    print("\n📥 Menambahkan koleksi majalah...")
    mag1 = Magazine("M001", "National Geographic Indonesia", "PT Media Nusantara", 2025, 120)
    mag2 = Magazine("M002", "Tempo", "Tempo Inti Media", 2024, 4520)
    
    library.add_item(mag1)
    library.add_item(mag2)
    
    print("\n✅ Data contoh berhasil dimuat!")
    print("💡 Tip: Lihat menu 3 untuk menampilkan semua item")


def main():
    """
    Fungsi utama dengan menu interaktif
    """
    
    # Membuat instance perpustakaan
    library = Library("Perpustakaan Digital Nusantara")
    
    # Header awal
    print("\n" + "🏛️ "*20)
    print_header(f"SELAMAT DATANG DI {library.name.upper()}")
    print("🏛️ "*20)
    
    # Loop menu utama
    while True:
        display_menu()
        
        try:
            choice = input("Pilih menu (0-9): ").strip()
            
            if choice == "1":
                add_book(library)
                
            elif choice == "2":
                add_magazine(library)
                
            elif choice == "3":
                library.display_all_items()
                
            elif choice == "4":
                search_by_title(library)
                
            elif choice == "5":
                search_by_id(library)
                
            elif choice == "6":
                borrow_item_menu(library)
                
            elif choice == "7":
                return_item_menu(library)
                
            elif choice == "8":
                show_statistics(library)
                
            elif choice == "9":
                load_sample_data(library)
                
            elif choice == "0":
                print_header("TERIMA KASIH TELAH MENGGUNAKAN SISTEM PERPUSTAKAAN")
                print("Sampai jumpa! \n")
                break
                
            else:
                print("❌ Pilihan tidak valid! Silakan pilih 0-9.")
            
            # Pause sebelum kembali ke menu
            input("\n⏎ Tekan ENTER untuk kembali ke menu...")
            clear_screen()
            
        except KeyboardInterrupt:
            print("\n\n Program dihentikan oleh user. Sampai jumpa!")
            break
        except Exception as e:
            print(f"\n❌ Terjadi kesalahan: {e}")
            input("\n⏎ Tekan ENTER untuk kembali ke menu...")


if __name__ == "__main__":
    main()