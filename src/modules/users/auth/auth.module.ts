import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users.module';
import { BcryptModule } from '../../bcrypt/bcrypt.module';
import { JwtModule } from '../../jwt/jwt.module';
import { AuthController } from './auth.controller';
import { authServiceProvider } from './auth-service.provider';
import { LocalStrategy } from './common/strategy/local.strategy';
import { JwtStrategy } from './common/strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    BcryptModule.forUser(),
    JwtModule.forUser(),
  ],
  providers: [authServiceProvider, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [authServiceProvider],
})
export class AuthModule {}
