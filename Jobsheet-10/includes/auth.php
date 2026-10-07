<?php
// Guard clause: di-include di baris paling atas setiap halaman yang
// membutuhkan login (sebelum header.php mengeluarkan output apa pun),
// agar header('Location: ...') masih bisa dipanggil.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/login.php');
    exit;
}

// Tugas mandiri: pembatasan berdasarkan role.
// Panggil wajib_admin() di halaman/aksi yang hanya boleh dilakukan admin.
function wajib_admin(string $kembali = 'list.php'): void
{
    if (($_SESSION['role'] ?? '') !== 'admin') {
        $_SESSION['flash'] = [
            'type' => 'error',
            'pesan' => 'Akses ditolak: hanya admin yang boleh melakukan aksi ini.',
        ];
        header('Location: ' . $kembali);
        exit;
    }
}