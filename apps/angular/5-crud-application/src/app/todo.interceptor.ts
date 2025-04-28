import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, of } from 'rxjs';
import { TodoService } from './service/todo.service';

@Injectable({ providedIn: 'root' })
export class Interceptor implements HttpInterceptor {
  constructor(private loaderService: TodoService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('interceptor');
    const itemId = parseInt(req.url.split('/').pop() || '', 10);
    this.loaderService.showLoader(itemId);
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hideLoader(itemId)),
      catchError((error) => {
        console.log(error);
        this.loaderService.hideLoader(itemId);
        return of();
      }),
    );
  }
}
