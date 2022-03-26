import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface BcryptModuleOptionsInterface {
  saltOrRounds?: string | number;
  secret?: string;
}

export interface BcryptOptionsFactory {
  createBcryptOptions():
    | Promise<BcryptModuleOptionsInterface>
    | BcryptModuleOptionsInterface;
}

export interface BcryptModuleAsyncOptionsInterface
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<BcryptOptionsFactory>;
  useClass?: Type<BcryptOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<BcryptModuleOptionsInterface> | BcryptModuleOptionsInterface;
  inject?: any[];
}
