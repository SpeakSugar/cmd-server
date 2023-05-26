#!/usr/bin/env node

import { startCmdServer } from "./start-server";

main().catch(err => {
    console.error("main() exception", err)
});

async function main() {
    await startCmdServer();
}
