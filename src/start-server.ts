import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser"
import { Server } from "http";
import { CmdRouter } from "./cmd-router";
import { GlobalVars } from "./global-vars";
import { ProcessUtil } from "zion-common-utils";

export async function startCmdServer(port?: string, passwd?: string) {

    await GlobalVars.init(passwd);

    // macos self check
    if (process.platform == 'darwin') {
        await ProcessUtil.exec(`ls ~/Downloads`);
    }

    const cmdRouter = CmdRouter.init();
    const app = new Koa();
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            ctx.status = 500;
            ctx.body = `controller error, ${e.message}`;
        }
    });
    app.use(async (ctx, next) => {
        if (GlobalVars.passwd && String(ctx.request.query.passwd) != GlobalVars.passwd) {
            ctx.status = 500;
            ctx.body = `wrong passwd`
        } else {
            await next();
        }
    });
    app
        .use(bodyparser())
        .use(cmdRouter.routes())
        .use(cmdRouter.allowedMethods())

    let server: Server = await new Promise((resolve, reject) => {
        const server = app.listen(port ? Number(port) : 7777, '0.0.0.0', () => {
            console.info(`cmd-server is starting at port ${port ? Number(port) : 7777}`);
            resolve(server);
        });
    });

    server.keepAliveTimeout = 60e3;
    server.headersTimeout = 60e3 + 1e3;
}
