import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'dist/libs/shared/src';

import { AppService } from './app.service';
import { CreateAccountRequest } from 'dist/libs/shared/protos/account';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/register')
  async register(@Body() registerData: CreateAccountRequest) {
    return await this.appService.register(registerData);
  }
}
