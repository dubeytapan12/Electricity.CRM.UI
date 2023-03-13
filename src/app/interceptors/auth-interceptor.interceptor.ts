import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { SecurityService } from '../security/security.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private securityService:SecurityService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private refreshAccessToken(): Observable<any> {
    return this.securityService.RefreshToken().pipe(
      tap((result:any) => {
        //Now check if Authenticated is true store token in sessionStorage
        if (result.access_Token && result.refresh_Token) {
          sessionStorage.setItem(
            "ElectricityBearerToken",
            result.access_Token
          );
          sessionStorage.setItem(
            "ElectricityRefreshToken",
            result.refresh_Token
          );
        }
      })
    );;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
       let token: string | null = sessionStorage.getItem("ElectricityBearerToken");
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
//      request = this.AddTokenHeader(request);
//      return next.handle(request).pipe(
//      catchError(errordata=> {
//       if(errordata.status===401) {
//         return this.handleRefreshToke(request,next);
//       }
//       return throwError(errordata);
//      })
//      );
//   }
//  handleRefreshToke(request: HttpRequest<any>, next: HttpHandler) {
//   return this.securityService.RefreshToken().pipe(
//     switchMap((data:any)=> {
//       if (data.access_Token && data.refresh_Token) {
//         sessionStorage.setItem(
//           "ElectricityBearerToken",
//           data.access_Token
//         );
//         sessionStorage.setItem(
//           "ElectricityRefreshToken",
//           data.refresh_Token
//         );
//       }
//       return next.handle(this.AddTokenHeader(request))
//     }),
//     catchError(errordata=> {
//       return throwError(errordata);
//     })
//   )
//  }
//   AddTokenHeader(request: HttpRequest<any>) {
//     let token: string | null = sessionStorage.getItem("ElectricityBearerToken");
//     return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
//   }
//   intercept(request: HttpRequest<any>, next: HttpHandler) {

//     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
//     let token: string | null = sessionStorage.getItem("ElectricityBearerToken");
//     if (token) {
//         request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
//     }
//     return next.handle(request).pipe( tap(() => {},
//     (error: HttpErrorResponse) => {
//     if (error instanceof HttpErrorResponse) { 
//         if (error instanceof HttpErrorResponse && error.status === 401) { 
//           this.securityService.RefreshToken().subscribe({next: (item:any)=> {
//             if (item.access_Token && item.refresh_Token) {
//               sessionStorage.setItem(
//                 "ElectricityBearerToken",
//                 item.access_Token
//               );
//               sessionStorage.setItem(
//                 "ElectricityRefreshToken",
//                 item.refresh_Token
//               );
//               request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' +  item.access_Token) });
//               return next.handle(request);
//             }
//             else {
//             return;
//             }
//           },
//         error: ()=> { 
//           return;
//         }});
//         }
//        return;
//     }
//   }));
// }

}
