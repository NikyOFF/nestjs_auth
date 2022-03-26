import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  public email: string;

  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    minimum: 5,
    maximum: 30,
  })
  public password: string;

  @MinLength(5)
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty({
    minimum: 5,
    maximum: 30,
  })
  public newPassword: string;
}
