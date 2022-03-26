import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersCrudService } from './users-crud.service';
import { UsersCrudController } from './users-crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersCrudService],
  controllers: [UsersCrudController],
  exports: [UsersCrudService, TypeOrmModule],
})
export class UsersModule {}
