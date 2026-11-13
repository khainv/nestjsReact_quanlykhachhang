import { Module } from '@nestjs/common';
import { UserActivitiesController } from './user-activities.controller.js';
import { UserActivitiesService } from './user-activities.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersActivityk } from '../../entities/users.activity.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsersActivityk])],
  controllers: [UserActivitiesController],
  providers: [UserActivitiesService],
  exports: [UserActivitiesService],
})
export class UserActivitiesModule {}
