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

  async findByUser(use_id: number, page: number = 1, showItem: number = 5) {
    page = Math.max(1, page);

    const daysPerPage = showItem;

    // BƯỚC 1: Đếm tổng số ngày có phát sinh hoạt động
    const totalResult = await this.userActivityRepository
      .createQueryBuilder('activity')
      .select('COUNT(DISTINCT DATE(activity.created_at))', 'totalDays')
      .where('activity.use_id = :use_id', { use_id })
      .getRawOne();

    const totalDays = Number(totalResult.totalDays);
    //console.log('tổng số ngay : ', totalDays);

    // Tổng số trang
    const totalPages = Math.ceil(totalDays / daysPerPage);

    // Nếu page vượt quá số trang
    if (page > totalPages || totalDays === 0) {
      return {
        items: [],
        pagination: {
          page,
          daysPerPage,
          totalDays,
          totalPages,
          hasNext: false,
        },
      };
    }

    // BƯỚC 2: Lấy 5 ngày có hoạt động gần nhất
    const dateResults = await this.userActivityRepository
      .createQueryBuilder('activity')
      .select('DATE(activity.created_at)', 'activityDate')
      .where('activity.use_id = :use_id', { use_id })
      .groupBy('DATE(activity.created_at)')
      .orderBy('DATE(activity.created_at)', 'DESC')
      .offset((page - 1) * daysPerPage)
      .limit(daysPerPage)
      .getRawMany();

    // Danh sách ngày có hoạt động
    const dates = dateResults.map((item) => item.activityDate);

    // BƯỚC 3: Lấy tất cả hoạt động thuộc 5 ngày trên
    const items = await this.userActivityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.admink', 'admin')
      .where('activity.use_id = :use_id', { use_id })
      .andWhere('DATE(activity.created_at) IN (:...dates)', { dates })
      .orderBy('activity.created_at', 'DESC')
      .addOrderBy('activity.id', 'DESC')
      .getMany();

    return {
      items,
      pagination: {
        page,
        daysPerPage,
        totalDays,
        totalPages,
        dates,
        hasNext: page < totalPages,
      },
    };
  }
}
