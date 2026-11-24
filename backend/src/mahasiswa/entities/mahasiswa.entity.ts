export const STATUS_PRESENSI = ['Hadir', 'Izin', 'Sakit', 'Alpa'] as const;
export type StatusPresensi = (typeof STATUS_PRESENSI)[number];

export class Mahasiswa {
  id: number; // number
  nama: string; // string
  nim: string; // string (angka sebagai teks)
  kelas: string; // string
  status: StatusPresensi; // enum / union
  tanggal: string; // tanggal ISO (YYYY-MM-DD)
  keterangan?: string; // opsional
}
