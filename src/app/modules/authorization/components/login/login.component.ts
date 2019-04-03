import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import { HandlersService } from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public id: number;
  public user = new User();

  constructor(private authService: AuthService,
              private router: Router,
              private message: MessageService,
              private handlers: HandlersService) { }

  ngOnInit() {
  }

  auth(user: User) {
    if (user.login) {
      this.authService.login(user)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (!res.error) {
              if (this.authService.loggedIn) {
                this.router.navigate(['store']);
              } else {
                this.router.navigate(['auth/login']);
              }
            } else {
              this.message.warn(res.error);
            }
          },
          (err: any) => this.handlers.handleError(err)
        );
    }
  }
}
