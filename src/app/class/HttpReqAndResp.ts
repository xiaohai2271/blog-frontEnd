import {HttpHeaders} from '@angular/common/http';

export class RequestObj {
    path: string;
    url?: string; // 仅在httpService里面进行使用
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: {};
    contentType?: 'application/json' | 'application/x-www-form-urlencoded';
    queryParam?: {};
    header?: HttpHeaders | {
        [header: string]: string | string[];
    };
}

export class Response<T> {
    code: number;
    msg: string;
    result: T;

    constructor(t: T) {
        this.code = 0;
        this.result = t;
    }
}

export class PageList<T> {
    total: number;
    list: T[];
    pageNum: number;
    pageSize: number;
}
