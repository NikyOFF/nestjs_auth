import { Provider } from '@nestjs/common';
import { AuthServiceInterface } from './auth-service.interface';
import { AuthService } from './auth.service';

export const AUTH_SERVICE_TOKEN = 'AUTH_SERVICE';

export const authServiceProvider: Provider<AuthServiceInterface> = {
  provide: AUTH_SERVICE_TOKEN,
  useClass: AuthService,
};
