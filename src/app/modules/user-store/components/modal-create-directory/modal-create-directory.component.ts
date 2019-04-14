import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { HandlersService } from '../../../shared/services/handlers.service';
import { NgForm} from '@angular/forms';
import {MessageService} from '../../../shared/services/message.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-create-directory',
  templateUrl: './modal-create-directory.component.html',
  styleUrls: ['./modal-create-directory.component.scss']
})
export class ModalCreateDirectoryComponent implements OnInit {

  private currentDirectory: Object;
  public newDirectory: string;

  constructor(private dataService: DataService,
              private handlers: HandlersService,
              private messageService: MessageService,
              public dialogRef: MatDialogRef<ModalCreateDirectoryComponent>) { }

  ngOnInit() {
    this.dataService.getObject()
      .subscribe(
        res => this.currentDirectory = res[0],
        err => this.handlers.handleError(err)
      );
  }

  onSubmit(createDirectoryForm: NgForm): void {
    if (createDirectoryForm.form.valid) {
      this.createDirectory(this.currentDirectory['objectId'], this.newDirectory);
    }
  }

  createDirectory(currentDirectory: string, newDirectory: string): void {
    this.dataService.createDirectory(currentDirectory, newDirectory)
      .subscribe(
        res => {
          this.dialogRef.close({data: res, type: 'create_directory'});
          this.messageService.success(res.message);
        },
        err => this.handlers.handleError(err)
      );
  }

}
