import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ViewImagesService {
  form: FormGroup;
  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      images: new FormControl("",[Validators.required]),
    })
   }
 
  getMedias() {
    // const headers = new HttpHeaders({
    //   Authorization: `bearer ${localStorage.getItem("token")}`
     //});
     return this.http.get(
       `${systemSettings.serverURL}/media/getAll`,
       //{ headers: headers }
     );
   }
}
