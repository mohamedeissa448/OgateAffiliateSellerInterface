import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyPaymentsComponent } from './manage-my-payments.component';

describe('ManageMyPaymentsComponent', () => {
  let component: ManageMyPaymentsComponent;
  let fixture: ComponentFixture<ManageMyPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMyPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
