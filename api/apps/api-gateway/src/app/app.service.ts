import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import {
  AccountServiceClient,
  CreateAccountRequest,
  CreateAccountResponse,
} from 'dist/libs/shared/protos/account';
import { Observable, lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private acountService: AccountServiceClient;
  constructor(@Inject('account_package') private client: ClientGrpc) {}
  onModuleInit() {
    this.acountService =
      this.client.getService<AccountServiceClient>('AccountService');
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  async register(data: CreateAccountRequest): Promise<CreateAccountResponse> {
    const response$ = this.acountService.createAccount(data);
    return await lastValueFrom(response$);
  }
}
