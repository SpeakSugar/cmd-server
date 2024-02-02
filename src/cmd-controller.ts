import { Context } from "koa";
import { FileUtil, ProcessUtil } from "zion-common-utils";
import { GlobalVars } from "./global-vars";
import { homedir } from "os";
import * as fs from "fs";

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
                if (result.toLowerCase().includes(`arm`) || result.toLowerCase().includes(`snapdragon`)) {
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

    onFileRequest = async (ctx: any) => {
        const file = ctx.request.files.file;
        const destDir = `${homedir}/cmd-server/file`;
        if (!await FileUtil.isExist(destDir)) {
            await fs.promises.mkdir(destDir, { recursive: true });
        }
        await new Promise((resolve, reject) => {
            const reader = fs.createReadStream(file.filepath);
            const stream = fs.createWriteStream(`${destDir}/${file.originalFilename}`);
            reader.pipe(stream);
            stream.on('error', (err) => {
                stream.close();
                reject(err);
            });
            stream.on('finish', () => resolve(`finish`));
        });
        ctx.status = 200;
    }

}
