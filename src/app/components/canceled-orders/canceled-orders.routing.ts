import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageCanceledOrdersComponent } from './manage-canceled-orders/manage-canceled-orders.component';

const routes: Routes = [
  {
    path: "canceled-orders",
    children: [
      
      {
        path: "manage-canceled-orders",
        component: ManageCanceledOrdersComponent ,
        data: { 
          title: "Ogat Reseller CP » Order » Manage Canceled Orders", 
          PageTitle: "Manage Canceled Orders", 
          Breadcrumb: 'Canceled Orders'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
