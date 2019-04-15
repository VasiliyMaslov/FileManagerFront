import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../models/user';
import {UserService} from '../../services/user.service';
import {HandlersService} from '../../services/handlers.service';
import {MessageService} from '../../services/message.service';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

   user: User;

  constructor(public authService: AuthService,
              private userService: UserService,
              private handlers: HandlersService,
              private messageService: MessageService,
              private eventService: EventService) { }

  ngOnInit() {
    this.getUser();
    this.subscribeForActions();
  }

  getUser(): void {
    this.authService.currentUser()
      .subscribe(res => {
        if (!res.error.error) {
          this.user = res.user;
        } else {
          this.messageService.warn(res.message);
        }
      },
        err => this.handlers.handleError(err));
  }

  subscribeForActions() {
    this.eventService.action
      .subscribe(res => {
        if (res) {
          if (res.action === 'login') {
            this.getUser();
          }
        }
      });
  }
}
