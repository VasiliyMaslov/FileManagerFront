import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {HandlersService} from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-modal-upload-file',
  templateUrl: './modal-upload-file.component.html',
  styleUrls: ['./modal-upload-file.component.scss']
})
export class ModalUploadFileComponent implements OnInit {

  @Output() action = new EventEmitter<Object>();
  files: any;

  constructor(private dataService: DataService,
              private handlers: HandlersService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.files.length) {
      const files: FileList = this.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
      formData.append('id', '51');
      this.uploadFile(formData);
    }
  }

  public addFile(event) {
    this.files = [];
    const target = event.target;
    this.files = target.files;
  }

  uploadFile(file: FormData): void {
    this.dataService.uploadObject(file)
      .subscribe(
        res => {
          this.action.emit({data: res, type: 'upload_file'});
          console.log(res);
        },
        err => this.handlers.handleError(err)
      );
  }
}
