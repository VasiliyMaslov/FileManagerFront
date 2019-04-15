import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { HandlersService } from '../../../shared/services/handlers.service';
import { NgForm} from '@angular/forms';
import { MessageService} from '../../../shared/services/message.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventService } from '../../../shared/services/event.service';
import { ObjectModel } from '../../../../models/object';

@Component({
  selector: 'app-modal-create-directory',
  templateUrl: './modal-create-directory.component.html',
  styleUrls: ['./modal-create-directory.component.scss']
})
export class ModalCreateDirectoryComponent implements OnInit {

  public newDirectory: string;

  constructor(private dataService: DataService,
              private handlers: HandlersService,
              private messageService: MessageService,
              private eventService: EventService,
              public dialogRef: MatDialogRef<ModalCreateDirectoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ObjectModel) { }

  ngOnInit() {}

  onSubmit(createDirectoryForm: NgForm): void {
    if (createDirectoryForm.form.valid) {
      console.log(this.data);
      this.createDirectory(this.data['objectId'], this.newDirectory);
    }
  }

  createDirectory(currentDirectory: string, newDirectory: string): void {
    this.dataService.createDirectory(currentDirectory, newDirectory)
      .subscribe(
        res => {
          if (!res.error) {
            this.eventService.emitAction({data: res, action: 'create_directory'});
            this.dialogRef.close();
            this.messageService.success(res.message);
          } else {
            this.messageService.warn(res.message);
          }
        },
        err => this.handlers.handleError(err)
      );
  }

}
