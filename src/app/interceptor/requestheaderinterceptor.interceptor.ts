import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestheaderinterceptorInterceptor implements HttpInterceptor {

  constructor() { }
  //gives a type automatically to every http request
  //clones a request and adds a type to app/json without  making any changes to the original request
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authRequest = request.clone({ setHeaders: { 'content-type': 'application/json' } });
    return next.handle(authRequest);
  }


}
