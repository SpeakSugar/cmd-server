import * as Router from "@koa/router";
import { CmdController } from "./cmd-controller";

export class CmdRouter {

    public static init(): Router {
        const cmdController = new CmdController();
        const router = new Router();
        router.post('/cmd', cmdController.onCmdRequest);
        return router;
    }

}
