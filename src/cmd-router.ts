import * as Router from "@koa/router";
import { CmdController } from "./cmd-controller";

export class CmdRouter {

    public static init(): Router {
        const cmdController = new CmdController();
        const router = new Router();
        router.get('/version', cmdController.onGetVersionRequest)
        router.get('/os', cmdController.onGetOsRequest);
        router.get('/arch', cmdController.onGetArchRequest);
        router.post('/cmd', cmdController.onCmdRequest);
        return router;
    }

}
