import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HandlersService {

  constructor(private messageService: MessageService,
              private router: Router) { }

  log(message: string) {
    this.messageService.add(`MessageService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('access_token');
        this.router.navigate(['auth']);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
