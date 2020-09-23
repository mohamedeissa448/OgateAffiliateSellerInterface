import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxGalleryModule } from "ngx-gallery";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";
//import * as $ from 'jquery';
import { from } from "rxjs";
//Ogat Modules
import { DashboardModule } from "./components/dashboard/dashboard.module";
import { OrderModule } from './components/order/order.module';
import { CanceledOrdersModule } from './components/canceled-orders/canceled-orders.module';
import { ReturnedOrdersModule } from './components/returned-orders/returned-orders.module';
import { ViewOrderDetailsComponent } from './components/shared/view-order-details/view-order-details.component';
import { MatDatepickerModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, MatSortModule, MatPaginatorModule, MatTableModule, MatIconModule, MatNativeDateModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule, MatProgressBarModule, MatCardModule, MatToolbarModule, MatSelectModule, MatChipsModule, MatSliderModule, MatAutocompleteModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPaymentsModule } from './components/my-payments/my-payments.module';
import { StatisticsModule } from './components/statistics/statistics.module';
import { ProductGalleryModule } from './components/product-gallery/product-gallery.module';
import { ItemSelectChangerDirective } from './directives/item-select-changer.directive';


@NgModule({
  declarations: [AppComponent, ViewOrderDetailsComponent,ItemSelectChangerDirective],
  imports: [
    BrowserModule,
    // Ogat Modules
    DashboardModule,
    OrderModule,
    CanceledOrdersModule,
    ReturnedOrdersModule,
    MyPaymentsModule,
    StatisticsModule,
    // end of Ogat Modules
    routing,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    NgxGalleryModule,
    ProductGalleryModule,
    //
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule, 
    MatSelectModule,
    MatChipsModule,
    MatSliderModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    ViewOrderDetailsComponent
  ]
})
export class AppModule {}
