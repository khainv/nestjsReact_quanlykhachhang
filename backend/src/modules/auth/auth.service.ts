import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  JWT_REFRESH_TOKEN_EXPIRE,
  JWT_REFRESH_TOKEN_SECRET,
} from '../../constantsk.js';
import { AdminkService } from '../admink/admink.service.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminkService: AdminkService,
    private jwtService: JwtService,
  ) {}
  async login(
    adm_account: string,
    password: string,
  ): Promise<{
    access_token: string;
    adm_name: string;
    refresh_token: string;
  }> {
    const user = await this.adminkService.findOne({ adm_account });
    if (user?.adm_password !== password) {
      throw new UnauthorizedException(
        'auth.service.ts | password không trùng nhau',
      );
    }
    // Payload chứa thông tin định danh người dùng
    const payload = { sub: user.id, adm_account: user.adm_account };
    const access_token = await this.jwtService.signAsync(payload);
    const refesh_token = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRE,
    });
    const hashRefeshToken = await bcrypt.hash(refesh_token, 10);
    //save hashRefreshToken
    await this.adminkService.saveRefeshToken(access_token,hashRefeshToken, user.id);
    return {
      adm_name: user.adm_name,
      access_token: access_token,
      refresh_token: refesh_token,
    };
  }
}
