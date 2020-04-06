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
