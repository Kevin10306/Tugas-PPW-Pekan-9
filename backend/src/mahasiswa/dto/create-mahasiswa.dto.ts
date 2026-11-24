import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { STATUS_PRESENSI } from '../entities/mahasiswa.entity.js';
import type { StatusPresensi } from '../entities/mahasiswa.entity.js';

export class CreateMahasiswaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'nama minimal 3 karakter' })
  nama: string;

  @IsString()
  @Matches(/^\d{8,12}$/, { message: 'nim harus 8-12 digit angka' })
  nim: string;

  @IsString()
  @IsNotEmpty()
  kelas: string;

  @IsIn(STATUS_PRESENSI, {
    message: `status harus salah satu dari: ${STATUS_PRESENSI.join(', ')}`,
  })
  status: StatusPresensi;

  @IsOptional()
  @IsDateString({}, { message: 'tanggal harus format ISO, contoh 2026-11-24' })
  tanggal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  keterangan?: string;
}
