import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { APP_SERVICE_PROVIDER } from './app-service.provider';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../users/auth/auth.module';
import { ConfigKeyEnum } from '../../common/enum/config-key.enum';
import { EnvironmentEnum } from '../../common/enum/environment.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${
        process.env.NODE_ENV || EnvironmentEnum.DEVELOPMENT
      }`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>(ConfigKeyEnum.ORM_TYPE),
        host: configService.get<string>(ConfigKeyEnum.ORM_HOST),
        port: configService.get<number>(ConfigKeyEnum.ORM_PORT),
        username: configService.get<string>(ConfigKeyEnum.ORM_USERNAME),
        password: configService.get<string>(ConfigKeyEnum.ORM_PASSWORD),
        database: configService.get<string>(ConfigKeyEnum.ORM_DATABASE),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV != EnvironmentEnum.PRODUCTION,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [APP_SERVICE_PROVIDER],
})
export class AppModule {}
