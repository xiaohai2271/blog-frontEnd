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
