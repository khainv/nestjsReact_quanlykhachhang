import { Module } from '@nestjs/common';
import { AdminkController } from './admink.controller.js';
import { AdminkService } from './admink.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../../entities/admin.entity.js';
import { AdminToken } from '../../entities/admin.token.entity.js';

@Module({
  controllers: [AdminkController],
  providers: [AdminkService],
  imports: [TypeOrmModule.forFeature([Admin, AdminToken])],
  exports: [AdminkService],
})
export class AdminkModule {}
