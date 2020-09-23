import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChangeDisplayNameComponent } from '../change-display-name/change-display-name.component';
import { ChangeEmailComponent } from '../change-email/change-email.component';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnDestroy {

	@Input() sidebarVisible: boolean = true;
	@Input() navTab: string = "menu";
	@Input() currentActiveMenu;
	@Input() currentActiveSubMenu;
	@Output() changeNavTabEvent = new EventEmitter();
	@Output() activeInactiveMenuEvent = new EventEmitter();
    public themeClass: string = "theme-blue";
    public darkClass: string = "";
	private ngUnsubscribe = new Subject();
	AffiliateSeller_DisplayName: any = "";
	AffiliateSeller_Email: any = "";
	// for statistics
	numOfReturnedOrders:any = 0 ;
	numOfAllOrders:any = 0 ;
	percentageOfReturnedOrders :any = 0 ;
	affiliateSellerBalance : any = 0 ;

	constructor(private themeService: ThemeService,
		public authService:AuthService,
		private dialog: MatDialog,
		private router : Router,
		private sidebarService :SidebarService
	) {
		this.AffiliateSeller_DisplayName =this.authService.currentUser.AffiliateSeller_DisplayName;
		this.AffiliateSeller_Email =this.authService.currentUser.AffiliateSeller_Email;
        this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
			this.themeClass = themeClass;
        });
        this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
            this.darkClass = darkClass;
		});
		//for statistics
		this.sidebarService.getCountOfReturnedOrdersByAffiliateSellerId().subscribe((response:any)=>{
			if(response.message == true)
			  this.numOfReturnedOrders = response.count ;
			this.sidebarService.getCountOfAllOrdersByAffiliateSellerId().subscribe((response:any)=>{
				if(response.message == true){
					this.numOfAllOrders = response.count ;
					this.percentageOfReturnedOrders = this.numOfReturnedOrders / this.numOfAllOrders * 100 ;  
				}
				 
			});   
		});
		this.sidebarService.getAffiliateSellerBalance().subscribe((response:any) =>{
			if( response.message == true ){
				response.AffiliateSeller_PaymentLog.forEach((payment)=>{
					this.affiliateSellerBalance += payment.Payment_PaidAmount ;
				})
			}
		});
    }
    
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

	changeNavTab(tab: string) {
		this.navTab = tab;
	}

	activeInactiveMenu(menuItem: string) {
		this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	}

	changeTheme(theme:string){
		this.themeService.themeChange(theme);
    }
    
    changeDarkMode(darkClass: string) {
        this.themeService.changeDarkMode(darkClass);
	}
	
	changeDisplayName(){
		console.log("clicked")
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width = "80%";
		dialogConfig.data = { title: "Change Display Name", AffiliateSeller_DisplayName :this.authService.currentUser.AffiliateSeller_DisplayName };

		let dalogRef=this.dialog.open(ChangeDisplayNameComponent, dialogConfig);
		dalogRef.afterClosed().subscribe((data)=>{
			console.log("data",data)
			//this.authService.currentUser.AffiliateSeller_DisplayName = data.AffiliateSeller_DisplayName;
			if(data && data.AffiliateSeller_DisplayName)
			this.AffiliateSeller_DisplayName = data.AffiliateSeller_DisplayName;
			this.router.navigate(["authentication/page-login"]);

		})
	}

	changeEmail(){
		console.log("clicked")
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width = "80%";
		dialogConfig.data = { title: "Change Email", AffiliateSeller_Email :this.authService.currentUser.AffiliateSeller_Email };

		let dalogRef=this.dialog.open(ChangeEmailComponent, dialogConfig);
		dalogRef.afterClosed().subscribe((data)=>{
			console.log("data",data)
			//this.authService.currentUser.AffiliateSeller_Email = data.AffiliateSeller_Email;
			if(data && data.AffiliateSeller_Email)
			this.AffiliateSeller_Email = data.AffiliateSeller_Email;
			this.router.navigate(["authentication/page-login"]);

		})
	}

	changePassword(){
		console.log("clicked")
		const dialogConfig = new MatDialogConfig();
		dialogConfig.autoFocus = true;
		dialogConfig.width = "80%";
		dialogConfig.data = { title: "Change Password" };

		let dalogRef=this.dialog.open(ChangePasswordComponent, dialogConfig);
		dalogRef.afterClosed().subscribe((data)=>{
			console.log("data",data)
			if(data && data.updated)
			this.router.navigate(["authentication/page-login"]);

		})
	}
}
