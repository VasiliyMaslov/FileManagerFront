import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { HeadBarComponent } from '../shared/components/head-bar/head-bar.component';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [
    AuthorizationPageComponent,
    RegistrationComponent,
    LoginComponent,
    HeadBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeadBarComponent
  ],
  providers: [
    LoginGuard
  ]
})
export class AuthorizationModule { }
