import { CanActivate, ExecutionContext, RequestMethod } from '@nestjs/common';
import { Request } from '../../../../common/type/request.type';
import { UserPermissionEnum } from '../enum/user-permission.enum';
import { UserFlagsHelper } from '../../../../common/utils/user-flags.helper';

export class UserGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params, method } = context
      .switchToHttp()
      .getRequest<Request>();

    if (!user) {
      return false;
    }

    return (
      RequestMethod[method] === RequestMethod.GET ||
      user.id === params.id ||
      UserFlagsHelper.has(user.permissionFlags, UserPermissionEnum.ADMIN)
    );
  }
}
