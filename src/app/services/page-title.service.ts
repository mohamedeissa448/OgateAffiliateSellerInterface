import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private PageTitle =  new BehaviorSubject('Home');
  private PageSubTitle =  new BehaviorSubject('Home');

  currentPageTitle = this.PageTitle.asObservable();
  currentPageSubTitle = this.PageSubTitle.asObservable();

  constructor() { }


  ChangePageTitle (Title: string,Breadcrumb: string ){
    this.PageTitle.next(Title);
    this.PageSubTitle.next(Breadcrumb);
  }
  ChangePageTitleOnly (Title: string ){
    this.PageTitle.next(Title);
  }
}
