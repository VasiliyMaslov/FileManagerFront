import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './modules/shared/services/auth.service';
import {UserStoreModule} from './modules/user-store/user-store.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    AuthorizationModule,
    UserStoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: [
          'http://localhost:4200/auth/login',
          'http://localhost:4200/auth/register',
        ]
      }
    })
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
