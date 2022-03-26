import { UserEntity } from '../../../user.entity';

export class JwtUserPayload {
  public id: string;

  public static fromUserEntity(user: UserEntity): JwtUserPayload {
    const payload = new JwtUserPayload();

    payload.id = user.id;

    return payload;
  }
}
