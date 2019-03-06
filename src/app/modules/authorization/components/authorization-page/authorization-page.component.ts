import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {

  constructor(private authService: AuthService) {}
  ngOnInit() {

  }

  loggedIn() {
    return this.authService.loggedIn;
  }

}
