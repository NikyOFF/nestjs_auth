import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthServiceInterface } from '../../auth-service.interface';
import { AUTH_SERVICE_TOKEN } from '../../auth-service.provider';
import { UserEntity } from '../../../user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(AUTH_SERVICE_TOKEN)
    protected readonly authService: AuthServiceInterface,
  ) {
    super();
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    try {
      return this.authService.validateUser(email, password);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
