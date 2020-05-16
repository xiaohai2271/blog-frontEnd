import {Observable, of} from 'rxjs';
import {PageList} from '../class/HttpReqAndResp';

/**
 * 判断 一个Page<any>[] 中是否存在一条已查询的数据
 * @param pageNum 页码
 * @param pageSize 单页数量
 * @param pageList 源数据
 * @return 未查到：null  查到：该条数据
 */
export function exist<T>(pageNum: number, pageSize: number, pageList: PageList<any>[]): Observable<PageList<T>> | null {
    if (pageList === undefined || pageList == null || pageList.length === 0) {
        return null;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < pageList.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (pageList[i].pageNum == pageNum && pageList[i].pageSize == pageSize) {
            const ob: Observable<PageList<T>> = new Observable(o => {
                o.next(pageList[i]);
                o.complete();
            })
        }
    }
    return null;
}
