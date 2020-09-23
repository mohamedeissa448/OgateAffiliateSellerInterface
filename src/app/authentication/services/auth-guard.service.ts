import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  //check if user is logged in or not
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot
  ): boolean {
    if (this.authService.isLogedIn()) return true;
    this.router.navigate(["/authentication/page-login"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
