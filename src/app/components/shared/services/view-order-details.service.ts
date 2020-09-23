import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ViewOrderDetailsService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient,private authService:AuthService) {
  }

  getAllOrders() {
    return this.http.get(`${systemSettings.serverURL}/orders/getAll`)
  }
  addAffiliateSellerOrder(order) {
    console.log("added", order);
    return this.http
      .post(`${systemSettings.serverURL}/orders/addAffiliateSellerOrder`, order)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  editAffiliateSellerOrderByOrderId(order) {
    console.log("updated", order);
    return this.http
      .post(`${systemSettings.serverURL}/orders/editAffiliateSellerOrderByOrderId`, order)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  getAffiliateSellerOrderById(id) {
    console.log("id", id);
    return this.http
      .post(`${systemSettings.serverURL}/orders/getAffiliateSellerOrderById`, {_id:id}) 
  }
  
  popualteForm(customer) {
    console.log("customer", customer);
    this.form.setValue({
      Customer_Name: customer.Customer_Name,

        Order_Date : customer.Address.Order_Date,
        Order_Note : customer.Address.Order_Note,
        Order_TotalProductSellingAmount      : customer.Address.Order_TotalProductSellingAmount,
        Order_TotalProductCostAmount    : customer.Address.Order_TotalProductCostAmount,
        Order_Customer       : customer.Address.Order_Customer,
        Order_Status   : customer.Address.Order_Status,
        StreetAddress: customer.Address.StreetAddress,
        City        : customer.Address.City,
        Province    : customer.Address.Province,
  
      Customer_Status: customer.Customer_Status, 
    });
  }
  assignOrderTo(dataToSend){
    return this.http
      .post(`${systemSettings.serverURL}/orders/assignOrderTo`, dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
  }
  ///////////////////////// Helpful routes ///////////////////
  getAllUsers() {
    return this.http.get(`${systemSettings.serverURL}/users/getAllUsers`)
  }
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
