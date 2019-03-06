import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { HandlersService } from './handlers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private handlers: HandlersService) { }

  login(user: User) {
    return this.httpClient.post<{access_token: string}>(Urls.authenticate, user)
      .pipe(
        tap(res => {
          this.handlers.log(`authenticate user id=${user.userId}`);
          localStorage.setItem('access_token', res.access_token);
        }),
        catchError(this.handlers.handleError<User>(`authenticate id${user.userId}`))
      );
  }

  register(user: User) {
    return this.httpClient.post<{access_token: string}>(Urls.register, user)
      .pipe(
        tap(res => {
          this.handlers.log(`register user id=${user.userId}`);
          this.login(user);
        }),
        catchError(this.handlers.handleError<User>(`register id=${user.userId}`))
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token');
  }
}
