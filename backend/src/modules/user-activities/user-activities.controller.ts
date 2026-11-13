import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { AddUsersActivitiesDto } from '../../dto/addUsersActivities.Dto.js';
import { UserActivitiesService } from './user-activities.service.js';
interface AuthenticatedRequest extends Request {
  user: {
    admId?: number;
    sub?: number;
  };
}
@Controller('user-activities')
export class UserActivitiesController {
  constructor(private readonly userActivitiesService: UserActivitiesService) {}
  private getAdmId(req: AuthenticatedRequest): number | null {
    const id = req.user?.admId ?? req.user?.sub;
    if (id === undefined || id === null) {
      return null;
    }
    const userId = Number(id);
    return Number.isSafeInteger(userId) && userId > 0 ? userId : null;
  }
  // POST /customers
  @Post('add')
  async create(
    @Body() dto: AddUsersActivitiesDto,
    @Req() req: AuthenticatedRequest,
  ) {
    if (req.user.admId) {
      dto.adm_id = req.user.admId;
    } else {
      return {
        code: -1,
        message: `Bạn không có quyền thêm hoạt động cho khách hàng`,
      };
    }
    if (dto.use_id) {
    } else {
      return {
        code: -2,
        message: `ID khách hàng không được để trống`,
      };
    }
    if (dto.act_name) {
    } else {
      return {
        code: -3,
        message: `Tên hoạt động không được để trống`,
      };
    }
    if (dto.act_des) {
    } else {
      return {
        code: -4,
        message: `Nội dung của hoạt động không được để trống`,
      };
    }
    const admId = this.getAdmId(req);
    if (admId === null) {
      return {
        code: -5,
        message: `Bạn không có quyền thêm hoạt động`,
      };
    }
    const rs = await this.userActivitiesService.create(dto, admId);
    if (rs) {
      return { code: 1, message: 'thêm dữ liệu thành công!', datak: rs };
    }
  }
  @Get('get-activities/:id')
  async getActivities(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const list = await this.userActivitiesService.getActivitiesByUseId(id);
    console.log(list);
    return list;
  }
}
