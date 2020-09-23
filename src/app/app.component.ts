import { Component, AfterViewInit, OnInit, OnDestroy } from "@angular/core";
import { SidebarService } from "./services/sidebar.service";
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  Route,
  NavigationStart
} from "@angular/router";
import{ PageTitleService } from "./services/page-title.service";
import { ThemeService } from "./services/theme.service";
import { Title } from "@angular/platform-browser";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  public title = "Ogat Reseller CP";
  public isStopLoading: boolean = false;
  public showNotifMenu: boolean = false;
  public showToggleMenu: boolean = false;
  public navTab: string = "menu";
  public currentActiveMenu = "light";
  public currentActiveSubMenu;
  public themeClass: string = "theme-blue";
  public smallScreenMenu = "";
  public darkClass: string = "";
  private ngUnsubscribe = new Subject();
  isAuthenticated = false;
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private titleService: Title,
    private CustomPageTitle: PageTitleService
  ) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (event.url.includes("authentication")&&!event.url.includes("change-password")) this.isAuthenticated = true;
        else this.isAuthenticated = false;
      });
    this.activatedRoute.url
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(url => {
        this.isStopLoading = false;
        this.getActiveRoutes();
      });

    this.themeService.themeClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(themeClass => {
        this.themeClass = themeClass;
      });

    this.themeService.smallScreenMenuShow
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(showMenuClass => {
        this.smallScreenMenu = showMenuClass;
      });

    this.themeService.darkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(darkClass => {
        this.darkClass = darkClass;
      });
  }

  ngOnInit() {
    let that = this;
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        that.themeService.hideMenu();
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === "primary")
      .mergeMap(route => route.data)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(event => {
        this.titleService.setTitle(event["title"]);
        //this.CustomPageTitle.currentPageBreadCrumb.subscribe(event["Breadcrumb"]);
        this.CustomPageTitle.ChangePageTitle(event["PageTitle"],event["Breadcrumb"])
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleNotificationDropMenu() {
    this.showNotifMenu = !this.showNotifMenu;
  }

  toggleSettingDropMenu() {
    this.showToggleMenu = !this.showToggleMenu;
  }

  ngAfterViewInit() {
    let that = this;
    setTimeout(function() {
      that.isStopLoading = true;
    }, 1000);
  }

  getActiveRoutes() {
    let segments: Array<string>;
    if (this.router.url) segments = this.router.url.split("/");
    this.currentActiveMenu = segments[1];
    this.currentActiveSubMenu = segments[2];
    this.sidebarService.setcurrentSelectedMainMenu(segments[1]);
    let NameSegments: Array<string>;
    if (segments[2]) {
      NameSegments = segments[2].split("-");
      if (NameSegments[NameSegments.length - 1] != "index")
        this.sidebarService.setcurrentSelectedSubMenu(
          NameSegments[NameSegments.length - 1]
        );
      else this.sidebarService.setcurrentSelectedSubMenu("Dashboard");
    }
  }

  activeInactiveMenu($event) {
    console.log($event.item);
    if ($event.item && $event.item == this.currentActiveMenu) {
      this.currentActiveMenu = "";
    } else {
      this.currentActiveMenu = $event.item;
    }
  }
}
