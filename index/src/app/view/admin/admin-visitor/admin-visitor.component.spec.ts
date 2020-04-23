import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisitorComponent } from './admin-visitor.component';

describe('AdminVisitorComponent', () => {
  let component: AdminVisitorComponent;
  let fixture: ComponentFixture<AdminVisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
