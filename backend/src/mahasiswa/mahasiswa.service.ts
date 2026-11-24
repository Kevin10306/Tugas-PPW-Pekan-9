import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto.js';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto.js';
import { Mahasiswa } from './entities/mahasiswa.entity.js';

const hariIni = () => new Date().toISOString().slice(0, 10);

@Injectable()
export class MahasiswaService {
  // Penyimpanan sementara di memori (array)
  private daftar: Mahasiswa[] = [
    { id: 1, nama: 'Aisyah Putri Rahmawati', nim: '2211010101', kelas: 'TI-3A', status: 'Hadir', tanggal: hariIni() },
    { id: 2, nama: 'Bagas Dwi Prasetyo', nim: '2211010114', kelas: 'TI-3A', status: 'Hadir', tanggal: hariIni() },
    { id: 3, nama: 'Citra Lestari', nim: '2211010123', kelas: 'TI-3A', status: 'Izin', tanggal: hariIni(), keterangan: 'Acara keluarga' },
    { id: 4, nama: 'Dimas Ardiansyah', nim: '2211010137', kelas: 'TI-3B', status: 'Sakit', tanggal: hariIni() },
    { id: 5, nama: 'Eka Wulandari', nim: '2211010142', kelas: 'TI-3B', status: 'Alpa', tanggal: hariIni() },
  ];
  private nextId = 6;

  create(dto: CreateMahasiswaDto): Mahasiswa {
    const tanggal = dto.tanggal ?? hariIni();
    this.pastikanTidakDuplikat(dto.nim, tanggal);

    const baru: Mahasiswa = { id: this.nextId++, ...dto, tanggal };
    this.daftar.push(baru);
    return baru;
  }

  findAll(): Mahasiswa[] {
    return this.daftar;
  }

  findOne(id: number): Mahasiswa {
    const mhs = this.daftar.find((m) => m.id === id);
    if (!mhs) {
      throw new NotFoundException(`Mahasiswa dengan id ${id} tidak ditemukan`);
    }
    return mhs;
  }

  update(id: number, dto: UpdateMahasiswaDto): Mahasiswa {
    const mhs = this.findOne(id);
    const nimBaru = dto.nim ?? mhs.nim;
    const tanggalBaru = dto.tanggal ?? mhs.tanggal;
    this.pastikanTidakDuplikat(nimBaru, tanggalBaru, id);

    Object.assign(mhs, dto);
    return mhs;
  }

  remove(id: number): { message: string } {
    const mhs = this.findOne(id);
    this.daftar = this.daftar.filter((m) => m.id !== id);
    return { message: `Data ${mhs.nama} berhasil dihapus` };
  }

  // NIM yang sama tidak boleh dicatat dua kali pada tanggal yang sama
  private pastikanTidakDuplikat(nim: string, tanggal: string, abaikanId?: number) {
    const ada = this.daftar.some(
      (m) =>
        m.nim === nim &&
        m.tanggal.slice(0, 10) === tanggal.slice(0, 10) &&
        m.id !== abaikanId,
    );
    if (ada) {
      throw new ConflictException(
        `Presensi NIM ${nim} pada ${tanggal.slice(0, 10)} sudah tercatat`,
      );
    }
  }
}
