import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  @ApiProperty()
  public readonly id: string;

  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNumber()
  @ApiProperty({
    minimum: 0,
    maximum: 1,
  })
  public permissionFlags: number;
}
