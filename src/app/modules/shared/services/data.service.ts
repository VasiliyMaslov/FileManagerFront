import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { Observable, } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getObject(objectId?): Observable<any> {
    if (objectId) {
      const options = {params: {objId: objectId}};
      return this.http.get(Urls.getDirectories, options);
    } else {
      return this.http.get(Urls.getDirectories);
    }
  }

  getAvailableStorage(): Observable<any> {
    return this.http.get(Urls.checkStorageSize);
  }

  createDirectory(currentDirectory: string, newDirectory: string): Observable<any> {
    return this.http.post(Urls.createDirectory, {objectId: currentDirectory, objectName: newDirectory});
  }

  moveObject(currentDirectory: string, newDirectory: string): Observable<any> {
    return this.http.put(Urls.moveObject, {objectId: currentDirectory, objId_new: newDirectory});
  }

  renameObject(objectId: string, newTitle: string): Observable<any> {
    return this.http.put(Urls.renameObject, {objectId: objectId, objectName: newTitle});
  }

  deleteObject(objectId: string): Observable<any> {
    return this.http.delete(Urls.deleteObject, {params: {objectId}});
  }

  downloadFile(objectId: string): Observable<any> {
    return this.http.get(Urls.download, {params: {fileId: objectId}});
  }

  uploadObject(file: FormData): Observable<any> {
    return this.http.post(Urls.upload, file);
  }

  addPermissions(form: FormData): Observable<any> {
    return this.http.post(Urls.addPermissions, form);
  }

  removePermissions(login: string, objectId: string): Observable<any> {
    const options = {params: {login: login, objectId: objectId}};
    return this.http.delete(Urls.removePermission, options);
  }

  allowedUsers(objId): Observable<any> {
    return this.http.get(Urls.allowedUsers, {params: {objId: objId}});
  }

  getShared(objId = '0'): Observable<any> {
    return this.http.get(Urls.sharedObjects, {params: {objId: objId}});
  }
}
