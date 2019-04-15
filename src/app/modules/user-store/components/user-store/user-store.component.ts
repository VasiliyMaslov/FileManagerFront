import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { ObjectModel } from '../../../../models/object';
import { EventService } from '../../../shared/services/event.service';
import { IAction } from '../../../../models/action';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  childObjects: Array<ObjectModel> = [];
  selectedObject: ObjectModel;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private eventService: EventService) { }

  ngOnInit() {
    this.getObjects();
    this.subscribeForActions();
  }

  getObjects(objectId?) {
    this.dataService.getObject(objectId)
      .subscribe(
        (res: Object) => {
          console.log(res);
          const data: Array<Object> = res['data'];
          this.eventService.emitAction({data: data[0], action: 'tree_updated'});
          this.childObjects = data.slice(1, data.length).sort((a, b) => a['type'] - b['type']);
        }
      );
  }

  getShared() {
    this.dataService.getShared()
      .subscribe(
        res => {
        const data = res['data'];
        if (data) {
          this.eventService.emitAction({data: data[0], action: 'tree_updated'});
          this.childObjects = data.slice(1, data.length).sort((a, b) => a['type'] - b['type']);
        }
      });
  }

  selectObject(object) {
    this.selectedObject = object;
  }

  subscribeForActions() {
    this.eventService.action
      .subscribe(res => this.updateData(res));
  }

  updateData(res: IAction) {
    if (res) {
      const data: any = res.data;
      if (res.action === 'create_directory' || res.action === 'upload_file') {
        if (data.length) {
          data.forEach(object => {
            this.childObjects.push(object);
          });
         } else {
          this.childObjects.push(data);
        }
      } else if (res.action === 'rename_object') {
        this.childObjects.forEach((object, i) => {
          if (data['objectId'] === object['objectId']) {
            this.childObjects[i] = data;
          }
        });
      } else if (res.action === 'remove_object') {
        this.childObjects.forEach((object, i) => {
          if (data['objectId'] === object['objectId']) {
            this.childObjects = this.childObjects.splice(i, 1);
          }
        });
      } else if (res.action === 'open') {
        this.getObjects(data['objectId']);
      } else if (res.action === 'picked_on_tree') {
        this.getObjects(data['objectId']);
      } else if (res.action === 'change_area') {
        console.log(res);
        if (res.data === 'mine') {
          this.getObjects();
        } else if (res.data === 'shared') {
          this.getShared();
        }
      }
    }
  }
}
