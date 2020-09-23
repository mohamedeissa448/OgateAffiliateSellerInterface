import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReturnedOrdersComponent } from './manage-returned-orders.component';

describe('ManageReturnedOrdersComponent', () => {
  let component: ManageReturnedOrdersComponent;
  let fixture: ComponentFixture<ManageReturnedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReturnedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReturnedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
