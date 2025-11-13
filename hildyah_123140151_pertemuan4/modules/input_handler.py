from modules.data_manager import hitung_nilai_akhir, tentukan_grade


def input_mahasiswa_baru():
    """
    Meminta input data mahasiswa baru dari user.
    
    Returns:
        dict: Dictionary berisi data mahasiswa baru
    """
    print("\n" + "="*50)
    print("INPUT DATA MAHASISWA BARU".center(50))
    print("="*50)
    
    try:
        nama = input("Nama Lengkap: ").strip()
        if not nama:
            raise ValueError("Nama tidak boleh kosong")
        
        nim = input("NIM: ").strip()
        if not nim:
            raise ValueError("NIM tidak boleh kosong")
        
        nilai_uts = float(input("Nilai UTS (0-100): "))
        if not 0 <= nilai_uts <= 100:
            raise ValueError("Nilai UTS harus antara 0-100")
        
        nilai_uas = float(input("Nilai UAS (0-100): "))
        if not 0 <= nilai_uas <= 100:
            raise ValueError("Nilai UAS harus antara 0-100")
        
        nilai_tugas = float(input("Nilai Tugas (0-100): "))
        if not 0 <= nilai_tugas <= 100:
            raise ValueError("Nilai Tugas harus antara 0-100")
        
        mahasiswa_baru = {
            "nama": nama,
            "nim": nim,
            "nilai_uts": nilai_uts,
            "nilai_uas": nilai_uas,
            "nilai_tugas": nilai_tugas
        }
        
        # Hitung nilai akhir dan grade
        nilai_akhir = hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas)
        mahasiswa_baru["nilai_akhir"] = round(nilai_akhir, 2)
        mahasiswa_baru["grade"] = tentukan_grade(nilai_akhir)
        
        return mahasiswa_baru
    
    except ValueError as e:
        print(f"\n❌ Error: {e}")
        return None