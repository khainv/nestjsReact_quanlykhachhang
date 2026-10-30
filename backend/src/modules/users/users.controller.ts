import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { UsersService } from './users.service.js';
import { AddUsersDto } from '../../dto/addUsersDto.js';
import { EditUsersDto } from '../../dto/editUsersDto.js';
import { SearchUsersDto } from '../../dto/searchUsersDto.js';

interface AuthenticatedRequest extends Request {
  user: {
    admId?: number;
    sub?: number;
  };
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private getUserId(req: AuthenticatedRequest): number | null {
    const id = req.user?.admId ?? req.user?.sub;

    if (id === undefined || id === null) {
      return null;
    }

    const userId = Number(id);

    return Number.isSafeInteger(userId) && userId > 0 ? userId : null;
  }

  // POST /customers
  @Post('add')
  create(@Body() dto: AddUsersDto, @Req() req: AuthenticatedRequest) {
    console.log('users.controller.add');
    return this.usersService.create(dto, this.getUserId(req));
  }

  // GET /customers
  @Get('index')
  findAll(@Query() query: SearchUsersDto) {
    return this.usersService.findAll(query);
  }

  // GET /customers/:id
  @Get('detail/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rs = await this.usersService.findOne(id);
    return rs;
  }

  // PATCH /customers/:id
  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUsersDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = await this.usersService.findOne(id);
    if (req.user.admId) {
      user.updated_by = req.user.admId;
    } else {
      return { code: -1, message: `Bạn không có quyền edit ${user.use_name}` };
    }
    if (dto.use_name !== undefined && !dto.use_name.trim()) {
      return { code: -2, message: 'Họ tên khách hàng không được để trống' };
    }
    if (dto.use_name !== undefined) {
      user.use_name = dto.use_name.trim();
    }
    if (dto.use_phone !== undefined) {
      user.use_phone = dto.use_phone?.trim() || null;
    }

    if (dto.use_email !== undefined) {
      user.use_email = dto.use_email?.trim() || null;
    }

    if (dto.use_sex !== undefined) user.use_sex = dto.use_sex;
    if (dto.use_birthday !== undefined) user.use_birthday = dto.use_birthday;
    if (dto.use_img !== undefined) user.use_img = dto.use_img;
    if (dto.use_address !== undefined) user.use_address = dto.use_address;

    if (dto.use_type !== undefined) {
      user.use_type = dto.use_type;
    }

    if (dto.use_status !== undefined) user.use_status = dto.use_status;

    const rs = await this.usersService.update(id, user);
    return { code: 1, massege: 'cập nhật thành công' };
  }

  // DELETE /customers/:id
  @Delete('del/:id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    if (req.user.admId) {
      const rs = await this.usersService.remove(id, req.user.admId);
      if (rs.affected > 0) {
        return { code: 1, message: 'bạn đã xóa thành công' };
      } else {
        return { code: 0, massage: 'xóa không thành công' };
      }
    } else {
      return { code: -1, massage: 'xóa không thành công' };
    }
  }
}
