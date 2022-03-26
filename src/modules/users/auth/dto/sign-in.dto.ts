import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
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
}
