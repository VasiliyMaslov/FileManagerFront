import {Component, Input, OnInit} from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { HandlersService } from '../../../shared/services/handlers.service';
import { ObjectModel } from '../../../../models/object';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent implements OnInit {

  @Input() object: ObjectModel;
  @Input() selectedObject: ObjectModel;

  constructor(private dataService: DataService,
              private handlers: HandlersService,
              private eventService: EventService) { }

  ngOnInit() {
  }

  onSelectFile() {
    this.eventService.emitAction({data: this.object, action: 'select'});
  }

  onOpenObject() {
    if (this.object.type) {
      this.eventService.emitAction({data: this.object, action: 'open'});
    }
  }

}
