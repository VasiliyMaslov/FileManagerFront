import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {UserService} from '../services/user.service';
import {HandlersService} from '../services/handlers.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate  {
  constructor(private authService: AuthService,
              private router: Router,
              private userServiсe: UserService,
              private handlers: HandlersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('auth/login');
      return false;
    } else {
        this.authService.currentUser()
          .subscribe(res => this.authService.user = res.user,
            err => this.handlers.handleError(err));
      }
      return true;
    }
}
