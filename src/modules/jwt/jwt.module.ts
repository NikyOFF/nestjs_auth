import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule as JwtModuleInterface } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtUserConfigService } from './jwt-user-config.service';

@Module({
  imports: [],
})
export class JwtModule {
  public static forUser(): DynamicModule {
    return JwtModuleInterface.registerAsync({
      imports: [ConfigModule],
      useClass: JwtUserConfigService,
      inject: [ConfigService],
    });
  }
}
