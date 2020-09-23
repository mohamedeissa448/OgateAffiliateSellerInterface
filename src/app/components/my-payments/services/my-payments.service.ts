import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyPaymentsService {

  
  constructor(private http: HttpClient,private authService:AuthService) {
 
  }

  getAffiliateSellerPaymentsByID() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerPaymentsByID`,{_id: id})
  }
  
  
  getAffiliateSellerOrderById(id) {
    console.log("id", id);
    return this.http
      .post(`${systemSettings.serverURL}/orders/getAffiliateSellerOrderById`, {_id:id}) 
  }
  getOrderShippingDetailsById(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/getOrderShippingDetailsById`, dataToSend) 
  }
  getAffiliateSellerPaymentsFromDateTo(dataToSend) {
    dataToSend._id = this.authService.currentUser._id;
    return this.http
      .post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerPaymentsFromDateTo`, dataToSend) 
  }
  getFilteredCanceledOrdersByCustomerMobile(dataToSend) {
    dataToSend.Order_AffiliateSeller = this.authService.currentUser._id;
    return this.http
      .post(`${systemSettings.serverURL}/affiliateSellers/getFilteredCanceledOrdersByCustomerMobile`, dataToSend) 
  }

  
}
