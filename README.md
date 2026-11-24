# Presensi Mahasiswa

## Deksripsi
Presensi Mahasiswa adalah platform daring yang digunakan untuk merekam kehadiran siswa dalam mata kuliah Pemrograman Web. Pengguna memiliki kemampuan untuk menambahkan informasi kehadiran, mengubah status kehadiran (Hadir, Izin, Sakit, Alpa), menghapus informasi, serta melihat ringkasan jumlah berdasarkan status secara real-time

Bagian depan dibangun menggunakan React dan Vite. Bagian belakang dikembangkan dengan NestJS mengikuti pola MVC (Controller, Service, Entity/DTO), melakukan validasi data dengan class-validator, serta menangani kesalahan melalui NotFoundException dan ConflictException. Data disimpan sementara di memori server (akan hilang saat server restart)

## Struktur
```
frontend/   React + Vite (port 5173)
backend/    NestJS (port 3000)
docs/       screenshot pengujian
```

## Endpoint
| Method | URL | Fungsi |
|---|---|---|
| GET | /mahasiswa | semua data |
| GET | /mahasiswa/:id | satu data |
| POST | /mahasiswa | tambah |
| PATCH | /mahasiswa/:id | ubah sebagian |
| DELETE | /mahasiswa/:id | hapus |

## Screenshot
Screenshots tersimpan di [Screenshots](/docs/screenshots)