import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailCardComponent } from './article-detail-card.component';

describe('ArticleDetailCardComponent', () => {
  let component: ArticleDetailCardComponent;
  let fixture: ComponentFixture<ArticleDetailCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
