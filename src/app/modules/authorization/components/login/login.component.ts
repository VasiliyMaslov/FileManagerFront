import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public id: number;
  public user = new User();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  auth(user: User) {
    this.authService.login(user)
      .subscribe(
        (res: any) => {
          console.log(res);
        }
      );
  }
}
