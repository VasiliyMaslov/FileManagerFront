import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {HandlersService} from '../../../shared/services/handlers.service';
import {EventService} from '../../../shared/services/event.service';
import {MatDialogRef} from '@angular/material';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styleUrls: ['./modal-upload-file.component.scss']
})
export class ModalUploadFileComponent implements OnInit {

  @Output() action = new EventEmitter<Object>();
  files: FileList;

  constructor(private dataService: DataService,
              private handlers: HandlersService,
              private eventService: EventService,
              private dialogRef: MatDialogRef<ModalUploadFileComponent>,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.files.length) {
      const files: FileList = this.files;
      const formData = new FormData();
      formData.append('objId', '51');
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      this.uploadFile(formData);
    }
  }

  public addFile(event) {
    this.files = null;
    const target = event.target;
    this.files = target.files;
  }

  uploadFile(file: FormData): void {
    this.dataService.uploadObject(file)
      .subscribe(
        res => {
          if (!res.error) {
            this.eventService.emitAction({data: res.data, action: 'upload_file'});
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
