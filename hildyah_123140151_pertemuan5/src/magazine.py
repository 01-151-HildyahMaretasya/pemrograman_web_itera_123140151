"""
Module: magazine.py
Deskripsi: Class Magazine yang mewarisi dari LibraryItem
"""

from datetime import datetime
from .library_item import LibraryItem


class Magazine(LibraryItem):
    """
    Class untuk majalah, mewarisi dari LibraryItem.
    Menerapkan konsep inheritance dan polymorphism.
    """
    
    def __init__(self, item_id: str, title: str, publisher: str, year: int, issue_number: int):
        """
        Constructor untuk Magazine
        
        Args:
            item_id: ID unik majalah
            title: Judul majalah
            publisher: Nama penerbit
            year: Tahun publikasi
            issue_number: Nomor edisi
        """
        super().__init__(item_id, title, year)
        self._publisher = publisher
        self._issue_number = issue_number
    
    @property
    def publisher(self) -> str:
        """Getter untuk publisher"""
        return self._publisher
    
    def get_info(self) -> str:
        """
        Implementasi abstract method get_info() untuk Magazine.
        Override method dari parent class (Polymorphism).
        """
        status = "Tersedia" if self.is_available else "Dipinjam"
        return (f"📰 MAJALAH\n"
                f"   ID: {self.item_id}\n"
                f"   Judul: {self.title}\n"
                f"   Penerbit: {self._publisher}\n"
                f"   Tahun: {self._year}\n"
                f"   Edisi: #{self._issue_number}\n"
                f"   Status: {status}")
    
    def get_category(self) -> str:
        """Implementasi abstract method get_category()"""
        return "Majalah"
    
    def is_latest_issue(self) -> bool:
        """
        Method khusus untuk Magazine - cek apakah edisi terbaru
        
        Returns:
            True jika diterbitkan tahun ini
        """
        current_year = datetime.now().year
        return self._year == current_year