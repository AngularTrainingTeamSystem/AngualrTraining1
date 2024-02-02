import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// interceptor needed;  modify requests globally
@Injectable()
export class RequestHeaderInterceptor implements HttpInterceptor { // service that intercepts http requests and responses

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler){
    const authRequest = request.clone({setHeaders: {'content-type': 'application/json'}});
    return next.handle(authRequest);
  }
}
