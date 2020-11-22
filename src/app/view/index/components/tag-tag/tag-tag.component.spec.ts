import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TagTagComponent} from './tag-tag.component';

describe('TagTagComponent', () => {
    let component: TagTagComponent;
    let fixture: ComponentFixture<TagTagComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagTagComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TagTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
