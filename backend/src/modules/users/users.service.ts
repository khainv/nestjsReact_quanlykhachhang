import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, SelectQueryBuilder } from 'typeorm';

import { Users } from '../../entities/users.entity.js';
import { AddUsersDto } from '../../dto/addUsersDto.js';
import { EditUsersDto } from '../../dto/editUsersDto.js';
import { SearchUsersDto } from '../../dto/searchUsersDto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // Tìm khách hàng chưa bị xóa
  private async getUserOrFail(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy khách hàng có ID ${id}`);
    }
    return user;
  }

  // Sinh mã khách hàng
  private generateCodeK(fix?: any): string {
    const time = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${fix}-${time}-${random}`;
  }

  // Thêm khách hàng
  async create(dto: AddUsersDto, id: number | null): Promise<Users> {
    const user = this.usersRepository.create({
      use_code: this.generateCodeK('KH'),
      use_name: dto.use_name.trim(),
      use_phone: dto.use_phone?.trim() || null,
      use_email: dto.use_email?.trim() || null,
      use_sex: dto.use_sex ?? 0,
      use_birthday: dto.use_birthday ?? null,
      use_img: dto.use_img ?? null,
      use_address: dto.use_address ?? null,
      use_type: dto.use_type ?? 1,
      use_status: dto.use_status ?? 1,
      created_by: id,
      updated_by: id,
    });

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if ((error as { code?: string }).code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Mã khách hàng đã tồn tại, vui lòng thử lại',
        );
      }

      throw error;
    }
  }
  // Xây dựng câu truy vấn danh sách
  private buildQuery(query: SearchUsersDto): SelectQueryBuilder<Users> {
    const qb = this.usersRepository
      .createQueryBuilder('tblusers')
      .where('tblusers.use_delete = 0');

    if (query.keyword?.trim()) {
      const keyword = `%${query.keyword.trim()}%`;
      qb.andWhere(
        `(
          tblusers.use_code LIKE :keyword
          OR tblusers.use_name LIKE :keyword
          OR tblusers.use_phone LIKE :keyword
        )`,
        { keyword },
      );
    }
    if (query.use_status !== undefined) {
      qb.andWhere('tblusers.use_status = :use_status', {
        use_status: query.use_status,
      });
    }

    if (query.use_type !== undefined) {
      qb.andWhere('tblusers.use_type = :customerType', {
        customerType: query.use_type,
      });
    }
    return qb;
  }

  // Danh sách khách hàng + phân trang
  async findAll(query: SearchUsersDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const qb = this.buildQuery(query)
      .orderBy(
        `tblusers.${query.sort_by ?? 'created_at'}`,
        query.sort_order ?? 'DESC',
      )
      .addOrderBy('tblusers.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();
    // Xem câu lệnh SQL
    //const [sql, parameters] = qb.getQueryAndParameters();

    //console.log('SQL:', sql);
    //console.log('Parameters:', parameters);
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Chi tiết khách hàng
  async findOne(id: number): Promise<Users> {
    return this.getUserOrFail(id);
  }

  // Cập nhật khách hàng
  async update(id: number, data: EditUsersDto): Promise<Users> {
    const user = await this.getUserOrFail(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // 2. Merge (gộp) dữ liệu mới đè lên dữ liệu cũ

    try {
      await this.usersRepository.merge(user, data);
      const rs = await this.usersRepository.save(user);
      return rs;
    } catch (error) {
      throw new ConflictException(`cập nhật thất bại database`);
    }
  }

  // Xóa mềm khách hàng
  async remove(id: number, adm_id: number | null): Promise<any> {
    const user = await this.getUserOrFail(id);
    user.use_delete = 1;
    user.updated_by = adm_id;
    const rs = await this.usersRepository.update(id, user);
    return rs;
  }
}
