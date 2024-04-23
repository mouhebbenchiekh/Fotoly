/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "account";

export interface CreateAccountRequest {
  username: string;
  email: string;
  /** Add more fields as needed */
  password: string;
}

export interface CreateAccountResponse {
  username: string;
  email: string;
}

export interface GetAccountRequest {
  accountId: number;
}

export interface GetAccountResponse {
  username: string;
  /** Add more fields as needed */
  email: string;
}

export const ACCOUNT_PACKAGE_NAME = "account";

export interface AccountServiceClient {
  createAccount(request: CreateAccountRequest): Observable<CreateAccountResponse>;

  /** Add more methods as needed */

  getAccount(request: GetAccountRequest): Observable<GetAccountResponse>;
}

export interface AccountServiceController {
  createAccount(
    request: CreateAccountRequest,
  ): Promise<CreateAccountResponse> | Observable<CreateAccountResponse> | CreateAccountResponse;

  /** Add more methods as needed */

  getAccount(
    request: GetAccountRequest,
  ): Promise<GetAccountResponse> | Observable<GetAccountResponse> | GetAccountResponse;
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createAccount", "getAccount"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AccountService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ACCOUNT_SERVICE_NAME = "AccountService";
