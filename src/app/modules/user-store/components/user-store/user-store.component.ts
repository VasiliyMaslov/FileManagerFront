import {Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  currentDirectory: Object;
  childObjects: Array<Object> = [];

  constructor(private authService: AuthService,
              private dataService: DataService
             ) { }

  ngOnInit() {
    this.dataService.getObject()
      .subscribe(
        (res: Array<Object>) => {
          this.currentDirectory = res[0];
          this.childObjects = res.slice(1, res.length);
        }
      );
  }

  onChanged(event) {
    console.log(event);
  }
}
