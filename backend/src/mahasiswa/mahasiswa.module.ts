import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service.js';
import { MahasiswaController } from './mahasiswa.controller.js';

@Module({
  controllers: [MahasiswaController],
  providers: [MahasiswaService],
})
export class MahasiswaModule {}
