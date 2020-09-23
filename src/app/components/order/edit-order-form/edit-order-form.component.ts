import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl, NgForm} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../authentication/services/auth.service';
import { OrderService } from '../services/order.service';
import { ToastService } from "../../../services/toast.service";

@Component({
  selector: 'app-edit-order-form',
  templateUrl: './edit-order-form.component.html',
  styleUrls: ['./edit-order-form.component.css']
})
export class EditOrderFormComponent implements OnInit {

  isLoading = false;
  Order_Date:any = "";
  Order_Note:any ="";
  Size_Variant:any = "";
  Color_Variant:any = "";
  Quantity:any = "";
  availableProductQuantity:any = "";
  ordered_Products:any=[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  TotalOrderAmount = 0;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productCtrl = new FormControl();
  customerCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  filteredCustomers: Observable<string[]>;
  products: string[] = [];
  allProducts: any[] = [];
  customers: string[] = [];
  allCustomers: any[] = [];
  CustomerName : String = "";
  Customer_ShippingAddress:any= {}
  colorVariants:any=[];
  sizeVariants:any=[];
  provinces:any=[];
  id;
  title;
  //affiliate seller percentage and amount of money
  Order_AffiliateSellerRevenueAmount :any ="";
  Order_AffiliateSellerRevenuePercentage :any ="";
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  @ViewChild("customerInput",{static: false}) customerInput: ElementRef;
  @ViewChild('orderForm', {static: false}) orderForm: NgForm;
  @ViewChild('productForm', {static: false}) productForm: NgForm;
  ShippingFees: any;
  
  constructor(
    public authService: AuthService,
    private toastService: ToastService,
    public orderService: OrderService,
    public dialogRef: MatDialogRef<EditOrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.orderService.getProducts().subscribe((products:any)=>{
      this.allProducts = products ;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.orderService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    }) ;
    this.orderService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    });
  
    this.orderService.getCustomers().subscribe((response :any)=>{
      this.allCustomers=response;
      this.customerCtrl.valueChanges.subscribe(search => {
        this.filteredCustomers = of(this.allCustomers.filter(item =>
          item.Address.Mobile.toLowerCase().includes(search)
        ));
      });
    });
    this.orderService.getProvinces().subscribe((response)=>{
      this.provinces=response;
      this.orderService.getAffiliateSellerOrderById(this.id).subscribe((outereRsponse:any)=>{
        this.Order_Date = outereRsponse.Order_Date;
        this.Order_Note = outereRsponse.Order_Note;
        this.Customer_ShippingAddress = outereRsponse.Customer_ShippingAddress;
        this.Order_AffiliateSellerRevenueAmount =outereRsponse.Order_AffiliateSellerRevenueAmount ;
        this.Order_AffiliateSellerRevenuePercentage = outereRsponse.Order_AffiliateSellerRevenuePercentage;
        this.customers.push(outereRsponse.Order_Customer.Customer_Name+',Mobile('+outereRsponse.Order_Customer.Customer_ShippingAddress.Mobile+')');
        this.customerCtrl.setValue(outereRsponse.Order_Customer)
        this.customerInput.nativeElement.value = "";
        this.CustomerName = outereRsponse.Order_Customer.Customer_Name ;
          outereRsponse.Order_Products.forEach((element)=>{
          this.orderService.getOneProductFromStore({
            Store_Product : element.Product,
            Size_Variant : element.Size_Variant,
            Color_Variant : element.Color_Variant
          }).subscribe(((innerResponse:any) =>{
            this.ordered_Products.push({
              Product:element.Product,
              Size_Variant:element.Size_Variant,
              Color_Variant:element.Color_Variant,
              Quantity:element.Quantity,
              Cost:element.Cost,
              Total_Price:element.Price,
              leftProductQuantity: innerResponse.Store_Quantity - innerResponse.Store_PendingQuantity,
            });
            this.TotalOrderAmount +=  element.Price;
          }))
      
        });
        if(this.Customer_ShippingAddress.Province){
          var result = this.provinces.filter(obj => {
            return obj._id === this.Customer_ShippingAddress.Province;
          })
          this.ShippingFees = result[0].Province_DefaultShippingFees;
        }
        else{
          this.ShippingFees = null;
        }
        
      })
    });
     
    
 
   
  }
  /********add product */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.products.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.productCtrl.setValue(null);
  }
  /********remove product */
  remove(fruit: string): void {
    console.log('delet product');
    console.log(fruit)
    const index = this.products.indexOf(fruit);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {    
    if(this.products.length == 0){
      this.products.push(event.option.viewValue);
      this.productInput.nativeElement.value = "";
      //this.productCtrl.setValue(null);
      this.CheckQuantity();
    }
  
  }
  avilableQuanityVal : Number = 0;
  SellingPrice: any = 0;
  StoreCost: any = 0;
  CheckQuantity(){
    if(this.products.length>0 && this.productCtrl.value && this.Size_Variant && this.Color_Variant){
      this.orderService.getAvilabelQuantity({
        Store_Product : this.productCtrl.value._id,
        Size_Variant : this.Size_Variant._id,
        Color_Variant : this.Color_Variant._id
      }).subscribe((response:any) =>{
        if(response.status){
          this.SellingPrice = response.SellingPrice;
          this.avilableQuanityVal = Number(response.AvilabelQuantity);
          this.StoreCost = Number(response.Store_Cost);
        }
        else{
          this.avilableQuanityVal = 0;
          this.SellingPrice = 0;
          this.StoreCost = 0;
          this.toastService.failed("Product is not available in our inventories right now")
        }
      })
    }
    else{
      this.avilableQuanityVal = 0;
      this.SellingPrice = 0;
      this.StoreCost = 0;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allProducts.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
  /***********Customer */
  /********add customer */
  addCustomer(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || "").trim()) {
      this.customers.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    this.customerCtrl.setValue(null);
  }
  /********remove customer */
  removeCustomer(customer: string): void {
    const index = this.customers.indexOf(customer);

    if (index >= 0) {
      this.customers.splice(index, 1);
      this.CustomerName = "";
      this.Customer_ShippingAddress = {};
    }
  }
/***********select customer */
  selectedCustomer(event: MatAutocompleteSelectedEvent): void {
    
    if(this.customers.length == 0){
      this.customers.push(event.option.viewValue);
      this.customerInput.nativeElement.value = "";
      this.CustomerName = event.option.value.Customer_Name;
      this.Customer_ShippingAddress = event.option.value.Customer_ShippingAddress;
    }
  
  }
/*******filter customer */
  private _filterCustomer(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCustomers.filter(
      customer => customer.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  onAdd() {
    if(this.products.length==0 || !this.Size_Variant || !this.Color_Variant){
      this.toastService.failed("Please fill all data");
    }
    if( this.Quantity <= this.avilableQuanityVal){
      //check to see if added product is already exist in store
      this.ordered_Products.push({
        Product:this.productCtrl.value,
        Size_Variant:this.Size_Variant,
        Color_Variant:this.Color_Variant,
        Quantity:this.Quantity,
        Total_Price: this.SellingPrice * this.Quantity,
        availableProductQuantity: this.avilableQuanityVal,
        cost: (this.StoreCost * this.Quantity)
      });
      this.TotalOrderAmount = this.TotalOrderAmount + (this.SellingPrice * this.Quantity);
      this.productForm.resetForm();
      this.products=[]
      this.Size_Variant = "";
      this.Color_Variant = "";
      this.Quantity = ""; 
      this.avilableQuanityVal = 0;
      this.SellingPrice = 0;
      this.StoreCost = 0;
    }
    else{
      this.toastService.failed("Avilable Quantity is not enough");
    }
  }

  deleteOrderedProduct(orderedProduct){
    console.log("orderedProduct",orderedProduct);
    // if the deleted product was already created when the user added the order for the very first time before editing it,then we need to decrease its pending quantity from store
    //we know that if the deleted product has the property leftProductQuantity;
    //if the deleted product doesnot have the property leftProductQuantity,that means this ordered product has just added in this form for the first time.
    if(orderedProduct.leftProductQuantity != null){
      let deletedProduct:any = {};
    deletedProduct.Color_Variant=orderedProduct.Color_Variant._id ;
    deletedProduct.Product=orderedProduct.Product._id ;
    deletedProduct.Size_Variant=orderedProduct.Size_Variant._id ;
    deletedProduct.Size_Variant=orderedProduct.Size_Variant._id ;
    if(orderedProduct.Store_StoragePlace)
    deletedProduct.Store_StoragePlace=orderedProduct.Store_StoragePlace._id ;
    deletedProduct.Quantity=orderedProduct.Quantity ;
    deletedProduct.Cost=orderedProduct.Cost ;
    deletedProduct.Total_Price = orderedProduct.Total_Price;
    let sellerMoneyDetails :any = {};
    sellerMoneyDetails.Order_AffiliateSellerRevenueAmount = this.Order_AffiliateSellerRevenueAmount
    sellerMoneyDetails.Order_AffiliateSellerRevenuePercentage = this.Order_AffiliateSellerRevenuePercentage

    this.orderService.deleteProductInOrder(deletedProduct,sellerMoneyDetails,this.id).subscribe((status) => {
      if(status==true){
        this.isLoading = false;
        this.ordered_Products.splice( this.ordered_Products.indexOf(orderedProduct), 1);
        this.TotalOrderAmount -=  orderedProduct.Total_Price;
        this.toastService.success("deleted Successfully");
      }
      else{
        this.isLoading = false;
        this.toastService.failed("Something went wrong,Please try again later!");
      }
      
    });
    }else{
      this.ordered_Products.splice( this.ordered_Products.indexOf(orderedProduct), 1);
      this.TotalOrderAmount -=  orderedProduct.Total_Price;
      this.toastService.success("deleted Successfully");
    }
    
  }

  onSubmit() {
    if(this.ordered_Products.length==0){
      this.toastService.failed("Please, Add at least one Product to Place the Order")
      return;
    }
    this.isLoading = true;
    if(this.customerCtrl.value._id){
      this.InsertIntoOrder(this.customerCtrl.value._id);
    }
    else{
      this.Customer_ShippingAddress.AddressName = "Defult Address";
      this.Customer_ShippingAddress.ContactName = this.CustomerName; 
      this.Customer_ShippingAddress.Mobile = this.customerCtrl.value;
      let CustomerData = {
        Customer_Name : this.CustomerName,
        Address : this.Customer_ShippingAddress,
        Customer_BillingAddress: this.Customer_ShippingAddress,
        Customer_ShippingAddress: this.Customer_ShippingAddress,
        Customer_Status: 1
      }
      this.orderService.addCustomer(CustomerData).subscribe((datafromServer:any)=>{
        if(datafromServer.status){
          this.InsertIntoOrder(datafromServer.CustomerID)
        }
        else{
          this.toastService.failed('error, can not insert new customer');
          this.isLoading = false;
        }
        
      })
    }
    
      //this.onClose();
    
  }
  InsertIntoOrder(CustomerID){
    let DataToSend :any={
      _id : this.id,// _id of the order document
      Order_Date : this.Order_Date,
      Order_Note : this.Order_Note,
      Order_Customer: CustomerID,
      Customer_Name : this.CustomerName,
      Customer_ShippingAddress : this.Customer_ShippingAddress,
      Order_AffiliateSeller:this.authService.currentUser._id,
      Order_TotalProductSellingAmount : 0, //will change after few lines
      Order_TotalProductCostAmount : 0, //will change after few lines
      Order_Products:[]
    }
    this.ordered_Products.forEach((element,index)=>{
      DataToSend.Order_Products.push({
        Product:element.Product._id,
        Size_Variant:element.Size_Variant._id,
        Color_Variant:element.Color_Variant._id,
        Quantity:element.Quantity,
        Cost:element.cost || element.Cost,
        Price:element.Total_Price,
        leftProductQuantity:element.leftProductQuantity //incase of editing
      });
      DataToSend.Order_TotalProductSellingAmount += DataToSend.Order_Products[index].Price;
      DataToSend.Order_TotalProductCostAmount += DataToSend.Order_Products[index].Cost;
    });
    this.orderService.editAffiliateSellerOrderByOrderId(
      DataToSend
    ).subscribe((status) => {
      if(status==true){
        this.isLoading = false;
        this.toastService.success("Updated Successfully");
        this.ordered_Products = [];
        this.Customer_ShippingAddress = {};
        this.customers = [];
        // this.CustomerName = "";
        // this.Order_Date = null;
        // this.Order_Note = "";
        // this.customerCtrl.value._id = null;
        this.orderForm.resetForm();
      }
      else{
        this.isLoading = false;
        this.toastService.failed("Something went wrong,Please try again later!");
      }
      
    });
  }
  changeProvince(){
    if(this.Customer_ShippingAddress.Province){
      var result = this.provinces.filter(obj => {
        return obj._id === this.Customer_ShippingAddress.Province;
      })
      this.ShippingFees = result[0].Province_DefaultShippingFees;
    }
    else{
      this.ShippingFees = null;
    }
  }
  

}
