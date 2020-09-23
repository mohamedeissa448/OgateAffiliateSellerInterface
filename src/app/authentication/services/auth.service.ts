import { Injectable } from "@angular/core";
import { systemSettings } from "../../app-config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  logIn(credentials) {
    return this.http
      .post(`${systemSettings.serverURL}/affiliateSellers/login`, credentials)//login
      .pipe(
        map((response: any) => {
          /*{
            "roles": ["sys-setup","other"],
            "name": "Wael",
            "iat": 1516239022
          }*/
          // response.token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJzeXMtc2V0dXAiLCJvdGhlciJdLCJuYW1lIjoiV2FlbCIsImlhdCI6MTUxNjIzOTAyMn0.5GfiS-NhqP3QGFoqStpKY4zHoV0HP_Zq2th3LBVePJY";
          if (response && response.status != false) {
            console.log(response);
            localStorage.setItem("affiliateSellerToken", JSON.stringify(response));
           // localStorage.setItem("LogedInUser",JSON.stringify(response.user));
            return true;
          }
          return false;
        })
      );
  }
  logOut() {
    this.router.navigate(["authentication/page-login"]);
    localStorage.removeItem("affiliateSellerToken");
  }
  isLogedIn() {
   // let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem("affiliateSellerToken");
    if (!token) return false;
    return true
   // return !jwtHelper.isTokenExpired(token);
  }
  get currentUser():any {
    let token = localStorage.getItem("affiliateSellerToken");
    if (!token) return null;
    return (JSON.parse(token));
  }
}
