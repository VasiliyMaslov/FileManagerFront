import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/services/data.service';
import {HandlersService} from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-available-storage',
  templateUrl: './available-storage.component.html',
  styleUrls: ['./available-storage.component.scss']
})
export class AvailableStorageComponent implements OnInit {

  public mes: string;
  public bar: number;

  constructor(
    private dataService: DataService,
    private handlers: HandlersService
  ) { }

  ngOnInit() {
    this.getAvailableStorage();
  }

  getAvailableStorage() {
    this.dataService.getAvailableStorage()
      .subscribe(
        res => {
          this.mes = res.message;
          this.bar = res.used / res.available;
          },
        err => this.handlers.handleError(err)
      );
  }

}
