import { Provider } from '@nestjs/common';
import { AppService } from './app.service';
import { AppServiceInterface } from './app-service.interface';

export const APP_SERVICE_TOKEN = 'APP_SERVICE';

export const APP_SERVICE_PROVIDER: Provider<AppServiceInterface> = {
  provide: APP_SERVICE_TOKEN,
  useClass: AppService,
};
