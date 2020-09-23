import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageReturnedOrdersComponent } from './manage-returned-orders/manage-returned-orders.component';

const routes: Routes = [
  {
    path: "returned-orders",
    children: [
      
      {
        path: "manage-returned-orders",
        component: ManageReturnedOrdersComponent ,
        data: { 
          title: "Ogat Reseller CP » Order » Manage Returned Orders", 
          PageTitle: "Manage Returned Orders", 
          Breadcrumb: 'Returned Orders'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
