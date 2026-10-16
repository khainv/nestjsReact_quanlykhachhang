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
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
