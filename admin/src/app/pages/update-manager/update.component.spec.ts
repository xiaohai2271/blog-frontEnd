import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagerComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateManagerComponent;
  let fixture: ComponentFixture<UpdateManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateManagerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
