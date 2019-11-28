import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIndexComponent } from './a-index.component';

describe('AIndexComponent', () => {
  let component: AIndexComponent;
  let fixture: ComponentFixture<AIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
