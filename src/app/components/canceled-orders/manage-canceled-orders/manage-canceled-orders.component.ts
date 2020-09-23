import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { CanceledOrdersService } from '../services/canceled-orders.service';
import { ViewOrderDetailsComponent } from '../../shared/view-order-details/view-order-details.component';

@Component({
  selector: 'app-manage-canceled-orders',
  templateUrl: './manage-canceled-orders.component.html',
  styleUrls: ['./manage-canceled-orders.component.css']
})
export class ManageCanceledOrdersComponent implements OnInit {

  isLoading=true
  public orders;
  data;
  searchKey: string;
  searchDate:any={}
  displayedColumns: string[] = ["Code","Order Date", "Note","Total Product Selling Amount","Cancelation Note","Cancelation Reason","Customer Name","Customer Code", "Actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private canceledOrdersService: CanceledOrdersService
  ) {}

  ngOnInit() {
    this.initializeTable();
  }
  initializeTable() {
    this.canceledOrdersService.getAffiliateSellerCanceledOrders().subscribe((canceledOrders: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(canceledOrders);
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
    this.canceledOrdersService.getAffiliateSellerCanceledOrdersByDateFromTO({ searchDate: this.searchDate }).subscribe((orders: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(orders);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }
  searchOrderByCustomerMobile (){
    console.log("searchKey ",this.searchKey);
    this.canceledOrdersService.getFilteredCanceledOrdersByCustomerMobile({ Customer_Mobile: this.searchKey }).subscribe((orders: any) => {
      this.isLoading = false;
      this.orders = new MatTableDataSource(orders);
      this.orders.sort = this.sort;
      this.orders.paginator = this.paginator;
    });
  }

  viewOrderDetails(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = { title: "Order Details",id:element._id,Order_Code:element.Order_Code };

    let dalogRef=this.dialog.open(ViewOrderDetailsComponent, dialogConfig);
    dalogRef.afterClosed().subscribe((data)=>{
      this.initializeTable();
    })
  }
  /*
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
