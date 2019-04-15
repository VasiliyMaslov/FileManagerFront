import {Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalCreateDirectoryComponent} from '../modal-create-directory/modal-create-directory.component';
import {ModalUploadFileComponent} from '../modal-upload-file/modal-upload-file.component';
import {EventService} from '../../../shared/services/event.service';
import {ObjectModel} from '../../../../models/object';
import {HandlersService} from '../../../shared/services/handlers.service';
import {ModalRenameComponent} from '../modal-rename/modal-rename.component';
import {ModalAllowsComponent} from '../modal-allows/modal-allows.component';
import {DataService} from '../../../shared/services/data.service';
import {UserService} from '../../../shared/services/user.service';
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-storage-bar',
  templateUrl: './storage-bar.component.html',
  styleUrls: ['./storage-bar.component.scss']
})
export class StorageBarComponent implements OnInit {

  currentUser: User;
  selectedObject: ObjectModel;
  directoryTree: Array<ObjectModel> = [];
  area = 'Мой диск';

  constructor(private dialog: MatDialog,
              private eventService: EventService,
              private handlers: HandlersService,
              private dataService: DataService,
              public userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscribeForActions();
    this.getCurrentUser();
  }

  currentDirectory(): Object {
    return this.directoryTree[this.directoryTree.length - 1];
  }

  getCurrentUser() {
    this.userService.getUserById(this.authService.accessToken.unique_name)
      .subscribe(
        res => this.currentUser = res,
        err => this.handlers.handleError(err)
      );
  }

  emitActionStorageBar(action) {
    this.eventService.emitAction({data: this.currentDirectory(), action: action});
  }

  openDirectory(object) {
    this.eventService.emitAction({data: object, action: 'picked_on_tree'});
  }

  openCreateDirectoryModal(): void {
    const dialogRef = this.dialog.open(ModalCreateDirectoryComponent, {
      data: this.currentDirectory(),
      minWidth: '50%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          if (res) {
            this.eventService.emitAction(res);
          }
        }
      );
  }

  openUploadFileModal(): void {
    const dialogRef = this.dialog.open(ModalUploadFileComponent, {
      minWidth: '40%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          if (res) {
            this.eventService.emitAction(res);
          }
        }
      );
  }

  openRenameModal(): void {
    const dialogRef = this.dialog.open(ModalRenameComponent, {
      data: this.selectedObject,
      minWidth: '50%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          if (res) {
            this.eventService.emitAction(res);
          }
        }
      );
  }

  openAllowsModal(): void {
    const dialogRef = this.dialog.open(ModalAllowsComponent, {
      data: this.selectedObject,
      minWidth: '50%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          if (res) {
            this.eventService.emitAction(res);
          }
        }
      );
  }

  subscribeForActions() {
    this.eventService.action
      .subscribe(res => {
        this.handleAction(res);
      },
        err => this.handlers.handleError(err));
  }

  handleAction(res) {
    if (res) {
      const object: ObjectModel = res.data;
      if (res.action === 'select') {
        this.selectedObject = object;
      } else if (res.action === 'tree_updated') {
        if (res.data) {
          this.directoryTree.forEach((o, i) => {
            if (o['objectId'] === res.data['objectId']) {
              this.directoryTree.length = i;
            }
          });
        }
        this.directoryTree.push(res.data);
      } else if (res.action === 'delete') {
        this.removeObject(this.selectedObject['objectId']);
      } else if (res.action === 'download') {
        this.downloadFile(this.selectedObject['objectId']);
      } else if (res.action === 'change_area') {
        if (res.data === 'mine') {
          this.area = 'Мой диск';
        } else if (res.data === 'shared') {
          this.area = 'Доступные мне';
        }
      }
    }
  }

  downloadFile(objectId: string): void {
    this.dataService.downloadFile(objectId)
      .subscribe(
        res => this.eventService.emitAction({data: res, action: 'download_file'}),
        err => this.handlers.handleError(err)
      );
  }

  removeObject(objectId: string): void {
    this.dataService.deleteObject(objectId)
      .subscribe(
        res => this.eventService.emitAction({data: res, action: 'remove_object'}),
        err => this.handlers.handleError(err)
      );
  }
}
