import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser"
import { Server } from "http";
import { CmdRouter } from "./cmd-router";
import { GlobalVars } from "./global-vars";

export async function startCmdServer() {

    await GlobalVars.init()

    const cmdRouter = CmdRouter.init();
    const app = new Koa();
    app
        .use(bodyparser())
        .use(cmdRouter.routes())
        .use(cmdRouter.allowedMethods())
        .use(async (ctx, next) => {
            try {
                await next();
            } catch (e) {
                ctx.status = 500;
                ctx.body = `controller error, ${e.message}`;
            }
        });

    let server: Server = await new Promise((resolve, reject) => {
        const server = app.listen(7777, '0.0.0.0', () => {
            console.info(`cmd-server is starting at port 7777`);
            resolve(server);
        });
    });

    server.keepAliveTimeout = 60e3;
    server.headersTimeout = 60e3 + 1e3;
}
