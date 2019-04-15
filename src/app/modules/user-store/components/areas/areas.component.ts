import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../shared/services/event.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  chooseArea(area: string) {
    this.eventService.emitAction({data: area, action: 'change_area'});
  }

}
