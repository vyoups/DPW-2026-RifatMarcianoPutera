// ===== Fungsi generik fetch + render tabel (penggabungan buku.js & anggota.js) =====
// config = { jsonPath, containerSelector, columns: [{ key, render? }], colspan, reloadBtnId }
async function muatDaftarData(config) {
    const tbody = document.querySelector(config.containerSelector + " tbody") ||
        document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        // simulasi delay jaringan agar loading indicator terlihat
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const res = await fetch(config.jsonPath);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarData = await res.json();

        daftarData.forEach(function (item) {
            const tr = document.createElement("tr");

            let html = "";
            config.columns.forEach(function (kolom) {
                html += "<td>" + item[kolom.key] + "</td>";
            });

            // kolom aksi
            html += "<td>" +
                "<button type=\"button\" class=\"btn-edit\">Edit</button> ";

            if (config.withDetail) {
                html += "<button type=\"button\" class=\"btn-detail\">Detail</button> ";
            }

            html += "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";

            tr.innerHTML = html;
            tbody.appendChild(tr);
        });

        // perbarui counter setelah data dimuat
        const counter = document.getElementById("row-counter");
        if (counter) {
            counter.textContent = "Menampilkan " + daftarData.length + " dari " + daftarData.length + " data";
        }
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"" + config.colspan + "\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
    }
}

function initTombolMuatUlang(config) {
    const btn = document.getElementById(config.reloadBtnId);
    if (!btn) return;
    btn.addEventListener("click", function () {
        muatDaftarData(config);
    });
}

// ===== Konfigurasi halaman Daftar Buku =====
const configBuku = {
    jsonPath: "../data/buku.json",
    containerSelector: ".table-responsive table",
    columns: [
        { key: "judul" },
        { key: "pengarang" },
        { key: "tahun" },
        { key: "kategori" },
        { key: "stok" }
    ],
    colspan: 6,
    withDetail: true,
    reloadBtnId: "btn-reload"
};

// ===== Konfigurasi halaman Daftar Anggota =====
const configAnggota = {
    jsonPath: "../data/anggota.json",
    containerSelector: ".table-responsive table",
    columns: [
        { key: "no_anggota" },
        { key: "nama" },
        { key: "alamat" },
        { key: "no_hp" },
        { key: "tanggal_bergabung" }
    ],
    colspan: 6,
    withDetail: false,
    reloadBtnId: "btn-reload"
};

// deteksi halaman berdasarkan penanda di <body>
document.addEventListener("DOMContentLoaded", function () {
    const halaman = document.body.getAttribute("data-page");
    if (halaman === "buku") {
        muatDaftarData(configBuku);
        initTombolMuatUlang(configBuku);
    } else if (halaman === "anggota") {
        muatDaftarData(configAnggota);
        initTombolMuatUlang(configAnggota);
    }
});
