import { AuthorizeDto } from './dto/authorize.dto';
import { UserEntity } from '../user.entity';

export interface AuthServiceInterface {
  validateUser(email: string, password: string): Promise<UserEntity>;
  signUp(email: string, password: string): Promise<AuthorizeDto>;
  signIn(email: string, password: string): Promise<AuthorizeDto>;
  changePassword(
    email: string,
    password: string,
    newPassword: string,
  ): Promise<AuthorizeDto>;
  generateToken(user: UserEntity): Promise<string>;
}
