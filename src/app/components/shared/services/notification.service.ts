import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}
  ngOnInit(): void {}
  success(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
  failed(msg) {
    this.snackBar.open(msg, "", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass:['customClass']
    });
  }
}
