import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../models/url';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getObject(objectId): Observable<any> {
    return this.http.get(Urls.getDirectories, {params: {objId: objectId}});
  }
}
