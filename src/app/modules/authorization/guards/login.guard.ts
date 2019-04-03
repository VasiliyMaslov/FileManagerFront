import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { HandlersService } from '../../shared/services/handlers.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate  {
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private handlers: HandlersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.loggedIn) {
      this.router.navigateByUrl('/store');
      this.userService.getUserById(this.authService.accessToken.unique_name)
        .subscribe(
          res => {
            this.authService.user = res;
          }, err => this.handlers.handleError(err)
        );
      return false;
    } else {
      return true;
    }
  }

}
