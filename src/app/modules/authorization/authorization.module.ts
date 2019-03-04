import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { authorizationRoutes } from './authorization.routes';

@NgModule({
  declarations: [
    AuthorizationPageComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ]
})
export class AuthorizationModule { }
