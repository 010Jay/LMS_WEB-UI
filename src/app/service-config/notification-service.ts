import { Injectable } from '@angular/core';  
import { MatSnackBar } from '@angular/material/snack-bar';
  
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(private dialog: MatSnackBar) { }
  
  openDialog(message: string, action: string) {
    this.dialog.open(message, action, {
      duration: 2000,
    });
  }
}
