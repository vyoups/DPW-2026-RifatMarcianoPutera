<?php
$page_title = "Daftar Anggota";
include __DIR__ . '/../includes/header.php';
require __DIR__ . '/../includes/koneksi.php';

$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);

$perPage = 10;
$totalRows = (int) $pdo->query("SELECT COUNT(*) FROM anggota")->fetchColumn();
$totalPages = max(1, (int) ceil($totalRows / $perPage));
$page = min($totalPages, max(1, (int) ($_GET['page'] ?? 1)));
$offset = ($page - 1) * $perPage;

$stmt = $pdo->prepare("SELECT * FROM anggota ORDER BY id DESC LIMIT :limit OFFSET :offset");
$stmt->bindValue('limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue('offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$daftarAnggota = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<section>
    <h2>Daftar Anggota</h2>

    <?php if ($flash): ?>
        <p class="flash flash-<?php echo $flash['type']; ?>"><?php echo $flash['pesan']; ?></p>
    <?php endif; ?>

    <div class="search-box">
        <label for="search-input">Cari Nama Anggota</label>
        <input type="text" id="search-input" placeholder="Ketik nama anggota...">
    </div>

    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>No. Anggota</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                    <th>No. HP</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($daftarAnggota)): ?>
                    <tr>
                        <td colspan="5">Belum ada data anggota. Silakan tambah lewat menu "Tambah Anggota".</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($daftarAnggota as $anggota): ?>
<tr>
    <td><?php echo $anggota['no_anggota']; ?></td>
    <td><?php echo $anggota['nama']; ?></td>
    <td><?php echo $anggota['alamat']; ?></td>
    <td><?php echo $anggota['no_hp']; ?></td>
    <td>
        <a href="edit.php?id=<?php echo $anggota['id']; ?>" class="btn-edit">Edit</a>
        <?php if (($_SESSION['role'] ?? '') === 'admin'): ?>
        <form class="form-hapus" method="post" action="hapus.php">
            <input type="hidden" name="id" value="<?php echo $anggota['id']; ?>">
            <button type="submit" class="btn-hapus">Hapus</button>
        </form>
        <?php endif; ?>
    </td>
</tr>
<?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <nav class="pagination">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <a href="list.php?page=<?php echo $i; ?>"
                class="<?php echo $i === $page ? 'active' : ''; ?>"><?php echo $i; ?></a>
        <?php endfor; ?>
    </nav>
</section>
<?php include __DIR__ . '/../includes/footer.php'; ?>