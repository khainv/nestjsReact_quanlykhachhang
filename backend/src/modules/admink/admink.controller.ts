import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AdminkService } from './admink.service.js';
import { isPublic } from '../auth/filter/is.public.router.js';

@Controller('admink')
export class AdminkController {
  constructor(private adminService: AdminkService) {}
  @isPublic()
  @Post('logout')
  async Logout(@Req() req: Request) {
    const authHeader = (req as any).headers.authorization;
    console.log('check req 2')
    console.log((req as any).headers)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { code: -1, message: 'Không tìm thấy token hợp lệ' };
    }
    const tokenString = authHeader.split(' ')[1]?.trim();
    const adminToken = await this.adminService.findOneAdminToken({access_token:tokenString});
    if (adminToken?.id) {
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
