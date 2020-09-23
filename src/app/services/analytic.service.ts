import { AuthService } from "../authentication/services/auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { systemSettings } from "../app-config";
import { Subject } from 'rxjs'

@Injectable({
  providedIn: "root"
})
export class AnalyticService {

  private UserMiniData = new Subject(); 

  currentUserMiniData = this.UserMiniData.asObservable();
  

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserMiniData() {
    this.http.post(`${systemSettings.serverURL}/GetTasksByUserID`,{
      Task_AssignTo_Employee_Code:this.authService.currentUser.User_Code //assume that token includes _id property
    }).subscribe((res:any) => {
      this.UserMiniData.next({MiniData: [res.message[0].Pending,res.message[1].Finished]});
    });
  }
  
}
