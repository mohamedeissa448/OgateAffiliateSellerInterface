import { GalleryService } from './services/gallery.service';
import { systemSettings } from '../../app-config';
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';
import {  MatAutocompleteSelectedEvent,MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.css']
})
export class ProductGalleryComponent implements OnInit {
  allProducts :any = [];
  serverUrl   :any = "";
  Size_Variant :any = "";
  Color_Variant :any = "";
  colorVariants : any = [];
  sizeVariants : any = [];
  //for searches
  productIsFound :boolean =true ;
  //for product mat auto complete
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  productCtrl = new FormControl();
  filteredProducts: Observable<string[]>;
  allAutoCompleteProducts :any = [];
  products: string[] = [];
  @ViewChild("productInput",{static: false}) productInput: ElementRef;

  constructor(public galleryService : GalleryService) { }
  ngOnInit() {
    this.serverUrl = systemSettings.serverURL ;
    this.galleryService.getColorVariants().subscribe((response)=>{
      this.colorVariants=response;
    });
    this.galleryService.getSizes().subscribe((response)=>{
      this.sizeVariants=response;
    });
    //for product auto complete
    this.galleryService.getProducts().subscribe((products:any)=>{
      this.allAutoCompleteProducts = products ;
      this.productCtrl.valueChanges.subscribe(search => {
        this.filteredProducts = of(this.allAutoCompleteProducts.filter(item =>
          item.Product_Name.toLowerCase().includes(search)
        ));
      });
    });

    this.galleryService.getAllProductsInStore().subscribe((products:any)=>{
      products.forEach((product,index)=>{
        this.galleryService.getProductMedia(product.Store_Product.Product_DefaultImages_Media[0]).subscribe((response:any)=>{
          product.Media_SamllImageUrl = response.Media_SamllImageUrl;
          if(index == products.length - 1){
            this.allProducts = products

          }

        })
      });
    })
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
    const index = this.products.indexOf(fruit);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("event",event);
    
    if(this.products.length == 0){
      this.products.push(event.option.viewValue);
      this.productInput.nativeElement.value = "";
      //this.productCtrl.setValue(null);

    }
  
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAutoCompleteProducts.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
  searchProductInStore(){
    let dataToSend:any ={};
    if(this.productCtrl.value)
      dataToSend.Store_Product = this.productCtrl.value._id ;
    if(this.Size_Variant)
      dataToSend.Size_Variant = this.Size_Variant._id ;
    if(this.Color_Variant)
      dataToSend.Color_Variant = this.Color_Variant._id ; 
    //we make sure that at least one search field if filled,if it is not the case,we don't search.  
    if(dataToSend.Store_Product || dataToSend.Size_Variant || dataToSend.Color_Variant){
      this.galleryService.searchProductInStore(dataToSend).subscribe((response:any) =>{
        if(response.message == "No product is found"){
          this.productIsFound = false
        }else if (response.message == true){
          response.products.forEach((product,index)=>{
            this.galleryService.getProductMedia(product.Store_Product.Product_DefaultImages_Media[0]).subscribe((innerResponse:any)=>{
              product.Media_SamllImageUrl = innerResponse.Media_SamllImageUrl;
              if(index == response.products.length - 1){
                this.allProducts = response.products
    
              }
    
            })
          })
        }
      });
    }     
    
  }

}
