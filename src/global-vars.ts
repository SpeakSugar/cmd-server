import { NetUtil, RetryUtil } from "zion-common-utils";

export class GlobalVars {

    public static version: string = require('../../package.json').version;

    public static ip: string;

    public static async init() {
        this.ip =  await RetryUtil.retry(() => {
            return NetUtil.getLocalIp()
        }, { timeout: 2 * 60e3 });
    }

}
