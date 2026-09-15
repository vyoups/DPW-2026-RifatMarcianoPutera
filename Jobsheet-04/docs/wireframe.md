# Wireframe SIMPUS-Mini

## 1. Login

### Tampilan

```text
+--------------------------------+
|          SIMPUS-Mini           |
|                                |
| Username                       |
| [________________________]     |
|                                |
| Password                       |
| [________________________]     |
|                                |
|          [ MASUK ]             |
+--------------------------------+
```

### Alur
1. Petugas memasukkan username dan password.
2. Petugas menekan tombol **Masuk**.
3. Sistem memeriksa data login.
4. Jika benar, petugas diarahkan ke Dashboard.

---

## 2. Dashboard Petugas

### Tampilan

```text
+------------------------------------------------+
| SIMPUS-Mini                    Dashboard Logout |
+------------------------------------------------+
| Dashboard Petugas                              |
|                                                |
| [ Total Buku ]  [ Total Anggota ]              |
| [ Dipinjam   ]  [ Terlambat    ]               |
|                                                |
| Menu: Peminjaman | Pengembalian | Riwayat      |
+------------------------------------------------+
```

### Alur
1. Petugas masuk ke dashboard.
2. Sistem menampilkan ringkasan data.
3. Petugas memilih menu yang dibutuhkan.

---

## 3. Peminjaman

### Tampilan

```text
+----------------------------------------+
|           Peminjaman Buku              |
+----------------------------------------+
| Anggota                                |
| [ Pilih anggota ▼ ]                    |
|                                        |
| Buku                                   |
| [ Pilih buku ▼ ]                       |
|                                        |
| Tanggal Pinjam                         |
| [  DD/MM/YYYY  ]                       |
|                                        |
|              [ SIMPAN ]                |
+----------------------------------------+
```

### Alur
1. Petugas memilih anggota.
2. Petugas memilih buku.
3. Petugas menentukan tanggal peminjaman.
4. Petugas menekan **Simpan**.
5. Sistem mencatat transaksi.

---

## 4. Pengembalian

### Tampilan

```text
+----------------------------------------+
|          Pengembalian Buku             |
+----------------------------------------+
| ID Peminjaman                          |
| [________________________]             |
|                                        |
| Informasi Peminjaman                   |
| Anggota : -                            |
| Buku    : -                            |
|                                        |
|          [ KEMBALIKAN ]                |
+----------------------------------------+
```

### Alur
1. Petugas mencari transaksi peminjaman.
2. Sistem menampilkan informasi buku.
3. Petugas melakukan pengembalian.
4. Sistem memperbarui status transaksi.

---

## 5. Riwayat

### Tampilan

```text
+------------------------------------------------------+
|                  Riwayat Peminjaman                  |
+------------------------------------------------------+
| No | Anggota | Buku | Tgl Pinjam | Status            |
|----|---------|------|------------|-------------------|
| 1  | Andi    | ...  | 01/09/26   | Dikembalikan      |
| 2  | Budi    | ...  | 03/09/26   | Dipinjam          |
+------------------------------------------------------+
```

### Alur
1. Petugas membuka menu Riwayat.
2. Sistem menampilkan daftar transaksi.
3. Petugas dapat melihat status setiap transaksi.

---

## Kesimpulan

Wireframe ini digunakan sebagai rancangan awal tampilan dan alur
SIMPUS-Mini sebelum fitur diimplementasikan ke dalam HTML, CSS, dan
JavaScript.