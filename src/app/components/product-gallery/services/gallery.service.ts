import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) {
   }
 
   getAllProductsInStore() {
     return this.http.get(
       `${systemSettings.serverURL}/store/getAll`,
     );
   }

   getProductMedia(id) {
    return this.http.post(
      `${systemSettings.serverURL}/media/getOneById`,{ _id : id}
    );
  }

  getProducts() {
    return this.http.get(`${systemSettings.serverURL}/products/getAll`)
  }

  getSizes() {
    return this.http.get(`${systemSettings.serverURL}/sys-setup/sizes/getAllSizes`)
  }
  
  getColorVariants(){
    return this.http.get(`${systemSettings.serverURL}/sys-setup/colors/getAllProductColors`)
  }

  searchProductInStore (dataToSend){
    return this.http
      .post(`${systemSettings.serverURL}/store/searchProductInStore`, dataToSend)
  }
}

