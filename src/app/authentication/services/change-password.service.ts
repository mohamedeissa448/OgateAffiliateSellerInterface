import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }
  changeMyPassword(dataToSend){
    return this.http
      .post(`${systemSettings.serverURL}/AffiliateSellers/changeMyPassword`,dataToSend)
      .pipe(
        map((response: any) => {
          if (response.message == true) return true;
          return false;
        })
      );    
  }
}
