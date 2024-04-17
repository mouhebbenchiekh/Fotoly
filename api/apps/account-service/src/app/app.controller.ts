import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAccountRequest,
  GetAccountResponse,
} from 'gen/libs/shared/protos/account';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AccountService', 'GetAccount')
  findOne(data: GetAccountRequest): GetAccountResponse {
    const items = [
      { accountId: 1, username: 'John', email: 'Jhon@gmail.com' },
      { accountId: 2, username: 'Doe', email: 'Doe@gmail.com' },
    ];
    const { username, email } = items.find(
      ({ accountId }) => accountId === data.accountId
    );
    return { username, email };
  }
}
