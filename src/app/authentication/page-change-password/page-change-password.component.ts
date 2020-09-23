import { Component, OnInit } from '@angular/core';
import { ChangePasswordService } from '../services/change-password.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../../components/shared/services/notification.service';

@Component({
  selector: 'app-page-change-password',
  templateUrl: './page-change-password.component.html',
  styleUrls: ['./page-change-password.component.css']
})
export class PageChangePasswordComponent implements OnInit {
  isMatched=true;
  constructor(private changePasswordService:ChangePasswordService,private authService:AuthService,
    private notificationService:NotificationService) { }

  ngOnInit() {
  }
  onSubmit(formValue){
    console.log("formValue",formValue);
    if(formValue.confirm_password != formValue.new_password){
      this.isMatched=false
    }else{
      let dataToSend:any = {};
      console.log("current user", this.authService.currentUser)
      console.log("current user",typeof(this.authService.currentUser) )

      dataToSend.User_Code = this.authService.currentUser.User_Code;
      dataToSend.old_password = formValue.old_password;
      dataToSend.new_password = formValue.new_password;
      this.changePasswordService.changeMyPassword(dataToSend).subscribe((status)=>{
        if(status){
          this.notificationService.success("Password updated successfully")
        }else{
          this.notificationService.failed("Password Can not be updated")
        }
      })
    }
  }

}
