import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AdminkService } from './admink.service.js';
import * as bcrypt from 'bcrypt';
import { isPublic } from '../auth/filter/is.public.router.js';
import { Code } from 'typeorm/driver/mongodb/bson.typings.js';

@Controller('admink')
export class AdminkController {
  constructor(private adminService: AdminkService) {}
  @isPublic()
  @Post('logout')
  async Logout(@Req() req: Request) {
    const authHeader = (req as any).headers.authorization;
    console.log('check req 2');
    console.log((req as any).headers);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { code: -1, message: 'Không tìm thấy token hợp lệ' };
    }
    const tokenString = authHeader.split(' ')[1]?.trim();
    const adminToken = await this.adminService.findOneAdminToken({
      access_token: tokenString,
    });
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
  @Post('change-password')
  async changePassword(@Req() req: any, @Body() body: any) {
    const adminReq = req.user;
    const admId = adminReq.userId;
    const adm_account = adminReq.adm_account;
    const admPassword = body.adm_password;
    const admPasswordNew = body.adm_password_new;
    const admPasswordNew2 = body.adm_password_new2;
    const payload = { code: 0, message: 'Đổi mật khẩu thành công' };
    if (admPasswordNew !== admPasswordNew2) {
      const payload = { code: -1, message: 'Mật khẩu mới không trùng nhau' };
      return payload;
    }
    const admData = await this.adminService.validateAdmin(
      adm_account,
      admPassword,
    );
    if (!admData) {
      const payload = { code: -2, message: 'Mật khẩu hiện tại không đúng' };
      return payload;
    } else {
      const samePassword = await bcrypt.compare(
        admPasswordNew,
        admData.adm_password,
      );
      if (samePassword) {
        const payload = {
          code: -3,
          message: 'Mật khẩu mới không được trùng mới mật khẩu hiện tại',
        };
        return payload;
      }
    }
    const hashedPassword = await bcrypt.hash(admPasswordNew, 10);
    const statusChange = await this.adminService.changePassWord(
      admId,
      hashedPassword,
    );
    if (!statusChange || statusChange < 1) {
      const payload = {
        code: -4,
        message: 'Đổi mật khẩu không thành công',
      };
      return payload;
    }
    return payload;
    //return this.adminService.changePassword(adminId, dto);
  }
}
