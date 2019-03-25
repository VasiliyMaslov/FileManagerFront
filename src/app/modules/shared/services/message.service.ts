import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  success(message, action = 'Ok') {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['alert-success']
    });
  }

  warn(message, action = 'Ok') {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['alert-danger']
    });
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
