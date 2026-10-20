import { Body, Controller, Post, Res } from '@nestjs/common';
import { AdminkService } from './admink.service.js';
import { AdminToken } from '../../entities/admin.token.entity.js';

@Controller('admink')
export class AdminkController {
  constructor(private adminService: AdminkService) {}
  @Post('logout')
  async Logout(@Res() res: Response) {
    console.log(res);
    const adminToken = await this.adminService.findOneAdminToken({});
    if (adminToken) {
      const rs = await this.adminService.delAdminToken(adminToken.id);
      if (rs > 0) {
        const payload = { code: 1, message: 'logout thành công' };
        return payload;
      } else {
        const payload = { code: 0, message: 'logout lỗi' };
        return payload;
      }
    } else {
      const payload = { code: -1, message: 'logout lỗi' };
      return payload;
    }
  }
}
