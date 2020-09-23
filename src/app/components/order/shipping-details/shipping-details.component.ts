import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { AuthService } from '../../../authentication/services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

  title:any = "";
  id:any = "";
  isOrderShipped:boolean = false;
  shipped_company_name:any = "";
  Order_ShippingWaybill:any = "";
  Shipping_TrakingURL: any = "";

  constructor(public authService: AuthService,
    public orderService: OrderService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ShippingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {
      this.title = data.title;
      this.id=data.id
     }

  ngOnInit() {
    this.orderService.getOrderShippingDetailsById({ _id: this.id}).subscribe((response:any)=>{
      if(response.Order_Status == 'Shipped'){
        this.isOrderShipped = true;
        this.shipped_company_name = response.Order_ShippingCompany.ShippingCompany_Name ;
        this.Order_ShippingWaybill = response.Order_ShippingWaybill ;
        this.Shipping_TrakingURL = response.Order_ShippingCompany.ShippingCompany_TrakingURL + response.Order_ShippingWaybill;
        console.log(this.Shipping_TrakingURL)
      }
    })
  }
 
  onClose() {
    this.dialogRef.close();
  }
  
}
