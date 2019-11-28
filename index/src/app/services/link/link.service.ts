import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(public http: HttpService) {
  }

  public Links: { id: number, name: string, url: string };

  apply(link: {
    name: string,
    url: string
  }) {
    return this.http.post('/apply', link, false);
  }

  getLinks() {
    this.http.get('/links').subscribe(data => {
      if (data.code === 0) {
        this.Links = data.result;
      }
    });
  }
}
