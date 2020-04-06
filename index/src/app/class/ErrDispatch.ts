import {RequestObj} from './Request';

export interface ErrDispatch {
    errHandler(code: number, msg: string, request?: RequestObj): void;
}
