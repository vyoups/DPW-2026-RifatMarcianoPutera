// ===== Konfigurasi halaman Daftar Produk =====
const configProduk = {
    jsonPath: "../data/produk.json",
    columns: [
        { key: "id" },
        { key: "nama" },
        { key: "harga_sewa", render: (v) => "Rp " + v },
        { key: "status" }
    ],
    colspan: 5
};

// deteksi halaman berdasarkan penanda di <body>
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-page") === "produk") {
        muatDaftarData(configProduk);
    }
});
