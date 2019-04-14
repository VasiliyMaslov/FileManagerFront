import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getObject(objectId = '0'): Observable<any> {
    return this.http.get(Urls.getDirectories, {params: {objId: objectId}});
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
    return this.http.delete(Urls.deleteObject, {params: {objectId: objectId}});
  }

  downloadFile(objectId: string): Observable<any> {
    return this.http.get(Urls.download, {params: {fileId: objectId}});
  }

  uploadObject(file: FormData): Observable<any> {
    return this.http.post(Urls.upload, {file: file});
  }
}
