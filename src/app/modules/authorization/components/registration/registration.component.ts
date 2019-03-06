import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public id: number;
  public user = new User();
  public checkPass: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log(this.user);
    if (this.user.password === this.checkPass) {
      this.authService.register(this.user)
        .subscribe(
          (res: User) => {
            if (res) {
              this.router.navigateByUrl('/store');
            }
          },
          (err: any) => console.warn(err)
        );
    } else {
      console.log('Пароли не совпадают');
    }
  }

}
