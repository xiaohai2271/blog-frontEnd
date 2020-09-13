import {Component, OnInit} from '@angular/core';
import {ComponentStateService} from '../../services/component-state.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    constructor(public componentStateService: ComponentStateService) {
    }

    readonly gName: string = '何梦幻';
    readonly bName: string = '郑海';

    ngOnInit() {
    }

}
