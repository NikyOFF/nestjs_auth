import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ConfigKeyEnum } from '../../common/enum/config-key.enum';

@Injectable()
export class JwtUserConfigService implements JwtOptionsFactory {
  public constructor(protected readonly configService: ConfigService) {}

  public async createJwtOptions(): Promise<JwtModuleOptions> {
    return {
      secret: this.configService.get<string>(ConfigKeyEnum.USER_JWT_SECRET),
    };
  }
}
