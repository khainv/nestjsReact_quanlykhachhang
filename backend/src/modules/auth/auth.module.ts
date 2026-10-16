import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AdminkService } from '../admink/admink.service.js';
import { AdminkModule } from '../admink/admink.module.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, JWT_SECRET } from '../../constantsk.js';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  imports: [
    AdminkModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      //global: true, // Tùy chọn: giúp không cần import JwtModule ở các module khác
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE }, // Thời gian hết hạn của token
    }),
  ],
  exports: [AuthService, JwtAuthGuard, PassportModule],
})
export class AuthModule {}
