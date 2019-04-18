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
import {AuthService} from '../../../shared/services/auth.service';
import {User} from '../../../../models/user';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'app-storage-bar',
  templateUrl: './storage-bar.component.html',
  styleUrls: ['./storage-bar.component.scss']
})
export class StorageBarComponent implements OnInit {

  access: boolean;
  moveMode = false;
  movingObject: Object;
  currentUser: User;
  selectedObject: ObjectModel;
  directoryTree: Array<ObjectModel> = [];
  area = 'Мой диск';
  currentDirectory: Object;

  constructor(private dialog: MatDialog,
              private eventService: EventService,
              private handlers: HandlersService,
              private dataService: DataService,
              private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getCurrentDirectory();
    this.subscribeForActions();
    this.getCurrentUser();
    this.checkWriteAccess();
  }

  checkWriteAccess() {
    if (this.area === 'Доступные мне') {
      return !this.currentDirectory['write'];
    }
  }

  getCurrentUser() {
    this.authService.currentUser()
      .subscribe(
        res => {
          this.currentUser = res.user;
          },
        err => this.handlers.handleError(err)
      );
  }

  getCurrentDirectory(): void {
    this.eventService.currentDirectory
      .subscribe(res => {
        this.currentDirectory = res;
      });
  }

  emitActionStorageBar(action) {
    this.eventService.emitAction({data: this.currentDirectory, action: action});
  }

  openDirectory(object) {
    this.selectedObject = {};
    this.eventService.emitAction({data: object, action: 'picked_on_tree'});
  }

  openCreateDirectoryModal(): void {
    const dialogRef = this.dialog.open(ModalCreateDirectoryComponent, {
      data: this.currentDirectory,
      minWidth: '50%'
    });
  }

  openUploadFileModal(): void {
    const dialogRef = this.dialog.open(ModalUploadFileComponent, {
      data: this.currentDirectory,
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
      minWidth: '60%'
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
      .subscribe(res => this.handleAction(res),
        err => this.handlers.handleError(err));
  }

  handleAction(res) {
    if (res) {
      const object: ObjectModel = res.data;
      if (res.action === 'select') {
        if (!this.moveMode) {
          this.selectedObject = object;
        }
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
        this.directoryTree = [];
        if (res.data === 'mine') {
          this.area = 'Мой диск';
        } else if (res.data === 'shared') {
          this.area = 'Доступные мне';
        }
      } else if (res.action === 'remove_object' || res.action === 'rename_object' || res.action === 'open') {
        this.selectedObject = {};
        this.currentDirectory = res.data;
      }
    }
  }

  downloadFile(objectId: string): void {
    this.dataService.downloadFile(objectId)
      .subscribe(
        res => {
          const file = res.file;
          this.eventService.emitAction({data: {}, action: 'download_file'});
          const dataType = file.contentType;
          const binaryData = this.convertBase64ToBlobData(file.fileContents);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          if (file.fileDownloadName) {
            downloadLink.setAttribute('download', file.fileDownloadName);
          }
          document.body.appendChild(downloadLink);
          downloadLink.click();
          downloadLink.parentNode.removeChild(downloadLink);
        },
        err => this.handlers.handleError(err)
      );
  }

  convertBase64ToBlobData(base64Data: string, sliceSize = 512) {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return byteArrays;
  }

  removeObject(objectId: string): void {
    this.dataService.deleteObject(objectId)
      .subscribe(
        res => {
          if (!res.error) {
            this.eventService.emitAction({data: objectId, action: 'remove_object'});
            this.messageService.success(res.message);
          } else {
            this.messageService.warn(res.message);
          }
        },
        err => this.handlers.handleError(err)
      );
  }

  activateMoving() {
    this.moveMode = true;
    this.movingObject = this.selectedObject;
  }

  moveObject() {
    console.log(this.movingObject);
    this.dataService.moveObject(this.movingObject['objectId'], this.currentDirectory['objectId'])
      .subscribe(
        res => {
          if (!res.error) {
            this.eventService.emitAction({data: res, action: 'move_object'});
            this.messageService.success(res.message);
            this.moveMode =  false;
            this.movingObject = {};
          } else {
            this.messageService.warn(res.message);
          }
        },
        err => this.handlers.handleError(err)
      );
  }

  cancelMove() {
    this.moveMode = false;
    this.movingObject = {};
  }
}
