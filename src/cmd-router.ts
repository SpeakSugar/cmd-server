import * as Router from "@koa/router";
import { CmdController } from "./cmd-controller";
import KoaBody from "koa-body";

export class CmdRouter {

    public static init(): Router {
        const cmdController = new CmdController();
        const router = new Router();
        router.get('/version', cmdController.onGetVersionRequest)
        router.get('/os', cmdController.onGetOsRequest);
        router.get('/arch', cmdController.onGetArchRequest);
        router.post('/cmd', cmdController.onCmdRequest);
        router.post('/file', KoaBody({
            multipart: true,
            formidable: { keepExtensions: true, }
        }), cmdController.onFileRequest);
        return router;
    }

}
