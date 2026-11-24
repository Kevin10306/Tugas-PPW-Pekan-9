const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const pesan = Array.isArray(data.message) ? data.message.join(', ') : data.message
    throw new Error(pesan || 'Terjadi kesalahan pada server')
  }
  return data
}

export const getMahasiswa = () => request('/mahasiswa')
export const tambahMahasiswa = (body) =>
  request('/mahasiswa', { method: 'POST', body: JSON.stringify(body) })
export const ubahMahasiswa = (id, body) =>
  request(`/mahasiswa/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const hapusMahasiswa = (id) => request(`/mahasiswa/${id}`, { method: 'DELETE' })
