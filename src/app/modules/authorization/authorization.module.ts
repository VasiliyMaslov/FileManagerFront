import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationPageComponent } from './components/authorization-page/authorization-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthorizationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthorizationModule { }
