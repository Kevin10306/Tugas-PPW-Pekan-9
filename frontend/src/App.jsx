import { useEffect, useState } from 'react'
import Header from './components/Header'
import RingkasanPresensi from './components/RingkasanPresensi'
import FormTambahMahasiswa from './components/FormTambahMahasiswa'
import DaftarMahasiswa from './components/DaftarMahasiswa'
import * as api from './api'

function App() {
  const [daftarMahasiswa, setDaftarMahasiswa] = useState([])
  const [memuat, setMemuat] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getMahasiswa()
      .then(setDaftarMahasiswa)
      .catch(() => setError('Tidak bisa terhubung ke backend. Pastikan server NestJS berjalan di port 3000.'))
      .finally(() => setMemuat(false))
  }, [])

  const tambahMahasiswa = async (mahasiswaBaru) => {
    try {
      const data = await api.tambahMahasiswa(mahasiswaBaru)
      setDaftarMahasiswa((lama) => [...lama, data])
      setError('')
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  const ubahStatus = async (id, status) => {
    try {
      const data = await api.ubahMahasiswa(id, { status })
      setDaftarMahasiswa((lama) => lama.map((m) => (m.id === id ? data : m)))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const hapusMahasiswa = async (id) => {
    try {
      await api.hapusMahasiswa(id)
      setDaftarMahasiswa((lama) => lama.filter((m) => m.id !== id))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="app">
      <Header judul="Presensi Mahasiswa" matkul="Pemrograman Web — Pekan 9" />
      {error && <p className="galat" role="alert">{error}</p>}
      <main className="layout">
        <aside className="sisi">
          <RingkasanPresensi daftar={daftarMahasiswa} />
          <FormTambahMahasiswa onTambah={tambahMahasiswa} />
        </aside>
        {memuat ? (
          <p className="kosong">Memuat data…</p>
        ) : (
          <DaftarMahasiswa daftar={daftarMahasiswa} onHapus={hapusMahasiswa} onUbahStatus={ubahStatus} />
        )}
      </main>
    </div>
  )
}

export default App
