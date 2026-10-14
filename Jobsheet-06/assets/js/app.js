// ===== Hamburger menu =====
// Mendukung dua pola: tombol JS (#nav-toggle-btn) atau label checkbox hack.
function initNavToggle() {
    const nav = document.querySelector("header nav");
    if (!nav) return;

    const toggleBtn = document.getElementById("nav-toggle-btn");
    const checkbox = document.getElementById("nav-toggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            nav.classList.toggle("nav-open");
        });
    }

    if (checkbox) {
        checkbox.addEventListener("change", function () {
            nav.classList.toggle("nav-open", checkbox.checked);
        });
    }
}

// Memakai event delegation di document karena baris tabel sekarang
// dirender dinamis via fetch (lihat data.js) sehingga tombol
// .btn-hapus belum tentu ada saat DOMContentLoaded.
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

// ===== Tombol Detail (event delegation, sama seperti Hapus) =====
function initDetailBtn() {
    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".btn-detail");
        if (!btn) return;

        const row = btn.closest("tr");
        if (!row) return;
        const judul = row.querySelector("td")?.textContent || "buku ini";
        alert("Detail buku: " + judul);
    });
}

// ===== Filter/pencarian tabel real-time (hanya kolom pertama) =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    const counter = document.getElementById("row-counter");
    if (!input || !table) return;

    function updateCounter(terlihat, total) {
        if (counter) {
            counter.textContent = "Menampilkan " + terlihat + " dari " + total + " data";
        }
    }

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        let terlihat = 0;
        rows.forEach(function (row) {
            const kolomPertama = row.querySelector("td");
            const teks = kolomPertama ? kolomPertama.textContent.toLowerCase() : "";
            const cocok = teks.includes(keyword);
            row.style.display = cocok ? "" : "none";
            if (cocok) terlihat++;
        });
        updateCounter(terlihat, rows.length);
    });

    // isi counter pertama kali
    updateCounter(table.querySelectorAll("tbody tr").length, table.querySelectorAll("tbody tr").length);
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

// validasi berbasis daftar field (refactor) — tiap field punya aturan sendiri
function validasiField(input) {
    const nama = input.name;
    const nilai = input.value.trim();

    if (nama === "judul" || nama === "nama") {
        if (nilai === "") {
            tampilkanError(input, "Field ini wajib diisi.");
            return false;
        }
    }

    if (nama === "pengarang") {
        if (nilai === "") {
            tampilkanError(input, "Pengarang wajib diisi.");
            return false;
        }
    }

    if (nama === "tahun") {
        const n = parseInt(nilai, 10);
        if (isNaN(n) || n < 1900 || n > 2026) {
            tampilkanError(input, "Tahun harus di antara 1900-2026.");
            return false;
        }
    }

    if (nama === "stok") {
        const n = parseInt(nilai, 10);
        if (isNaN(n) || n < 0) {
            tampilkanError(input, "Stok tidak boleh negatif.");
            return false;
        }
    }

    // ISBN: hanya angka dan tanda hubung (latihan JS5)
    if (nama === "isbn" && nilai !== "") {
        if (!/^[0-9-]+$/.test(nilai)) {
            tampilkanError(input, "ISBN hanya boleh angka dan tanda hubung.");
            return false;
        }
    }

    hapusError(input);
    return true;
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    // daftar field yang divalidasi (refactor, bukan blok if manual satu-satu)
    const fieldWajibValidasi = ["judul", "nama", "pengarang", "tahun", "stok", "isbn"];

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
    initDetailBtn();
    initTableFilter();
    initValidasiForm();
});
