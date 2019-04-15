import {EventEmitter, Injectable} from '@angular/core';
import {IAction} from '../../../models/action';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentDirectory: Object;
  action = new EventEmitter<Object>();

  constructor() {}

  emitAction(action: IAction) {
    this.action.emit(action);
    if (action.action === 'open' || action.action === 'picked_on_tree') {
      this.currentDirectory = action.data;
    }
  }
}
