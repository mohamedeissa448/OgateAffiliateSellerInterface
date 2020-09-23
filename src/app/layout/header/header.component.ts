import { AuthService } from "./../../authentication/services/auth.service";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from "@angular/core";
import{ PageTitleService } from "../../services/page-title.service";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { ThemeService } from "../../services/theme.service";
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  providers: [NgbDropdownConfig]
})
export class HeaderComponent implements OnInit {
  
  @Input() showNotifMenu: boolean = false;
  @Input() showToggleMenu: boolean = false;
  @Input() darkClass: string = "";
  @Output() toggleSettingDropMenuEvent = new EventEmitter();
  @Output() toggleNotificationDropMenuEvent = new EventEmitter();

  public sidebarVisible: boolean = true;
  PageName: any;
  PageSubName: any;
  constructor(
    private authService: AuthService,
    private PageTitle:PageTitleService ,
    private config: NgbDropdownConfig,
    private themeService: ThemeService,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {
    config.placement = "bottom-right";
  }
  
  ngOnInit() {
    this.PageTitle.currentPageSubTitle.subscribe(subTitle => this.PageSubName = subTitle);
    this.PageTitle.currentPageTitle.subscribe(pageName => this.PageName = pageName);
    
  }
  
  toggleSettingDropMenu() {
    this.toggleSettingDropMenuEvent.emit();
  }

  toggleNotificationDropMenu() {
    this.toggleNotificationDropMenuEvent.emit();
  }

  toggleSideMenu() {
    this.themeService.showHideMenu();
  }
  toggleFullWidth() {
    this.sidebarService.toggle();
    this.sidebarVisible = this.sidebarService.getStatus();
    this.cdr.detectChanges();
  }

}
