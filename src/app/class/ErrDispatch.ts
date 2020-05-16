import {RequestObj} from './HttpReqAndResp';

export interface ErrDispatch {
    errHandler(code: number, msg: string, request?: RequestObj): void;
}
