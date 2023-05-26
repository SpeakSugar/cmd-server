import { Context } from "koa";
import { ProcessUtil } from "zion-common-utils";

export class CmdController {

    onGetOsRequest = async (ctx: Context, next: () => Promise<any>) => {
        const platform = process.platform
        if (platform == "win32") {
            ctx.status = 200;
            ctx.body = "win";
        } else if (platform == "darwin") {
            ctx.status = 200;
            ctx.body = "mac";
        } else {
            ctx.status = 200;
            ctx.body = "linux";
        }
    }

    onCmdRequest = async (ctx: Context, next: () => Promise<any>) => {
        const cmd: string = ctx.request.body.cmd;
        const timeout: number = ctx.request.body.timeout;
        try {
            const result = await ProcessUtil.exec(cmd, {
                timeout: timeout ? timeout : 70e3
            })
            ctx.status = 200;
            ctx.body = result;
        } catch (e) {
            console.error(e)
            ctx.status = 500;
            ctx.body = e.message
        }
    }

}
