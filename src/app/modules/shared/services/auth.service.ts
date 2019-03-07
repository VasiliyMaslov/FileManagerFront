import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../../models/user';
import { HandlersService } from './handlers.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccessToken } from '../../../models/accessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  user: User;

  constructor(private httpClient: HttpClient,
              private handlers: HandlersService,
              private router: Router,
              private userService: UserService,
              private helper: JwtHelperService) {}

  ngOnInit(): void {}

  login(user: User) {
    return this.httpClient.post<User>(Urls.authenticate, user)
      .pipe(
        tap(
          (res: User) => {
            this.handlers.log(`authenticate user id=${user.userId}`);
            this.user = res;
            localStorage.setItem('access_token', res.token);
        }),
        catchError(this.handlers.handleError<User>(`authenticate id ${user.userId}`))
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
    this.user = new User();
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth']);
  }

  public get activeUser(): User {
    let user: User;
    this.userService.getUserById(this.accessToken.unique_name)
      .subscribe(
        (res: User) => user = res,
        (err: any) => this.handlers.handleError<User>(`getUserById id= ${user.userId}`)
      );
    return user;
  }

  public get accessToken(): AccessToken {
    return this.helper.decodeToken(localStorage.getItem('access_token'));
  }

  public get loggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
