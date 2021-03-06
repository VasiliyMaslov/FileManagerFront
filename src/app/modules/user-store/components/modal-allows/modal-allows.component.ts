import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { HandlersService } from '../../../shared/services/handlers.service';
import { DataService } from '../../../shared/services/data.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectModel } from '../../../../models/object';
import { EventService } from '../../../shared/services/event.service';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-modal-allows',
  templateUrl: './modal-allows.component.html',
  styleUrls: ['./modal-allows.component.scss']
})
export class ModalAllowsComponent implements OnInit {

  object: ObjectModel;
  objectOwner: Object;
  allowedUsers: Array<Object> = [];
  user = {
    login: '',
    write: false,
    read: false
  };

  constructor(private userService: UserService,
              private handlers: HandlersService,
              private dataService: DataService,
              public dialogRef: MatDialogRef<ModalAllowsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ObjectModel,
              private eventService: EventService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.object = this.data;
    this.getAllowedUsers();
  }

  removePermissions(user) {
    this.dataService.removePermissions(user.login, this.object.objectId)
      .subscribe(res => {
        if (!res.error) {
          this.allowedUsers.forEach((usr, i) => {
            if (usr['userID'] === user['userID']) {
              this.allowedUsers.splice(i, 1);
            }
          });
          this.messageService.success(res.message);
        } else {
          this.messageService.warn(res.message);
        }
      },
        err => this.handlers.handleError(err));
  }

  getAllowedUsers() {
    this.dataService.allowedUsers(this.object.objectId)
      .subscribe(res => {
        if (!res.error) {
          this.objectOwner = res.parent;
          this.allowedUsers = res.childs;
        } else {
          this.messageService.warn(res.message);
        }
      },
        err => this.handlers.handleError(err));
  }

  onSubmit(form: NgForm) {
    if (form.form.valid) {
      this.allowPermissions(form);
    }
  }

  allowPermissions(form): void {
    const formData: FormData = new FormData();
    formData.append('objectId', this.object.objectId);
    formData.append('logins', this.user.login);
    formData.append('write', (this.user.write).toString());
    formData.append('read', (this.user.read).toString());
    this.dataService.addPermissions(formData)
      .subscribe(
        res => this.handleAllowPermissions(res, form),
        err => this.handlers.handleError(err));
  }

  handleAllowPermissions(res, form): void {
    if (!res.error) {
      if (!this.allowedUsers.length) {
        this.allowedUsers.push(res.data[0]);
      }
        this.allowedUsers.forEach((user, i) => {
          if (user && user['login'] === res['data'][0]['login']) {
            this.allowedUsers[i] = res.data[0];
          } else {
            this.allowedUsers.push(res.data[0]);
          }
        });
      form.onReset();
      this.messageService.success(res.message);
    } else {
      this.messageService.warn(res.message);
    }
  }
}
