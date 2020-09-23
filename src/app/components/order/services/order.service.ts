import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  form: FormGroup;
  title: string;
  constructor(private http: HttpClient,private authService:AuthService) {
   /* this.form = new FormGroup({
        Order_Date : new FormControl(""),
        Order_Note : new FormControl(""),
        Order_TotalProductSellingAmount      : new FormControl(""),
        Order_TotalProductCostAmount    : new FormControl(""),
        Order_Customer       : new FormControl(""),
        Order_Status   : new FormControl(""),
        StreetAddress: new FormControl(""),
        City        : new FormControl(""),
        Province    : new FormControl(""),
  
      Customer_Status: new FormControl(""),

    });*/
  }

  getOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/orders/getOrdersByAffiliateSellerId`,{_id:id})
  }
  addAffiliateSellerOrder(order) {
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
    return this.http
      .post(`${systemSettings.serverURL}/orders/editAffiliateSellerOrderByOrderId`, order)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );
      
  }
  deleteProductInOrder(deletedProduct,sellerMoneyDetails,orderId){
    let dataToSend = {
      deletedProduct : deletedProduct,
      sellerMoneyDetails : sellerMoneyDetails,
      orderId        : orderId
    };
    return this.http
    .post(`${systemSettings.serverURL}/orders/deleteProductInOrder`, dataToSend)
    .pipe(
      map((response: any) => {
        if (response.message == true) return true;
        return false;
      })
    );
  }
  getAffiliateSellerOrderById(id) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/getAffiliateSellerOrderById`, {_id:id}) 
  }
  getOrderShippingDetailsById(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/getOrderShippingDetailsById`, dataToSend) 
  }
  getFilteredOrdersByDateFromTO(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/getFilteredOrdersByDateFromTO`, dataToSend) 
  }
  getFilteredOrdersByCustomerMobile(dataToSend) {
    return this.http
      .post(`${systemSettings.serverURL}/orders/getFilteredOrdersByCustomerMobile`, dataToSend) 
  }
  
  popualteForm(customer) {
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
  getAvilabelQuantity(dataToSend){
    return this.http.post(`${systemSettings.serverURL}/store/getAvilabelQuantity`,dataToSend)
  }
  addCustomer(DataToSend) {
    return this.http.post(`${systemSettings.serverURL}/customers/addCustomer`,DataToSend)
  }
}
