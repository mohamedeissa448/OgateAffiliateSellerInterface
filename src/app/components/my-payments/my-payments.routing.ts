import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageMyPaymentsComponent } from './manage-my-payments/manage-my-payments.component';

const routes: Routes = [
  {
    path: "my-payments",
    children: [
      
      {
        path: "manage-my-payments",
        component:  ManageMyPaymentsComponent,
        data: { 
          title: "Ogat Reseller CP » Order » Manage My Payments", 
          PageTitle: "Manage My Payments", 
          Breadcrumb: 'My Payments'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
