import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../../models/user';
import { AuthService } from '../../../shared/services/auth.service';
import { HandlersService } from '../../../shared/services/handlers.service';
import {DataService} from '../../../shared/services/data.service';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService,
              private dataService: DataService
             ) { }

  ngOnInit() {
  }

  hyi() {
    this.dataService.getObject(51)
      .subscribe(
        res => console.log(res)
      );
  }

}
