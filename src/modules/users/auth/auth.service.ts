import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AuthServiceInterface } from './auth-service.interface';
import { BCRYPT_SERVICE_TOKEN } from '../../bcrypt/bcrypt-service.provider';
import { BcryptServiceInterface } from '../../bcrypt/bcrypt-service.interface';
import { UserEntity } from '../user.entity';
import { ConfigKeyEnum } from '../../../common/enum/config-key.enum';
import { AuthorizeDto } from './dto/authorize.dto';

export class AuthService implements AuthServiceInterface {
  public constructor(
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    @Inject(BCRYPT_SERVICE_TOKEN)
    public readonly bcryptService: BcryptServiceInterface,
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User with the same email not found');
    }

    if (!(await this.bcryptService.compare(password, user.password))) {
      throw new Error('Invalid password');
    }

    return user;
  }

  public async signUp(email: string, password: string): Promise<AuthorizeDto> {
    const user = this.userRepository.create({
      email: email,
      password: await this.bcryptService.hash(password),
    });

    await this.userRepository.save(user);

    return {
      token: await this.generateToken(user),
      user: user,
    };
  }

  public async signIn(email: string, password: string): Promise<AuthorizeDto> {
    const user = await this.validateUser(email, password);

    return {
      token: await this.generateToken(user),
      user: user,
    };
  }

  public async changePassword(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<AuthorizeDto> {
    const user = await this.validateUser(email, password);

    user.password = await this.bcryptService.hash(newPassword);

    await this.userRepository.save(user);

    return {
      token: await this.generateToken(user),
      user: user,
    };
  }

  public async generateToken(user: UserEntity): Promise<string> {
    return this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: this.configService.get<string>(
          ConfigKeyEnum.USER_JWT_EXPIRES_IN,
        ),
      },
    );
  }
}
