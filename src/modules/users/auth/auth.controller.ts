import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject, Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_SERVICE_TOKEN } from './auth-service.provider';
import { AuthServiceInterface } from './auth-service.interface';
import { AuthorizeDto } from './dto/authorize.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SwaggerApiTagsEnum } from '../../../common/enum/swagger-api-tags.enum';
import { ChangePasswordDto } from './dto/change.password.dto';

@ApiTags(SwaggerApiTagsEnum.AUTH)
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  public constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    protected readonly authService: AuthServiceInterface,
  ) {}

  @Post('signup')
  @ApiOkResponse({
    type: AuthorizeDto,
  })
  public async signUp(@Body() body: SignUpDto): Promise<AuthorizeDto> {
    return this.authService.signUp(body.email, body.password);
  }

  @Post('signin')
  @ApiOkResponse({
    type: AuthorizeDto,
  })
  public async signIn(@Body() body: SignInDto): Promise<AuthorizeDto> {
    return this.authService.signIn(body.email, body.password);
  }

  @Patch('password')
  @ApiOkResponse({
    type: AuthorizeDto,
  })
  public async changePassword(
    @Body() body: ChangePasswordDto,
  ): Promise<AuthorizeDto> {
    return this.authService.changePassword(
      body.email,
      body.password,
      body.newPassword,
    );
  }
}
