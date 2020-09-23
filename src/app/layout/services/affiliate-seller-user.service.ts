import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../app-config';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AffiliateSellerUserService {

  constructor(private http :HttpClient,private authService:AuthService) { }
  changeDisplayName(newDisplayName){
    return this.http
    .post(`${systemSettings.serverURL}/affiliateSellers/changeDisplayName`, { 
       id: this.authService.currentUser._id ,
       AffiliateSeller_DisplayName : newDisplayName
       })
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  changeEmail(newEmail){
    return this.http
    .post(`${systemSettings.serverURL}/affiliateSellers/changeEmail`, { 
       id: this.authService.currentUser._id ,
       AffiliateSeller_Email : newEmail
       })
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }

  changePassword(dataToSend){
    return this.http
    .post(`${systemSettings.serverURL}/affiliateSellers/changeMyPassword`, { 
       _id: this.authService.currentUser._id ,
       old_password : dataToSend.old_password,
       new_password : dataToSend.new_password
       })
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }

}
