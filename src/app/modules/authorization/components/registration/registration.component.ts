import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../shared/services/message.service';
import {HandlersService} from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public id: number;
  public user = new User();
  public checkPass: string;

  constructor(private authService: AuthService,
              private router: Router,
              public message: MessageService,
              private handlers: HandlersService) { }

  ngOnInit() {
  }

  register() {
    if (this.user.login) {
      if (this.user.password === this.checkPass) {
        this.authService.register(this.user)
          .subscribe(
            (res: any) => {
              if (!res.error) {
                this.router.navigate(['store']);
              } else {
                this.message.warn(res.error);
              }
            },
            (err: any) => this.handlers.handleError('register')
          );
      } else {
        this.message.warn('Пароли не совпадают');
      }
    }
  }
}
