import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, EMPTY, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let customReq = req.clone();

    if (this.authService.loggedIn?.token) {
      customReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.loggedIn.token}`,
        },
      });
    }

    return next.handle(customReq).pipe(
      catchError((error) => {
        return EMPTY;
      })
    );
  }
}
