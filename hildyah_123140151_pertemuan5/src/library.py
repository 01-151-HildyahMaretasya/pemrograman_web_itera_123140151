"""
Module: library.py
Deskripsi: Class Library untuk mengelola koleksi item perpustakaan
"""

from typing import List, Optional
from .library_item import LibraryItem
from .book import Book
from .magazine import Magazine


class Library:
    """
    Class untuk mengelola koleksi item perpustakaan.
    Menerapkan konsep encapsulation dan composition.
    """
    
    def __init__(self, name: str):
        """
        Constructor untuk Library
        
        Args:
            name: Nama perpustakaan
        """
        self.__name = name  # Private attribute
        self.__items: List[LibraryItem] = []  # Private list untuk menyimpan items
        self.__borrowed_count = 0  # Private counter untuk item yang dipinjam
    
    @property
    def name(self) -> str:
        """Getter untuk nama perpustakaan"""
        return self.__name
    
    @property
    def total_items(self) -> int:
        """Getter untuk total item di perpustakaan"""
        return len(self.__items)
    
    @property
    def available_items(self) -> int:
        """Getter untuk jumlah item yang tersedia"""
        return sum(1 for item in self.__items if item.is_available)
    
    def add_item(self, item: LibraryItem) -> bool:
        """
        Menambahkan item ke perpustakaan
        
        Args:
            item: LibraryItem yang akan ditambahkan
            
        Returns:
            True jika berhasil ditambahkan, False jika ID sudah ada
        """
        # Validasi: cek apakah ID sudah ada
        if any(existing.item_id == item.item_id for existing in self.__items):
            print(f"❌ Error: Item dengan ID '{item.item_id}' sudah ada!")
            return False
        
        self.__items.append(item)
        print(f"✅ Item '{item.title}' berhasil ditambahkan ke perpustakaan!")
        return True
    
    def display_all_items(self):
        """
        Menampilkan semua item di perpustakaan.
        Menerapkan polymorphism - memanggil method yang sama pada object berbeda.
        """
        if not self.__items:
            print("📭 Perpustakaan masih kosong.")
            return
        
        print(f"\n{'='*60}")
        print(f"📚 DAFTAR KOLEKSI {self.__name.upper()}")
        print(f"{'='*60}")
        print(f"Total Item: {self.total_items} | Tersedia: {self.available_items}\n")
        
        for item in self.__items:
            print(item.get_info())  # Polymorphism: memanggil method yang di-override
            print("-" * 60)
    
    def search_by_title(self, keyword: str) -> List[LibraryItem]:
        """
        Mencari item berdasarkan judul (case-insensitive)
        
        Args:
            keyword: Kata kunci pencarian
            
        Returns:
            List of LibraryItem yang cocok dengan keyword
        """
        keyword_lower = keyword.lower()
        results = [item for item in self.__items 
                  if keyword_lower in item.title.lower()]
        return results
    
    def search_by_id(self, item_id: str) -> Optional[LibraryItem]:
        """
        Mencari item berdasarkan ID
        
        Args:
            item_id: ID item yang dicari
            
        Returns:
            LibraryItem jika ditemukan, None jika tidak
        """
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def borrow_item(self, item_id: str) -> bool:
        """
        Meminjam item dari perpustakaan
        
        Args:
            item_id: ID item yang akan dipinjam
            
        Returns:
            True jika berhasil dipinjam, False jika tidak
        """
        item = self.search_by_id(item_id)
        
        if item is None:
            print(f"❌ Item dengan ID '{item_id}' tidak ditemukan!")
            return False
        
        if item.borrow():
            self.__borrowed_count += 1
            print(f"✅ Berhasil meminjam '{item.title}'")
            return True
        else:
            print(f"❌ Item '{item.title}' sedang dipinjam!")
            return False
    
    def return_item(self, item_id: str) -> bool:
        """
        Mengembalikan item ke perpustakaan
        
        Args:
            item_id: ID item yang akan dikembalikan
            
        Returns:
            True jika berhasil dikembalikan, False jika tidak
        """
        item = self.search_by_id(item_id)
        
        if item is None:
            print(f"❌ Item dengan ID '{item_id}' tidak ditemukan!")
            return False
        
        if not item.is_available:
            item.return_item()
            self.__borrowed_count -= 1
            print(f"✅ Terima kasih telah mengembalikan '{item.title}'")
            return True
        else:
            print(f"❌ Item '{item.title}' tidak sedang dipinjam!")
            return False
    
    def get_statistics(self):
        """Menampilkan statistik perpustakaan"""
        books = sum(1 for item in self.__items if isinstance(item, Book))
        magazines = sum(1 for item in self.__items if isinstance(item, Magazine))
        
        print(f"\n{'='*60}")
        print(f"📊 STATISTIK {self.__name.upper()}")
        print(f"{'='*60}")
        print(f"Total Item: {self.total_items}")
        print(f"   - Buku: {books}")
        print(f"   - Majalah: {magazines}")
        print(f"Item Tersedia: {self.available_items}")
        print(f"Item Dipinjam: {self.__borrowed_count}")
        print(f"{'='*60}\n")