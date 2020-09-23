import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ProductGalleryComponent } from './product-gallery.component';

const routes: Routes = [
  {
    path: "product-gallery",
    children: [
      {
        path: "manage-product-gallery",
        component: ProductGalleryComponent ,
        data: { 
          title: "Ogat Manager »Product Gallery » Product Gallery", 
          PageTitle: "Product Gallery", 
          Breadcrumb: 'Product Gallery'
        },
        canActivate: [AuthGuardService]
      }
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
