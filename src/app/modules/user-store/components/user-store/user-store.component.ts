import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../../models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { HandlersService } from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService,
              private authService: AuthService,
              private handlers: HandlersService) { }

  ngOnInit() {
    this.getUser(this.authService.accessToken.unique_name);
  }

  getUser(id: number) {
    this.userService.getUserById(id)
      .subscribe(
        (res: any) =>  this.user = res,
        (err: any) => this.handlers.handleError(`getUser id=${id}`)
      );
  }

}
