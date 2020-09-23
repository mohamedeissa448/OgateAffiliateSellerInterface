import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderFormComponent } from './order-form/order-form.component';

const routes: Routes = [
  {
    path: "order",
    children: [
      
      {
        path: "manage-order",
        component: ManageOrdersComponent ,
        data: { 
          title: "Ogat Reseller CP » Order » Manage Order", 
          PageTitle: "Manage Order", 
          Breadcrumb: 'Order'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      {
        path: "add-order",
        component: OrderFormComponent ,
        data: { 
          title: "RxP CMS Manager »Order » Add Order", 
          PageTitle: "Add Order", 
          Breadcrumb: 'Order'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      }
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
