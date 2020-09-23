import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./index/index.component";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuardService],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        children: [
          { path: "", redirectTo: "index", pathMatch: "full" },
          {
            path: "index",
            component: DashboardComponent,
            data: { title: "Ogat Reseller CP » Dashboard" }
          }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
