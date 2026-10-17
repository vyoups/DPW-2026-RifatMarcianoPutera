// ===== Toggle sidebar off-canvas (mobile) =====
// Tombol hamburger (#sidebar-toggle) membuka/menutup sidebar.
// Klik overlay juga menutup sidebar.
function initNavToggle() {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar || !toggleBtn) return;

    function tutupSidebar() {
        sidebar.classList.remove("sidebar-open");
        if (overlay) overlay.classList.remove("sidebar-open");
    }

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-open");
        if (overlay) overlay.classList.toggle("sidebar-open");
    });

    if (overlay) {
        overlay.addEventListener("click", tutupSidebar);
    }
}

// ===== Fungsi generik fetch + render tabel =====
// config = { jsonPath, columns: [{ key, render? }], colspan }
async function muatDaftarData(config) {
    const tbody = document.querySelector(".table-responsive table tbody");
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    if (loading) loading.style.display = "block";
    tbody.innerHTML = "";

    try {
        // simulasi delay jaringan agar loading indicator terlihat
        await new Promise((resolve) => setTimeout(resolve, 800));

        const res = await fetch(config.jsonPath);
        if (!res.ok) {
            throw new Error("Gagal mengambil data (status " + res.status + ")");
        }
        const daftarData = await res.json();

        daftarData.forEach(function (item) {
            const tr = document.createElement("tr");

            let html = "";
            config.columns.forEach(function (kolom) {
                const nilai = kolom.render ? kolom.render(item[kolom.key], item) : item[kolom.key];
                html += "<td>" + nilai + "</td>";
            });

            // kolom aksi
            html += "<td>" +
                "<button type=\"button\" class=\"btn-edit\">Edit</button> " +
                "<button type=\"button\" class=\"btn-hapus\">Hapus</button>" +
                "</td>";

            tr.innerHTML = html;
            tbody.appendChild(tr);
        });

        // perbarui counter & terapkan filter setelah data dimuat
        terapkanFilter();
    } catch (err) {
        tbody.innerHTML =
            "<tr><td colspan=\"" + config.colspan + "\">Gagal memuat data: " + err.message + "</td></tr>";
    } finally {
        if (loading) loading.style.display = "none";
    }
}

// Memakai event delegation karena baris tabel dirender dinamis via fetch
// (lihat produk.js/customer.js), sehingga tombol .btn-hapus belum tentu ada saat load.
function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();
        }
    });
}


// ===== Filter/pencarian tabel real-time (kolom Nama) =====
function terapkanFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    const counter = document.getElementById("row-counter");
    if (!input || !table) return;

    const keyword = input.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");
    let terlihat = 0;
    rows.forEach(function (row) {
        const kolomNama = row.querySelectorAll("td")[1];
        const teks = kolomNama ? kolomNama.textContent.toLowerCase() : "";
        const cocok = teks.includes(keyword);
        row.style.display = cocok ? "" : "none";
        if (cocok) terlihat++;
    });

    if (counter) {
        counter.textContent = "Menampilkan " + terlihat + " dari " + rows.length + " data";
    }
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", terapkanFilter);
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

function validasiField(input) {
    const nama = input.name;
    const nilai = input.value.trim();

    if (nama === "nama") {
        if (nilai === "") {
            tampilkanError(input, "Nama wajib diisi.");
            return false;
        }
    }

    if (nama === "harga_sewa") {
        const n = parseInt(nilai, 10);
        if (isNaN(n) || n < 0) {
            tampilkanError(input, "Harga sewa tidak boleh negatif.");
            return false;
        }
    }

    if (nama === "status") {
        if (nilai === "") {
            tampilkanError(input, "Status wajib dipilih.");
            return false;
        }
    }

    if (nama === "email" && nilai !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nilai)) {
            tampilkanError(input, "Format email tidak valid.");
            return false;
        }
    }

    if (nama === "telepon" && nilai !== "") {
        if (!/^[0-9+ -]+$/.test(nilai)) {
            tampilkanError(input, "Telepon hanya boleh angka.");
            return false;
        }
    }

    hapusError(input);
    return true;
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    const fieldWajibValidasi = ["nama", "harga_sewa", "status", "email", "telepon"];

    form.addEventListener("submit", function (e) {
        let valid = true;

        fieldWajibValidasi.forEach(function (namaField) {
            const input = form.querySelector("[name='" + namaField + "']");
            if (!input) return;
            if (!validasiField(input)) {
                valid = false;
            }
        });

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});
