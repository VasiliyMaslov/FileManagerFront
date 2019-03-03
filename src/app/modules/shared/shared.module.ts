import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { HandlersService } from './services/handlers.service';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    NotFoundComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    NotFoundComponent,
    MessagesComponent
  ],
  providers: [
    UserService,
    HandlersService,
    MessageService
  ]
})
export class SharedModule { }
