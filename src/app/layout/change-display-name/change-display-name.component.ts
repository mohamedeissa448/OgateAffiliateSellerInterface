import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../components/shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AffiliateSellerUserService } from '../services/affiliate-seller-user.service';

@Component({
  selector: 'app-change-display-name',
  templateUrl: './change-display-name.component.html',
  styleUrls: ['./change-display-name.component.css']
})
export class ChangeDisplayNameComponent implements OnInit {

  id;
  title;
  AffiliateSeller_DisplayName :any =""
  constructor(
    public affiliateSellerUserService: AffiliateSellerUserService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ChangeDisplayNameComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
    this.AffiliateSeller_DisplayName = data.AffiliateSeller_DisplayName
  }

  ngOnInit() {}
  

  onSubmit() {
        this.affiliateSellerUserService.changeDisplayName(this.AffiliateSeller_DisplayName).subscribe((status) => {
          if(status==true)
          this.notificationService.success(":: Updated Successfully");
          else{
            this.notificationService.failed(":: Something went wrong,Please try again later!");
            this.AffiliateSeller_DisplayName = this.data.AffiliateSeller_DisplayName
          }

          this.onClose();
        });
         
    }
  
  onClose() {
    this.dialogRef.close({
      AffiliateSeller_DisplayName : this.AffiliateSeller_DisplayName
    });
  }



}
