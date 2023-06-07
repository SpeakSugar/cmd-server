import { Context } from "koa";
import { ProcessUtil } from "zion-common-utils";
import { GlobalVars } from "./global-vars";

export class CmdController {

    onGetVersionRequest = async (ctx: Context, next: () => Promise<any>) => {
        ctx.status = 200;
        ctx.body = GlobalVars.version
    }

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

    onGetArchRequest = async (ctx: Context, next: () => Promise<any>) => {
        const arch = process.arch;
        const platform = process.platform
        if (platform == "win32") {
            try {
                let result = await ProcessUtil.exec(`wmic cpu get Name`);
                if (result.toLowerCase().includes(`arm`) || result.toLowerCase().includes(`Snapdragon`)) {
                    ctx.status = 200;
                    ctx.body = "arm";
                } else {
                    ctx.status = 200;
                    ctx.body = "intel";
                }
            } catch (e) {
                return "intel";
            }
        } else {
            if (arch.includes("arm") || arch.includes("ia32")) {
                ctx.status = 200;
                ctx.body = "arm";
            } else {
                ctx.status = 200;
                ctx.body = "intel";
            }
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
            ctx.body = `[cmd-server ${GlobalVars.ip}] ${e.message}`
        }
    }

}
