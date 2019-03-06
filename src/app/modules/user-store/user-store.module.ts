import { NgModule } from '@angular/core';
import { UserStoreComponent } from './components/user-store/user-store.component';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [
    UserStoreComponent
  ],
  imports: [
    SharedModule,
    AuthorizationModule
  ]
})
export class UserStoreModule { }
