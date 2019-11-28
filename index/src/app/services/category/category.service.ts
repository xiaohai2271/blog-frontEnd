import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Category} from '../../class/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpService) {
  }

  categories: Category[];

  getAllCategory() {
    const observable = this.http.get('/categories');
    observable.subscribe((data) => {
        if (data.code === 0) {
          this.categories = data.result;
        }
      }
    );
    return observable;
  }


}
