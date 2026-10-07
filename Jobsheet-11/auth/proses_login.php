<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require __DIR__ . '/../includes/csrf.php';
require __DIR__ . '/../includes/koneksi.php';

csrf_verify();

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Tugas mandiri: ganti ID session setelah login berhasil agar session ID
    // lama (yang mungkin sudah diketahui penyerang) tidak berlaku lagi.
    session_regenerate_id(true);

    // Whitelist role: nilai di luar daftar ini diperlakukan sebagai 'petugas'.
    $role = in_array($user['role'], ['admin', 'petugas'], true) ? $user['role'] : 'petugas';

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama'] = $user['nama'];
    $_SESSION['role'] = $role;
    header('Location: ../index.php');
    exit;
}

$_SESSION['flash'] = ['type' => 'error', 'pesan' => 'Username atau password salah.'];
header('Location: login.php');
exit;