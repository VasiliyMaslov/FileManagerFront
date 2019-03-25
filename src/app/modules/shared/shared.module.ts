import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HandlersService } from './services/handlers.service';
import { MaterialModule } from '../material/material.module';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NotFoundComponent,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule
  ],
  providers: [
    UserService,
    HandlersService
  ]
})
export class SharedModule {}
