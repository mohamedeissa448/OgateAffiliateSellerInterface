import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../components/shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AffiliateSellerUserService } from '../services/affiliate-seller-user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id;
  title;
  new_password :any ="";
  confirm_new_password :any ="";
  current_AffiliateSeller_Password :any ="";
  constructor(
    public affiliateSellerUserService: AffiliateSellerUserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {}
  

  onSubmit() {
    if(this.confirm_new_password != this.new_password){
      this.notificationService.failed(":: Passwords don't match");
    }else{
      this.affiliateSellerUserService.changePassword({
        old_password : this.current_AffiliateSeller_Password,
        new_password : this.confirm_new_password
      }).subscribe((status) => {
        if(status){
          this.notificationService.success(":: Updated Successfully");
          this.onClose();
        }
        
        else{
          this.notificationService.failed(":: current Password is wrong!");
        }

      });
    }
        
         
    }
  
  onClose() {
    this.dialogRef.close({updated : true});
  }


}
