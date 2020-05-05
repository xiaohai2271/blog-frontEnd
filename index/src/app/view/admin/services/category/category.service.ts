import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {Category} from '../../classes/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    // FIXME : ！！！！！！！！！！！！！！！！！！数据处理全部放到一个模块中！！！！！！！！！！！！！！！！！！
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

    update(submitBody: { id: number, name: string }) {
        return this.http.put('/admin/category/update', submitBody, false);
    }

    create(nameStr: string) {
        const observable = this.http.post('/admin/category/create', {name: nameStr}, false);
        observable.subscribe(data => {
            if (data.code === 0) {
                this.categories.push(data.result);
            }
        });
        return observable;
    }

    delete(id: number) {
        const observable = this.http.delete(`/admin/category/del?id=${id}`);
        observable.subscribe(data => {
            if (data.code === 0) {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].id === id) {
                        this.categories.splice(i, 1);
                    }
                }
            }
        });
        return observable;
    }

}
