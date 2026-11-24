import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validasi global: DTO dicek otomatis, field asing ditolak
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Izinkan frontend Vite (port 5173) mengakses API
  app.enableCors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
