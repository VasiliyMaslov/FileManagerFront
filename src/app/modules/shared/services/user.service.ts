import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Urls } from '../../../models/url';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandlersService } from './handlers.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private handlers: HandlersService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(Urls.accounts)
      .pipe(
      tap(() => this.handlers.log(`fetched users`)),
      catchError(this.handlers.handleError<User[]>(`getUsers`, []))
      );
  }

  getUserById(id: number): Observable<User> {
    const url = Urls.accounts + '/' + id;
    return this.http.get<User>(url)
      .pipe(
        tap(() => this.handlers.log(`fetched user id=${id}`)),
        catchError(this.handlers.handleError<User>(`getUserById id=${id}`))
      );
  }

  updateUser(user: User) {
    return this.http.put(Urls.accounts, user);
  }

  deleteUser(id: number) {
    return this.http.delete(Urls.accounts, {params: {}});
  }
}

