import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { HandlersService } from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent implements OnInit {

  @Input() object: Object;
  @Output() action = new EventEmitter<Object>();

  constructor(private dataService: DataService,
              private handlers: HandlersService) { }

  ngOnInit() {
  }

  downloadFile(objectId: string): void {
    this.dataService.downloadFile(objectId)
      .subscribe(
        res => this.action.emit({data: res, type: 'download_file'}),
        err => this.handlers.handleError(err)
      );
  }

  removeObject(objectId: string): void {
    this.dataService.deleteObject(objectId)
      .subscribe(
        res => this.action.emit({data: res, type: 'remove_object'}),
        err => this.handlers.handleError(err)
      );
  }

  renameObject(objectId: string, newTitle: string): void {
    this.dataService.renameObject(objectId, newTitle)
      .subscribe(
        res => this.action.emit({data: res, type: 'rename_object'}),
        err => this.handlers.handleError(err)
      );
  }

}
