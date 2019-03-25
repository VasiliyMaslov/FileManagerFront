import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';
import { AuthorizationPageComponent } from './modules/authorization/components/authorization-page/authorization-page.component';
import { UserStoreComponent } from './modules/user-store/components/user-store/user-store.component';
import { LoginGuard } from './modules/authorization/guards/login.guard';
import { UnauthorizedGuard } from './modules/shared/guards/unauthorized.guard';
import { RegistrationComponent } from './modules/authorization/components/registration/registration.component';
import { LoginComponent } from './modules/authorization/components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthorizationPageComponent,
    canActivate: [LoginGuard],
    children: [{
        path: 'register',
        component: RegistrationComponent
      }, {
        path: 'login',
        component: LoginComponent
      }
    ]},
  { path: 'store', component: UserStoreComponent, canActivate: [UnauthorizedGuard] },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
