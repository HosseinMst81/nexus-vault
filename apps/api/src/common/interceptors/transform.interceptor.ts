import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((res) => {
        // If the response already contains pagination/meta
        if (res && typeof res === 'object' && 'items' in res && 'meta' in res) {
          return {
            success: true,
            statusCode,
            data: res.items,
            meta: res.meta,
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          statusCode,
          data: res,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
