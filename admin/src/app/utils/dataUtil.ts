import {Page} from '../classes/page';
import {Observable, of} from 'rxjs';

/**
 * 判断 一个Page<any>[] 中是否存在一条已查询的数据
 * @param pageNum 页码
 * @param pageSize 单页数量
 * @param pageList 源数据
 * @return 未查到：null  查到：该条数据
 */
export function exist<T>(pageNum: number, pageSize: number, pageList: Page<any>[]): Observable<Page<T>> {
    if (pageList === undefined || pageList == null || pageList.length === 0) {
        return null;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < pageList.length; i++) {
        // tslint:disable-next-line:triple-equals
        if (pageList[i].pageNum == pageNum && pageList[i].pageSize == pageSize) {
            return of<Page<T>>(pageList[i]);
        }
    }
    return null;
}


/**
 * 将reqBody对象 转化为拼接到url上面的字符串
 * @param reqBody 请求体 from {a:xx,b:xxx}
 * @return      字符串        to ==> a=xx&b=xxx
 */
export function reqBody2Str(reqBody: object): string {
    let submitBody = '';
    for (const key in reqBody) {
        // 跳过值为null的参数请求
        if (reqBody[key] == null || reqBody[key] === 'null') {
            continue;
        }
        submitBody = submitBody + '&' + key + '=' + reqBody[key];
    }
    return submitBody.substring(1);
}

