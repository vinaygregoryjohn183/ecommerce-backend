import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Empty @Catch() catches ALL exceptions. @Catch(HttpException) limits it.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Determine the status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Extract the message. DTO validation errors often come as arrays of strings.
    let message = exception instanceof HttpException 
      ? exception.getResponse() 
      : 'Internal server error';

    // If the message is an object (like the default Nest validation error), extract the actual message string/array
    if (typeof message === 'object' && message !== null && 'message' in message) {
      message = (message as any).message;
    }

    // Standardize our response payload!
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: message,
    });
  }
}
