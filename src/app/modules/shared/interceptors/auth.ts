import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.loggedIn) {
      const authHeader = JSON.parse(localStorage.getItem('user')).token || {};

      const authReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authHeader)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
