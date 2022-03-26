import { FlagsHelper } from './flags.helper';
import { UserPermissionEnum } from '../../modules/users/common/enum/user-permission.enum';
import { isUserPermissionFlags } from '../../modules/users/is-user-permission-flags.validator';

export class UserFlagsHelper extends FlagsHelper {
  public static has(
    initialFlags: number | UserPermissionEnum,
    flags: number | UserPermissionEnum,
  ): boolean {
    return super.has(initialFlags, flags);
  }

  public static enable(
    initialFlags: number | UserPermissionEnum,
    flags: number | UserPermissionEnum,
  ): number {
    if (!isUserPermissionFlags(flags)) {
      throw new Error('Invalid user permission flags');
    }

    return super.enable(initialFlags, flags);
  }

  public static disable(
    initialFlags: number | UserPermissionEnum,
    flags: number | UserPermissionEnum,
  ): number {
    if (!isUserPermissionFlags(flags)) {
      throw new Error('Invalid user permission flags');
    }

    return super.disable(initialFlags, flags);
  }
}
