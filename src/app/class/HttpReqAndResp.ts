import {HttpHeaders} from '@angular/common/http';

export class RequestObj {
    path: string;
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
    date: number;

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
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}
