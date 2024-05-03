import { Controller, Get, UseFilters } from '@nestjs/common';

import { AppService } from './app.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
} from 'dist/libs/shared/protos/account';
import { GrpcExceptionFilter } from 'dist/libs/shared/src';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AccountService', 'GetAccount')
  @UseFilters(GrpcExceptionFilter)
  async findOne(data: GetAccountRequest): Promise<GetAccountResponse> {
    const user = await this.appService.findById(data);

    const { username, email } = user;
    return { username, email };
  }

  @GrpcMethod('AccountService', 'CreateAccount')
  @UseFilters(new GrpcExceptionFilter())
  async register(
    data: CreateAccountRequest
  ): Promise<CreateAccountResponse | RpcException> {
    const user = await this.appService.register(data);
    const { username, email } = user;
    return { username, email };
  }
}
