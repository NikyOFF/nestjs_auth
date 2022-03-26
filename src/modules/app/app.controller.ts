import { Controller, Get, Inject } from '@nestjs/common';
import { APP_SERVICE_TOKEN } from './app-service.provider';
import { AppServiceInterface } from './app-service.interface';

@Controller()
export class AppController {
  public constructor(
    @Inject(APP_SERVICE_TOKEN)
    private readonly appService: AppServiceInterface,
  ) {}

  @Get()
  public async ping(): Promise<string> {
    return this.appService.ping();
  }
}
