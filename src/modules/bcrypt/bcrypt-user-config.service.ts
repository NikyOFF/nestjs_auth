import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BcryptModuleOptionsInterface,
  BcryptOptionsFactory,
} from './bcrypt-module-options.interface';
import { ConfigKeyEnum } from '../../common/enum/config-key.enum';

@Injectable()
export class BcryptUserConfigService implements BcryptOptionsFactory {
  public constructor(private readonly configService: ConfigService) {}

  public async createBcryptOptions(): Promise<BcryptModuleOptionsInterface> {
    return {
      secret: this.configService.get<string>(ConfigKeyEnum.USER_HASH_SECRET),
    };
  }
}
