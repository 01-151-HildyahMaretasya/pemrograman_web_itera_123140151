"""
Module: book.py
Deskripsi: Class Book yang mewarisi dari LibraryItem
"""

from .library_item import LibraryItem


class Book(LibraryItem):
    """
    Class untuk buku, mewarisi dari LibraryItem.
    Menerapkan konsep inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, author: str, year: int, pages: int):
        """
        Constructor untuk Book
        
        Args:
            item_id: ID unik buku
            title: Judul buku
            author: Nama penulis
            year: Tahun publikasi
            pages: Jumlah halaman
        """
        super().__init__(item_id, title, year)
        self._author = author
        self._pages = pages
    
    @property
    def author(self) -> str:
        """Getter untuk author"""
        return self._author
    
    def get_info(self) -> str:
        """
        Implementasi abstract method get_info() untuk Book.
        Override method dari parent class (Polymorphism).
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        return (f"📚 BUKU\n"
                f"   ID: {self.item_id}\n"
                f"   Judul: {self.title}\n"
                f"   Penulis: {self._author}\n"
                f"   Tahun: {self._year}\n"
                f"   Halaman: {self._pages}\n"
                f"   Status: {status}")
    
    def get_category(self) -> str:
        """Implementasi abstract method get_category()"""
        return "Buku"
    
    def get_reading_time(self) -> int:
        """
        Method khusus untuk Book - menghitung estimasi waktu baca
        
        Returns:
            Estimasi waktu baca dalam menit (asumsi 1 halaman = 2 menit)
        """
        return self._pages * 2