import { DynamicModule, Module } from '@nestjs/common';
import {
  BcryptModuleAsyncOptionsInterface,
  BcryptModuleOptionsInterface,
} from './bcrypt-module-options.interface';
import {
  bcryptModuleAsyncOptionsProvider,
  bcryptModuleOptionsProvider,
} from './bcrypt-module-options.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptUserConfigService } from './bcrypt-user-config.service';
import { bcryptServiceProvider } from './bcrypt-service.provider';

@Module({})
export class BcryptModule {
  public static forRoot(options: BcryptModuleOptionsInterface): DynamicModule {
    return {
      module: BcryptModule,
      providers: [bcryptModuleOptionsProvider(options), bcryptServiceProvider],
      exports: [bcryptServiceProvider],
    };
  }

  public static forRootAsync(
    options: BcryptModuleAsyncOptionsInterface,
  ): DynamicModule {
    return {
      module: BcryptModule,
      imports: options.imports,
      providers: [
        bcryptModuleAsyncOptionsProvider(options),
        bcryptServiceProvider,
      ],
      exports: [bcryptServiceProvider],
    };
  }

  public static forUser(): DynamicModule {
    return BcryptModule.forRootAsync({
      imports: [ConfigModule],
      useClass: BcryptUserConfigService,
      inject: [ConfigService],
    });
  }
}
