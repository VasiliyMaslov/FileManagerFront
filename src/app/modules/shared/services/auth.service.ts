import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { HandlersService } from './handlers.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../../../models/accessToken';
import { MessageService } from './message.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private httpClient: HttpClient,
              private handlers: HandlersService,
              private router: Router,
              private userService: UserService,
              private helper: JwtHelperService,
              private message: MessageService) {}

  login(user: User) {
    return this.httpClient.post<User>(Urls.authenticate, user)
      .pipe(
        tap(
          (res: any) => {
            this.handlers.log(`authenticate user id=${user.userId}`);
            this.user = res;
            localStorage.setItem('access_token', res.token);
        }),
        catchError(err => {
          this.handlers.handleError<User>(`authenticate id ${user.userId}`);
          this.message.warn(err.error.message);
          return throwError(err);
        }),
      );
  }

  register(user: User) {
    return this.httpClient.post<User>(Urls.register, user)
      .pipe(
        tap((res: any) => {
          this.handlers.log(`register user id=${user.userId}`);
          this.login(res);
        }),
        catchError(err => {
          this.handlers.handleError<User>(`register id=${user.userId}`);
          this.message.warn(err.error.message);
          return throwError(err);
        })
      );
  }

  logout() {
    this.user = new User();
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth']);
  }

  public get accessToken(): AccessToken {
    return this.helper.decodeToken(localStorage.getItem('access_token'));
  }

  public get loggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
