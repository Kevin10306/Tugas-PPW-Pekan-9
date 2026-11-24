function KartuMahasiswa({ nama, nim, kelas, status, onHapus, onUbahStatus }) {
  return (
    <article className="kartu">
      <div className="kartu-info">
        <h3>{nama}</h3>
        <p>
          {nim} · {kelas}
        </p>
      </div>
      <div className="kartu-aksi">
        <select
          className={`lencana pilih-status status-${status.toLowerCase()}`}
          value={status}
          onChange={(e) => onUbahStatus(e.target.value)}
          aria-label={`Ubah status ${nama}`}
        >
          <option>Hadir</option>
          <option>Izin</option>
          <option>Sakit</option>
          <option>Alpa</option>
        </select>
        <button type="button" className="tombol-hapus" onClick={onHapus}>
          Hapus
        </button>
      </div>
    </article>
  )
}

export default KartuMahasiswa
