import {
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
    userId?: number;
    adm_id?: number;
    sub?: number;
  };
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private getUserId(req: AuthenticatedRequest): number | null {
    const id = req.user?.adm_id ?? req.user?.userId ?? req.user?.sub;

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
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // PATCH /customers/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUsersDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.usersService.update(id, dto, this.getUserId(req));
  }

  // DELETE /customers/:id
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.usersService.remove(id, this.getUserId(req));
  }
}
