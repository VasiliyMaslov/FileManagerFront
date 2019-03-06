import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser(JSON.parse(localStorage.getItem('user')).userId);
  }

  getUser(id: number = 1) {
    this.userService.getUserById(id)
      .subscribe(
        (res: any) => {
          this.user = res;
        }
      );
  }

}
