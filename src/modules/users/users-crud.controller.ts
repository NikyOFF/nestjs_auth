import { Controller, UseGuards } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerApiTagsEnum } from '../../common/enum/swagger-api-tags.enum';
import { AuthStrategyTypeEnum } from './auth/common/enum/auth-strategy-type.enum';
import { UserEntity } from './user.entity';
import { UsersCrudService } from './users-crud.service';
import { UserGuard } from './common/guard/user.guard';
import { UserDto } from './dto/user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Crud({
  model: {
    type: UserDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'replaceOneBase'],
  },
})
@ApiTags(SwaggerApiTagsEnum.USERS)
@UseGuards(AuthGuard(AuthStrategyTypeEnum.JWT), UserGuard)
@Controller('users')
export class UsersCrudController implements CrudController<UserEntity> {
  public constructor(public service: UsersCrudService) {}

  public get base(): CrudController<UserEntity> {
    return this;
  }
}
