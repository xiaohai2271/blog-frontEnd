import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveMsgComponent } from './leave-msg.component';

describe('LeaveMsgComponent', () => {
  let component: LeaveMsgComponent;
  let fixture: ComponentFixture<LeaveMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
