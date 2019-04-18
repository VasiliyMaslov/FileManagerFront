import {EventEmitter, Injectable} from '@angular/core';
import {IAction} from '../../../models/action';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentArea = new EventEmitter<string>();
  currentDirectory = new EventEmitter<Object>();
  action = new EventEmitter<Object>();

  constructor() {}

  emitAction(action: IAction) {
    this.action.emit(action);
    if (action.action === 'open' || action.action === 'picked_on_tree') {
      this.currentDirectory.emit(action.data);
    }
    if (action.action === 'change_area') {
      this.currentArea.emit(action.data);
    }
  }
}
