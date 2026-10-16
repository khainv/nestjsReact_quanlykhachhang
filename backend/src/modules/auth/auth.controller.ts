import {
  Controller,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AdminkService } from '../admink/admink.service.js';
import { isPublic } from './filter/is.public.router.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminkService: AdminkService,
  ) {}
  @isPublic() //bo qua jwt-auth.guard.ts cai global
  @UseGuards(LocalAuthGuard) //Kích hoạt LocalAuthGuard
  @Post('login')
  async login(@Request() req: any) {
    if (!req.user.adm_password) {
      throw new NotFoundException(
        `auth.controller | Không tìm thấy tài khoản ${req.adm_account}`,
      );
    }
    return this.authService.login(req.user.adm_account, req.user.adm_password); //gọi autheService để save to access-token
  }
}
