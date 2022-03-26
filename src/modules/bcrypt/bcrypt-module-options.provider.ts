import { Provider } from '@nestjs/common';
import {
  BcryptModuleAsyncOptionsInterface,
  BcryptModuleOptionsInterface,
} from './bcrypt-module-options.interface';

export const BCRYPT_MODULE_OPTIONS_TOKEN = 'BCRYPT_MODULE_OPTIONS';

export function bcryptModuleOptionsProvider(
  options: BcryptModuleOptionsInterface,
) {
  return {
    provide: BCRYPT_MODULE_OPTIONS_TOKEN,
    useValue: options,
  } as Provider;
}

export function bcryptModuleAsyncOptionsProvider(
  options: BcryptModuleAsyncOptionsInterface,
) {
  return {
    provide: BCRYPT_MODULE_OPTIONS_TOKEN,
    useExisting: options.useExisting,
    useClass: options.useClass,
    useFactory: options.useFactory,
    inject: options.inject,
  } as Provider;
}
