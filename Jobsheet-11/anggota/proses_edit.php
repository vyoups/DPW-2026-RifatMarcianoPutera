<?php
require __DIR__ . '/../includes/auth.php';
require __DIR__ . '/../includes/csrf.php';
require __DIR__ . '/../includes/koneksi.php';

csrf_verify();

$id = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);
$nama = trim($_POST['nama'] ?? '');
$noAnggota = trim($_POST['no_anggota'] ?? '');
$alamat = trim($_POST['alamat'] ?? '');
$noHp = trim($_POST['no_hp'] ?? '');

if ($id === false) {
    header('Location: list.php');
    exit;
}

$errors = [];
if ($nama === '' || mb_strlen($nama) > 255) {
    $errors[] = "Nama wajib diisi (maks. 255 karakter).";
}
if ($noAnggota === '' || mb_strlen($noAnggota) > 50) {
    $errors[] = "No. Anggota wajib diisi (maks. 50 karakter).";
}
if (mb_strlen($alamat) > 255) {
    $errors[] = "Alamat maksimal 255 karakter.";
}
if ($noHp !== '' && !preg_match('/^[0-9+\- ]{1,30}$/', $noHp)) {
    $errors[] = "No. HP hanya boleh berisi angka, spasi, + dan - (maks. 30 karakter).";
}

if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'pesan' => implode(' ', $errors)];
    header('Location: edit.php?id=' . $id);
    exit;
}

$stmt = $pdo->prepare(
    "UPDATE anggota SET nama = :nama, no_anggota = :no_anggota,
     alamat = :alamat, no_hp = :no_hp WHERE id = :id"
);
$stmt->execute([
    'nama' => $nama,
    'no_anggota' => $noAnggota,
    'alamat' => $alamat,
    'no_hp' => $noHp,
    'id' => $id,
]);

$_SESSION['flash'] = ['type' => 'success', 'pesan' => 'Anggota berhasil diperbarui.'];
header('Location: list.php');
exit;