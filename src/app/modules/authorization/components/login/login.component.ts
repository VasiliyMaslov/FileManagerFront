import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { AuthService } from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public id: number;
  public user = new User();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  auth(user: User) {
    this.authService.login(user)
      .subscribe(
        (res: any) => {
         this.router.navigateByUrl('/store');
        },
        (err: any) => console.log(err)
      );
  }
}
