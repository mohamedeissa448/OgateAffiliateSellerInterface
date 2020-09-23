import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDisplayNameComponent } from './change-display-name.component';

describe('ChangeDisplayNameComponent', () => {
  let component: ChangeDisplayNameComponent;
  let fixture: ComponentFixture<ChangeDisplayNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDisplayNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
