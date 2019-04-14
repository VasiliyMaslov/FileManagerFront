import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ModalCreateDirectoryComponent} from '../modal-create-directory/modal-create-directory.component';
import {ModalUploadFileComponent} from '../modal-upload-file/modal-upload-file.component';

@Component({
  selector: 'app-storage-bar',
  templateUrl: './storage-bar.component.html',
  styleUrls: ['./storage-bar.component.scss']
})
export class StorageBarComponent implements OnInit {

  @Output() action = new EventEmitter<Object>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCreateDirectoryModal(): void {
    const dialogRef = this.dialog.open(ModalCreateDirectoryComponent, {
      minWidth: '50%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => this.action.emit(res)
      );
  }

  openUploadFileModal(): void {
    const dialogRef = this.dialog.open(ModalUploadFileComponent, {
      minWidth: '40%'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => this.action.emit(res)
      );
  }
}
