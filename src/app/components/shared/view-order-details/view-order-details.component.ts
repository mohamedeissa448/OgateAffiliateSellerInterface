import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../authentication/services/auth.service';
import { ViewOrderDetailsService } from '../services/view-order-details.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css']
})
export class ViewOrderDetailsComponent implements OnInit {

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
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productCtrl = new FormControl();
  customerCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  filteredCustomers: Observable<string[]>;
  products: string[] = [];
  allProducts: any[] = [];
  customers: string[] = [];
  allCustomers: any[] = [];
  Customer_ShippingAddress:any= {}
  colorVariants:any=[];
  sizeVariants:any=[];
  provinces:any=[];
  users:any=[];
  id;
  title;
  Order_InvntoryHandlingAssignedTo:any={}
  //
  @ViewChild("productInput",{static: false}) productInput: ElementRef;
  @ViewChild("customerInput",{static: false}) customerInput: ElementRef;

  constructor(
    public authService: AuthService,
    public viewOrderDetailsService: ViewOrderDetailsService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ViewOrderDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    this.title = data.title;
    this.id=data.id
  }

  ngOnInit() {
    this.viewOrderDetailsService.getProducts().subscribe((products:any)=>{
      this.allProducts = products ;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.viewOrderDetailsService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    }) ;
    this.viewOrderDetailsService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    });
    this.viewOrderDetailsService.getProvinces().subscribe((response)=>{
      this.provinces=response;
    });
    this.viewOrderDetailsService.getCustomers().subscribe((response :any)=>{
      this.allCustomers=response;
      this.customerCtrl.valueChanges.subscribe(search => {
        this.filteredCustomers = of(this.allCustomers.filter(item =>
          item.Customer_Name.toLowerCase().includes(search)
        ));
      });
    });
    this.viewOrderDetailsService.getAllUsers().subscribe((response)=>{
      this.users=response;
    });

    //initialize form inputs 
      this.viewOrderDetailsService.getAffiliateSellerOrderById(this.id).subscribe((outereRsponse:any)=>{
        console.log("outereRsponse",outereRsponse);
        this.Order_InvntoryHandlingAssignedTo = outereRsponse.Order_InvntoryHandlingAssignedTo;
        this.Order_Date = outereRsponse.Order_Date;
        this.Order_Note = outereRsponse.Order_Note;
        this.Customer_ShippingAddress = outereRsponse.Customer_ShippingAddress;
        this.customers.push(outereRsponse.Order_Customer.Customer_Name+',Code('+outereRsponse.Order_Customer.Customer_Code+')');
        this.customerCtrl.setValue(outereRsponse.Order_Customer)
        this.customerInput.nativeElement.value = "";
          outereRsponse.Order_Products.forEach((element)=>{
          this.viewOrderDetailsService.getOneProductFromStore({
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
                //if it is a returned order,we initialize returned quantities column
        if(outereRsponse.Order_Return_Details.Return_Products.length >0){
          outereRsponse.Order_Return_Details.Return_Products.forEach((prod,index)=>{
            console.log("index",index)
            this.ordered_Products[index].returnedQuantity = prod.Quantity;
          })
        }
          }))
       
      
        });
       
        
        
      })
     
   
  }
 
  
 

  onSubmit() {
    let dataToSend = {_id: this.id, Order_InvntoryHandlingAssignedTo :this.Order_InvntoryHandlingAssignedTo}
    this.viewOrderDetailsService.assignOrderTo(dataToSend).subscribe((status)=>{
      if(status==true)
          this.notificationService.success(":: Assigned Task Successfully");
          else
          this.notificationService.failed(":: Something went wrong,Please try again later!");
    })
    this.onClose();
    
  }
  onClose() {
    this.dialogRef.close();
  }

}
