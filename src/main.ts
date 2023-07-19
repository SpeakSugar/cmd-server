#!/usr/bin/env node

import { startCmdServer } from "./start-server";
import yargs from "yargs";

main().catch(err => {
    console.error("main() exception", err)
});

async function main() {
    let argv = yargs(process.argv.slice(2))
        .option('port', {
            type: 'string',
            description: 'start server with custom port'
        }).argv;

    await startCmdServer(argv.port as string);
}
