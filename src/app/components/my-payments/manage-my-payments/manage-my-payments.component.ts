import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { MyPaymentsService } from '../services/my-payments.service';

@Component({
  selector: 'app-manage-my-payments',
  templateUrl: './manage-my-payments.component.html',
  styleUrls: ['./manage-my-payments.component.css']
})
export class ManageMyPaymentsComponent implements OnInit {

  isLoading=true
  public orders;
  data;
  searchKey: string;
  searchDate:any={}
  displayedColumns: string[] = ["Payment Date", "Payment_PaidAmount","Payment_PaidMethod","Payment_PaymentRefranceNumber","Payment_PaymentExtraDetails","Payment_PaidByUser", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private myPaymentsService: MyPaymentsService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.myPaymentsService.getAffiliateSellerPaymentsByID().subscribe((myPayments: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(myPayments.AffiliateSeller_PaymentLog);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }
 /* onAdd() {
    //this.orderService.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Add New Order" };
    let dalogRef=this.dialog.open(OrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  onEdit(element) {
  
    //this.orderService.popualteForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    dialogConfig.data = { title: "Edit An Order",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(OrderFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }*/

  onSearchClear() {
    this.searchKey = "";
    //this.applyFilter();
  }
  /*applyFilter() {
    this.orders.filter = this.searchKey.trim().toLowerCase();
  }*/
  searchdataByDates(){
    console.log("searchDate ",this.searchDate);
    this.myPaymentsService.getAffiliateSellerPaymentsFromDateTo({ searchDate: this.searchDate }).subscribe((payments: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(payments);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }
  searchOrderByCustomerMobile (){
    console.log("searchKey ",this.searchKey);
    this.myPaymentsService.getFilteredCanceledOrdersByCustomerMobile({ Customer_Mobile: this.searchKey }).subscribe((orders: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(orders);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }

 /* viewOrderDetails(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Order Details",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(ViewOrderDetailsComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  
  openShippingDetails(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Shipping Details",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(ShippingDetailsComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  openBillingAddress(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Customer's Billing Address",id:element._id,Order_Code:element.Order_Code,Customer_Name:element.Customer_Name };

    let dalogRef=this.dialog.open(BillingAddressFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }

  openShippingAddress(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Customer's Shipping Address",id:element._id,Order_Code:element.Order_Code,Customer_Name:element.Customer_Name };

    let dalogRef=this.dialog.open(ShippingAddressFormComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }*/



}
