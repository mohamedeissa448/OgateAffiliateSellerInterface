import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { systemSettings } from "../app-config"
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public sidebarVisible: boolean = true;
	public currentSelectedMainMenu: any ="";
	public currentSelectedSubMenu: any ="";
	constructor(private http: HttpClient,private authService:AuthService) { }

	toggle() {
		this.sidebarVisible = !this.sidebarVisible;
	}

	getStatus() {
		return this.sidebarVisible;
	}
	setcurrentSelectedMainMenu(menuName: any){
		this.currentSelectedMainMenu = menuName;
	}
	getcurrentSelectedMainMenu(){
		return this.currentSelectedMainMenu;
	}
	setcurrentSelectedSubMenu(submenuName: any){
		this.currentSelectedSubMenu = submenuName;
	}
	getcurrentSelectedSubMenu(){
		return this.currentSelectedSubMenu;
	}
	/************** for statistics */
	getCountOfAllOrdersByAffiliateSellerId() {
		let id = this.authService.currentUser._id;
		return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfAllOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
	}

	getCountOfReturnedOrdersByAffiliateSellerId() {
		let id = this.authService.currentUser._id;
		return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getCountOfReturnedOrdersByAffiliateSellerId`,{Order_AffiliateSeller:id})
	}

	getAffiliateSellerBalance() {
		let id = this.authService.currentUser._id;
		return this.http.post(`${systemSettings.serverURL}/affiliateSellers/getAffiliateSellerBalance`,{_id:id})
	}

	
}
