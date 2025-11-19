"""
Module: library_item.py
Deskripsi: Abstract base class untuk semua item di perpustakaan
"""

from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """
    Abstract base class untuk semua item di perpustakaan.
    Menerapkan konsep abstraction dan encapsulation.
    """
    
    def __init__(self, item_id: str, title: str, year: int):
        """
        Constructor untuk LibraryItem
        
        Args:
            item_id: ID unik item
            title: Judul item
            year: Tahun publikasi
        """
        self.__item_id = item_id  # Private attribute (encapsulation)
        self._title = title  # Protected attribute
        self._year = year
        self._is_available = True  # Status ketersediaan
    
    # Property decorator untuk encapsulation
    @property
    def item_id(self) -> str:
        """Getter untuk item_id (read-only)"""
        return self.__item_id
    
    @property
    def title(self) -> str:
        """Getter untuk title"""
        return self._title
    
    @title.setter
    def title(self, value: str):
        """Setter untuk title dengan validasi"""
        if not value or len(value.strip()) == 0:
            raise ValueError("Judul tidak boleh kosong")
        self._title = value.strip()
    
    @property
    def is_available(self) -> bool:
        """Getter untuk status ketersediaan"""
        return self._is_available
    
    def borrow(self) -> bool:
        """
        Method untuk meminjam item
        
        Returns:
            True jika berhasil dipinjam, False jika tidak tersedia
        """
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self):
        """Method untuk mengembalikan item"""
        self._is_available = True
    
    @abstractmethod
    def get_info(self) -> str:
        """
        Abstract method yang harus diimplementasikan oleh subclass.
        Mengembalikan informasi lengkap tentang item.
        """
        pass
    
    @abstractmethod
    def get_category(self) -> str:
        """
        Abstract method untuk mendapatkan kategori item.
        """
        pass
    
    def __str__(self) -> str:
        """String representation (Polymorphism)"""
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"[{self.item_id}] {self.title} ({self._year}) - {status}"