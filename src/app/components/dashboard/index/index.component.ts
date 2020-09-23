import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { PageTitleService } from "../../../services/page-title.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

    constructor(private toastr: ToastrService,private PageTitle: PageTitleService) {
        
    }
    
    ngOnInit() {
        let that = this;
        this.PageTitle.ChangePageTitle('Dashboard','Home');
    }

    ngOnDestroy(){
    }

}
