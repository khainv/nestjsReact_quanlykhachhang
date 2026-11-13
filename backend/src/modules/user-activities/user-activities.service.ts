import { ConflictException, Injectable } from '@nestjs/common';
import { UsersActivityk } from '../../entities/users.activity.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUsersActivitiesDto } from '../../dto/addUsersActivities.Dto.js';

@Injectable()
export class UserActivitiesService {
  constructor(
    @InjectRepository(UsersActivityk)
    private readonly userActivityRepository: Repository<UsersActivityk>,
  ) {}
  // Thêm khách hàng
  async create(
    dto: AddUsersActivitiesDto,
    id: number,
  ): Promise<UsersActivityk> {
    const data: Partial<UsersActivityk> = {
      use_id: dto.use_id,
      adm_id: id,
      act_name: dto.act_name,
      act_des: dto.act_des,
    };
    const user = await this.userActivityRepository.create(data);
    try {
      const rs = await this.userActivityRepository.save(user);
      return rs;
    } catch (error) {
      if ((error as { code?: string }).code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Không thêm được hoạt động, vui lòng thử lại',
        );
      }
      throw error;
    }
  }
  async getActivitiesByUseId(
    use_id: number,
    adm_id?: number | null,
  ): Promise<UsersActivityk[]> {
    const list = await this.userActivityRepository.find({
      where: {
        use_id: use_id,
      },
      relations: {
        admink: true,
      },
      order: {
        created_at: 'DESC',
      },
    });
    return list;
  }
}
