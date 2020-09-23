import { AuthGuardService } from "./authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/components/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },
  {
    path: "authentication",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "order",
    loadChildren: () =>
      import("../app/components/order/order.module").then(
        m => m.OrderModule
      )
  },
  {
    path: "canceled-orders",
    loadChildren: () =>
      import("../app/components/canceled-orders/canceled-orders.module").then(
        m => m.CanceledOrdersModule
      )
  },
  {
    path: "returned-orders",
    loadChildren: () =>
      import("../app/components/returned-orders/returned-orders.module").then(
        m => m.ReturnedOrdersModule
      )
  },
  {
    path: "my-payments",
    loadChildren: () =>
      import("../app/components/my-payments/my-payments.module").then(
        m => m.MyPaymentsModule
      )
  },
  {
    path: "statistics",
    loadChildren: () =>
      import("../app/components/statistics/statistics.module").then(
        m => m.StatisticsModule
      )
  },
  {
    path: "product-gallery",
    loadChildren: () =>
      import("../app/components/product-gallery/product-gallery.module").then(
        m => m.ProductGalleryModule
      )
  },
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true
});
