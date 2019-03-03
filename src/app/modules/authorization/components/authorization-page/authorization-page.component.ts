import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {

   public id: number;
   public user;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUser(id: number = 2) {
    this.userService.getUserById(id)
      .subscribe(
        (res: any) => {
          this.user = res;
          this.user = JSON.stringify(this.user);
        },
        (error => console.log(error))
      );
  }

}
