import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanceledOrdersService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient,private authService:AuthService) {
 
  }

  getAffiliateSellerCanceledOrders() {
    //let id = this.authService.currentUser._id;
    let Order_AffiliateSeller = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerCanceledOrders`,{Order_AffiliateSeller:Order_AffiliateSeller})
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
  getAffiliateSellerCanceledOrdersByDateFromTO(dataToSend) {
    dataToSend.Order_AffiliateSeller = this.authService.currentUser._id;
    return this.http
      .post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerCanceledOrdersByDateFromTO`, dataToSend) 
  }
  getFilteredCanceledOrdersByCustomerMobile(dataToSend) {
    dataToSend.Order_AffiliateSeller = this.authService.currentUser._id;
    return this.http
      .post(`${systemSettings.serverURL}/affiliateSellers/getFilteredCanceledOrdersByCustomerMobile`, dataToSend) 
  }

  ///////////////////////// Helpful routes ///////////////////
  getProvinces() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/provinces/getAllProvinces`)
  }
  /**********************Helpful Routes */
  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }
  getProductSellingPriceById(id) {
    return this.http.post(`${systemSettings.serverURL}/products/getProductSellingPriceById`,{_id:id})
  }
  getCustomers(){
    return this.http.get(`${systemSettings.serverURL}/customers/getAll`)
  }
  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }
  getOneProductFromStore(dataToSend){
    return this.http.post(`${systemSettings.serverURL}/store/getOneProductFromStore`,dataToSend)
  }
}
