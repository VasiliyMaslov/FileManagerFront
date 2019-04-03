import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../models/user';
import {UserService} from '../../services/user.service';
import {HandlersService} from '../../services/handlers.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

   user: User;

  constructor(private authService: AuthService,
              private userService: UserService,
              private handlers: HandlersService) { }

  ngOnInit() {
    this.userService.getUserById(this.authService.accessToken.unique_name)
      .subscribe(
        (res: any) => this.user = res,
        (err) => this.handlers.handleError(err)
      );
  }

}
