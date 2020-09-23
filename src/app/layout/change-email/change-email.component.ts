import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../components/shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AffiliateSellerUserService } from '../services/affiliate-seller-user.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  id;
  title;
  AffiliateSeller_Email :any =""
  constructor(
    public affiliateSellerUserService: AffiliateSellerUserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ChangeEmailComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
    this.AffiliateSeller_Email = data.AffiliateSeller_Email
  }

  ngOnInit() {}
  

  onSubmit() {
        this.affiliateSellerUserService.changeEmail(this.AffiliateSeller_Email).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else{
            this.notificationService.failed(":: Something went wrong,Please try again later!");
            this.AffiliateSeller_Email = this.data.AffiliateSeller_Email
          }

          this.onClose();
        });
         
    }
  
  onClose() {
    this.dialogRef.close({
      AffiliateSeller_Email : this.AffiliateSeller_Email
    });
  }



}
