import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ManageStatisticsComponent } from './manage-statistics/manage-statistics.component';

const routes: Routes = [
  {
    path: "statistics",
    children: [
      
      {
        path: "manage-statistics",
        component: ManageStatisticsComponent ,
        data: { 
          title: "Ogat Reseller CP » Order » Manage Statistics", 
          PageTitle: "Manage Statistics", 
          Breadcrumb: 'Statistics'
        },
        canActivate: [AuthGuardService, SysSetupAuthGuardService]
      },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
