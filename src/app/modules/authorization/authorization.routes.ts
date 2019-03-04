import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {AuthorizationPageComponent} from './components/authorization-page/authorization-page.component';

export const authorizationRoutes: Routes = [
  {
    path: '',
    component: AuthorizationPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegistrationComponent
      }
    ]
  }
];
