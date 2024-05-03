import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  RpcExceptionFilter,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { getHttpStatus } from './transformer.httpCode';

@Catch(RpcException)
export class GrpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): any {
    console.log('catchhh ', { exception });
    return throwError(() => exception.getError());
  }
}

@Catch()
export class HttpExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException | any, host: ArgumentsHost): any {
    console.log({ code: exception }, 'eeeeeeeeeeeeeeeerrrrrrrrrrr');
    const { details, code, status } = exception;

    console.log({ details, code, status });

    const httpStatus = getHttpStatus(code);

    // console.log(err);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    /* response.json().then(() => ({
      message: message,
      code: code,
      timestamp: new Date().toISOString(),
      path: request.url,
    })); */

    response
      .status(httpStatus) // Set HTTP status code
      .json({
        message: details,
        code: code,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
