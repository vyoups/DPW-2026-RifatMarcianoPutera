// ===== Konfigurasi halaman Daftar Customer =====
const configCustomer = {
    jsonPath: "../data/customer.json",
    columns: [
        { key: "id" },
        { key: "nama" },
        { key: "email" },
        { key: "telepon" }
    ],
    colspan: 5
};

// deteksi halaman berdasarkan penanda di <body>
document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-page") === "customer") {
        muatDaftarData(configCustomer);
    }
});
