import {Component, OnInit} from '@angular/core';
import {Router, NavigationError} from '@angular/router';
import {Location} from '@angular/common';

import {filter} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(router: Router, location: Location, private titleService: Title) {
    titleService.setTitle('小海博客|404');
    router.events.pipe(
      filter(event => event instanceof NavigationError)
    ).subscribe((event: NavigationError) => {
      router.navigate(['/404'], {skipLocationChange: true})
        .then(() => location.go(event.url));
    });
  }

  ngOnInit() {
  }

}
