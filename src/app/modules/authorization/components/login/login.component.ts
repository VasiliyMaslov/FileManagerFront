import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public id: number;
  public user = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  auth(user: User) {
    this.userService.authenticate(user)
      .subscribe(
        (res: any) => {
          console.log(res);
        }
      );
  }

  getUser(id: number = 2) {
    this.userService.getUserById(id)
      .subscribe(
        (res: User) => {
          if (res) {
            console.log(res);
          }
        },
        (error => console.log(error))
      );
  }

}
