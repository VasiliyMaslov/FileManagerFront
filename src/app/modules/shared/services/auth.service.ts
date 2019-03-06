import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { HandlersService } from './handlers.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private httpClient: HttpClient,
              private handlers: HandlersService,
              private router: Router) { }

  login(user: User) {
    return this.httpClient.post<User>(Urls.authenticate, user)
      .pipe(
        tap(
          (res: User) => {
            this.handlers.log(`authenticate user id=${user.userId}`);
            localStorage.setItem('user', JSON.stringify({userId: res.userId, login: res.login, token: res.token}));
            this.user = res;
        }),
        catchError(this.handlers.handleError<User>(`authenticate id${user.userId}`))
      );
  }

  register(user: User) {
    return this.httpClient.post<User>(Urls.register, user)
      .pipe(
        tap((res) => {
          this.handlers.log(`register user id=${user.userId}`);
          this.login(user);
        }),
        catchError(this.handlers.handleError<User>(`register id=${user.userId}`))
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth');
  }

  public get User(): User {
    return this.user;
  }

  public get loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
