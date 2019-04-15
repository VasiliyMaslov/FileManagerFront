import { Injectable } from '@angular/core';
import {ObjectModel} from '../../../models/object';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  currentDirectory: ObjectModel;
  selectedObject: ObjectModel;

   constructor() { }


}
