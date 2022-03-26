import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UserDto } from '../../dto/user-dto';

export class AuthorizeDto {
  @IsUUID()
  @ApiProperty()
  public token: string;

  @ApiProperty()
  public user: UserDto;
}
