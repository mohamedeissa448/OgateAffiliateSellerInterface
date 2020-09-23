import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCanceledOrdersComponent } from './manage-canceled-orders.component';

describe('ManageCanceledOrdersComponent', () => {
  let component: ManageCanceledOrdersComponent;
  let fixture: ComponentFixture<ManageCanceledOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCanceledOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCanceledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
