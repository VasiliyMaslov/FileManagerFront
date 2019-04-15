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
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { TransformBooleanPipe } from './pipes/transform-boolean.pipe';
import {MAT_DIALOG_DATA} from '@angular/material';

@NgModule({
  declarations: [
    NotFoundComponent,
    HeadBarComponent,
    TransformBooleanPipe
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
    HeadBarComponent,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    TransformBooleanPipe
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    UserService,
    HandlersService
  ]
})
export class SharedModule {}
