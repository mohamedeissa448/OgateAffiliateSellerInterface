import { Injectable, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root"
})
export class ToastService implements OnInit {
  constructor(private snackBar: MatSnackBar, private toastr :ToastrService) {}
  ngOnInit(): void {}
  success(msg) {
    this.toastr.success(msg, undefined, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 5000,
    });
    // this.snackBar.open(msg, "", {
    //   duration: 30000,
    //   horizontalPosition: "right",
    //   verticalPosition: "top",
    //   panelClass: ['style-succes'], 
    // });
  }
  failed(msg) {
    this.toastr.error(msg, undefined, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 5000,
    });
    // this.snackBar.open(msg, "", {
    //   duration: 30000,
    //   horizontalPosition: "right",
    //   verticalPosition: "top",
    //   panelClass: ['style-faild'],
    // });
  }
  normal(msg) {
    this.toastr.info(msg, undefined, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 5000,
    });
    // this.snackBar.open(msg, "", {
    //   duration: 30000,
    //   horizontalPosition: "right",
    //   verticalPosition: "top",
    //   panelClass: ['style-faild'],
    // });
  }
}
