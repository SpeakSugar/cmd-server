#!/usr/bin/env node

import { startCmdServer } from "./start-server";
import yargs from "yargs";
import { NetUtil, RetryUtil } from "zion-common-utils";

main().catch(err => {
    console.error("main() exception", err)
});

async function main() {
    let argv = yargs(process.argv.slice(2))
        .option('port', {
            type: 'string',
            description: 'start server with custom port'
        })
        .option('passwd', {
            type: 'string',
            description: 'access server with password'
        }).argv;

    await RetryUtil.retry(async () => {
        const isConnected = await NetUtil.isConnected(`https://www.baidu.com`);
        if (!isConnected) {
            throw new Error(`Can't connect to www.baidu.com`);
        }
    }, { timeout: 5 * 60e3 });

    await startCmdServer(argv.port as string, argv.passwd as string);
}
