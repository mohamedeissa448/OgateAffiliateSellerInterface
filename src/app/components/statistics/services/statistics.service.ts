import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../../../app-config"
import { map } from 'rxjs/operators';
import { AuthService } from '../../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient,private authService:AuthService) { 

  }
  getCountOfCanceledOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfCanceledOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
  }
  getCountOfReturnedOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfReturnedOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
  }
  getCountOfCollectedOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfCollectedOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
  }
  getCountOfShippedOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfShippedOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
  }
  getCountOfAllOrdersByAffiliateSellerId() {
    let id = this.authService.currentUser._id;
    return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfAllOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
  }
}
