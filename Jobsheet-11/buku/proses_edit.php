<?php
require __DIR__ . '/../includes/auth.php';
require __DIR__ . '/../includes/csrf.php';
require __DIR__ . '/../includes/koneksi.php';

csrf_verify();

$kategoriValid = ['fiksi', 'non-fiksi', 'referensi'];

$id = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);
$judul = trim($_POST['judul'] ?? '');
$pengarang = trim($_POST['pengarang'] ?? '');
$isbn = trim($_POST['isbn'] ?? '');
$kategori = trim($_POST['kategori'] ?? '');
$tahun = filter_var($_POST['tahun'] ?? '', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1900, 'max_range' => 2026]]);
$stok = filter_var($_POST['stok'] ?? '', FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]);

if ($id === false) {
    header('Location: list.php');
    exit;
}

$errors = [];
if ($judul === '' || mb_strlen($judul) > 255) {
    $errors[] = "Judul wajib diisi (maks. 255 karakter).";
}
if ($pengarang === '' || mb_strlen($pengarang) > 255) {
    $errors[] = "Pengarang wajib diisi (maks. 255 karakter).";
}
if ($tahun === false) {
    $errors[] = "Tahun harus berupa angka di antara 1900-2026.";
}
if ($stok === false) {
    $errors[] = "Stok harus berupa angka bulat, tidak boleh negatif.";
}
if (mb_strlen($isbn) > 50) {
    $errors[] = "ISBN maksimal 50 karakter.";
}
if (!in_array($kategori, $kategoriValid, true)) {
    $errors[] = "Kategori tidak valid.";
}

if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: edit.php?id=' . $id);
    exit;
}

$stmt = $pdo->prepare(
    "UPDATE buku SET judul = :judul, pengarang = :pengarang, tahun = :tahun,
     isbn = :isbn, stok = :stok, kategori = :kategori WHERE id = :id"
);
$stmt->execute([
    'judul' => $judul,
    'pengarang' => $pengarang,
    'tahun' => $tahun,
    'isbn' => $isbn,
    'stok' => $stok,
    'kategori' => $kategori,
    'id' => $id,
]);

$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Buku berhasil diperbarui.'];
header('Location: list.php');
exit;