import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../../user.entity';
import { ConfigKeyEnum } from '../../../../../common/enum/config-key.enum';
import { JwtUserPayload } from '../payload/jwt-user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ConfigKeyEnum.USER_JWT_SECRET),
    });
  }

  public async validate(payload: JwtUserPayload): Promise<UserEntity> {
    try {
      return this.userRepository.findOne(payload.id);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
