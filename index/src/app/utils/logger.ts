import {environment} from '../../environments/environment';

export class Logger {

    private static inited = false;

    static info(obj: object) {
        this.printLogInfo();
        if (environment.logger) {
            // tslint:disable-next-line:no-console
            console.info(obj);
        }
    }

    static debug(obj: object) {
        this.printLogInfo();
        if (environment.logger) {
            // tslint:disable-next-line:no-console
            console.debug(obj);
        }
    }

    static error(obj: object) {
        this.printLogInfo();
        if (environment.logger) {
            // tslint:disable-next-line:no-console
            console.error(obj);
        }
    }

    static printLogInfo() {
        const option = {
            environment: environment.production ? 'release' : 'debug',
        };
        if (!this.inited) {
            // tslint:disable-next-line:no-console
            console.info(option);
            this.inited = true;
        }
    }

}
