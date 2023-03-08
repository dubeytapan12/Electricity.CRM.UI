import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem("ElectricityBearerToken")) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${sessionStorage.getItem("ElectricityBearerToken")}`,
        },
      });
    }
    return next.handle(request);
  }
}