import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectModel } from '../../../../models/object';
import { NgForm } from '@angular/forms';
import { EventService } from '../../../shared/services/event.service';
import { DataService } from '../../../shared/services/data.service';
import { MessageService } from '../../../shared/services/message.service';
import { HandlersService } from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-modal-rename',
  templateUrl: './modal-rename.component.html',
  styleUrls: ['./modal-rename.component.scss']
})
export class ModalRenameComponent implements OnInit {

  newTitle: string;
  type = ['папки', 'файла'];

  constructor(public dialogRef: MatDialogRef<ModalRenameComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ObjectModel,
              private eventService: EventService,
              private dataService: DataService,
              private messageService: MessageService,
              private handlers: HandlersService) { }

  ngOnInit() {
    this.newTitle = this.data.objectName;
  }

  onSubmit(form: NgForm) {
    if (form.form.valid) {
      this.newTitle = this.newTitle.replace(/\.[^/.]+$/, '');
      this.dataService.renameObject(this.data.objectId, this.newTitle)
        .subscribe(
          res => {
            this.renameObject(res);
          },
          err => this.handlers.handleError(err)
        );
    }
  }

  renameObject(res): void {
    if (!res.error) {
      console.log(res);
      this.eventService.emitAction({data: res, action: 'rename_object'});
      this.messageService.success(res.message);
      this.dialogRef.close();
    } else {
      this.messageService.warn(res.message);
    }
  }

  placeholderTitle(): string {
    if (this.data.type) {
      return this.type[0];
    } else {
      return this.type[1];
    }
  }
}
