import { PartialType } from '@nestjs/mapped-types';
import { CreateMahasiswaDto } from './create-mahasiswa.dto.js';

export class UpdateMahasiswaDto extends PartialType(CreateMahasiswaDto) {}
