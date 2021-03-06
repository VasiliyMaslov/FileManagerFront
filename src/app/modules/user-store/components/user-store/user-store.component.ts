import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DataService } from '../../../shared/services/data.service';
import { ObjectModel } from '../../../../models/object';
import { EventService } from '../../../shared/services/event.service';
import { IAction } from '../../../../models/action';
import { HandlersService } from '../../../shared/services/handlers.service';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  childObjects: Array<ObjectModel> = [];
  currentDirectory: Object;
  currentArea = 'mine';
  currentUser: Object;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private eventService: EventService,
              private handlers: HandlersService) { }

  ngOnInit() {
    this.getObjects();
    this.subscribeForActions();
    this.getCurrentDirectory();
    this.getCurrentArea();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.currentUser()
      .subscribe(res => this.currentUser = res['user']
      );
  }

  getCurrentArea(): void {
    this.eventService.currentArea
      .subscribe(res => {
        this.currentArea = res;
        this.eventService.emitAction({data: res, action: 'change_area'});
      });
  }

  getData(objectId?) {
    if (this.currentArea === 'mine') {
      this.getObjects(objectId);
    } else if (this.currentArea === 'shared') {
      this.getShared(objectId);
    }
  }

  getObjects(objectId?) {
    this.dataService.getObject(objectId)
      .subscribe(
        (res: Object) => {
          const data: Array<Object> = res['data'].sort((a, b) => a['level'] - b['level']);
          this.eventService.emitAction({data: data[0], action: 'tree_updated'});
          this.childObjects = data.slice(1, data.length).sort((a, b) => a['type'] - b['type']);
        },
        err => this.handlers.handleError(err)
      );
  }

  getShared(objectId?) {
    this.dataService.getShared(objectId)
      .subscribe(
        res => {
          const data = res['data'];
          this.childObjects = data.sort((a, b) => a['type'] - b['type']);
          this.childObjects['shared'] = true;
          this.eventService.emitAction({data: this.currentDirectory, action: 'tree_updated'});
          this.eventService.emitAction({data: this.childObjects, action: 'shared_objects'});
      },
        err => this.handlers.handleError(err));
  }

  getCurrentDirectory(): void {
    this.eventService.currentDirectory
      .subscribe(res => this.currentDirectory = res);
  }

  selectObject(object) {
    this.eventService.emitAction({data: object, action: 'select'});
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
          if (data['data']['objectId'] === object['objectId']) {
            this.childObjects[i] = data['data'];
          }
        });
      } else if (res.action === 'remove_object') {
        this.childObjects.forEach((object, i) => {
          if (data === object['objectId']) {
            this.childObjects.splice(i, 1);
          }
        });
      } else if (res.action === 'open' || res.action === 'picked_on_tree') {
        this.getData(data['objectId']);
      } else if (res.action === 'change_area') {
        this.getData();
      } else if (res.action === 'move_object') {
        this.childObjects.push(res.data['relocated_objects'][0]);
      }
    }
  }
}
