|  | Desain dan Pemrograman Web |
|---|---|
| NIM | 254107020238 |
| Nama | Rifat Marciano Putera |
| Kelas | TI - 2F |
| Absen | 25 |
| Repository | [DPW-2026-RifatMarcianoPutera](https://github.com/vyoups/DPW-2026-RifatMarcianoPutera/tree/main/Jobsheet-01) |


# Jobsheet 1 — HTML5 Semantic

## Materi

Jobsheet 1 membahas **struktur dasar HTML5 menggunakan Semantic HTML**.

## Semantic HTML

Semantic HTML adalah penggunaan tag HTML berdasarkan fungsi atau maknanya.

| Tag         | Fungsi                |
| ----------- | --------------------- |
| `<header>`  | Bagian kepala halaman |
| `<nav>`     | Menu navigasi         |
| `<main>`    | Konten utama          |
| `<section>` | Membagi bagian konten |
| `<article>` | Konten/artikel        |
| `<footer>`  | Bagian bawah halaman  |

## Struktur File

```text
jobsheet-01/
├── index.html
├── buku/
│   ├── list.html
│   └── tambah.html
└── anggota/
    ├── list.html
    └── tambah.html
```

## Materi yang Dipelajari

* Struktur dasar HTML5
* Penggunaan Semantic HTML
* Membuat tabel dengan `<table>`
* Membuat form dengan `<form>`
* Penggunaan atribut `id` dan `name`
* Membuat struktur website menggunakan folder dan file HTML

## Latihan Reflektif 6.5

1. Kenapa field "Alamat" dan "No. HP" tidak diberi required, sedangkan "Nama" dan "No. Anggota" diberi?<br>
`Karena, data tersebut termasuk data tambahan sehingga boleh dikosongkan`
2. Apa yang akan terjadi (di browser) kalau kamu klik tombol "Simpan" tanpa mengisi field "Nama"? Coba buka filenya di browser dan praktikkan.<br>
`Data tidak dapat disimpan karena, tabel tersebut betipe required`
3. Form ini juga belum punya action pada tag form-nya — apa dampaknya saat tombol "Simpan" ditekan?<br>
`Data yang sudah kita isikan akan hilang`
