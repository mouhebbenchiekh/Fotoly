import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetAccountRequest,
  GetAccountResponse,
} from 'dist/libs/shared/protos/account';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AccountService', 'GetAccount')
  findOne(data: GetAccountRequest): GetAccountResponse {
    const items = [
      { accountId: 1, username: 'John', email: 'Jhon@gmail.com' },
      { accountId: 2, username: 'Doe', email: 'Doe@gmail.com' },
    ];
    console.log({ data });
    const Item = items.filter((ele) => ele.accountId == data.accountId);
    /* .find(({ accountId }) => accountId === data.accountId); */
    console.log({ Item });

    if (Item) {
      const { username, email } = Item[0];
      return { username, email };
    } else {
      return { username: 'not', email: 'not' };
    }
  }
}
