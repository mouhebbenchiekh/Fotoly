import { HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';

export function getHttpStatus(rpcStatus: number): HttpStatus {
  switch (rpcStatus) {
    case status['INVALID_ARGUMENT']: // Invalid argument supplied
      return HttpStatus.BAD_REQUEST;
    case status['NOT_FOUND']: // Resource not found
      return HttpStatus.NOT_FOUND;
    case status['PERMISSION_DENIED']: // Permission denied
      return HttpStatus.FORBIDDEN;
    case status['UNAUTHENTICATED']: // Unauthorized
      return HttpStatus.UNAUTHORIZED;
    case status['ALREADY_EXISTS']: // Resource already exists
      return HttpStatus.CONFLICT;
    case status['FAILED_PRECONDITION']: // Operation failed to meet preconditions
      return HttpStatus.PRECONDITION_FAILED;
    case status['OUT_OF_RANGE']: // Operation out of range
      return HttpStatus.BAD_REQUEST;
    case status['UNIMPLEMENTED']: // Operation not implemented
      return HttpStatus.NOT_IMPLEMENTED;
    case status['INTERNAL']: // Internal server error
      return HttpStatus.INTERNAL_SERVER_ERROR;
    case status['UNAVAILABLE']: // Service unavailable
      return HttpStatus.SERVICE_UNAVAILABLE;
    default:
      return HttpStatus.INTERNAL_SERVER_ERROR; // Default to Internal Server Error
  }
}
