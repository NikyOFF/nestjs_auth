import { Request as ExpressRequest } from 'express';
import { UserEntity } from '../../modules/users/user.entity';

export type Request = ExpressRequest & {
  user?: UserEntity;
};
