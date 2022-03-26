import { Injectable } from '@nestjs/common';
import { AppServiceInterface } from './app-service.interface';

@Injectable()
export class AppService implements AppServiceInterface {
  public async ping(): Promise<string> {
    return 'pong!';
  }
}
