import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerSitesComponent } from './partner-sites.component';

describe('PartnerSitesComponent', () => {
  let component: PartnerSitesComponent;
  let fixture: ComponentFixture<PartnerSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
