import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const dataSource = app.get(DataSource);
  //check connect database
  if (dataSource.isInitialized) {
    console.log('Database connected successfully! khainv');
  } else {
    console.log('Database connection failed! khainv');
  }
// Thêm dòng này để bật CORS cho Front-end của bạn
  app.enableCors({
    origin: 'http://localhost:5173', // Cho phép Vite/React truy cập
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Bật nếu bạn có gửi kèm Cookie hoặc JWT qua Header
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
