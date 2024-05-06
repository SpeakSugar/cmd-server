import { AxiosUtil } from "zion-common-utils";
import * as path from "path";
import * as fs from "fs";
import * as FormData from "form-data";

it(`onCmdRequest`, async () => {
    const result = (await AxiosUtil.request({
        url: `http://127.0.0.1:7777/cmd`,
        data: {
            cmd: `echo hello`,
        },
        method: "POST",
        params: {
            passwd: `123456`
        }
    })).data;
    console.log(result);
});

it(`onFileRequest`, async () => {
    const filePath = `/Users/jeffries.yu/IdeaProjects/zion-py-lib.zip`;
    const fileName = path.basename(filePath);
    const fileData = fs.readFileSync(filePath);
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    formData.append('dest', `$HOME/cmd-server`);
    await AxiosUtil.request({
        url: `http://127.0.0.1:7777/file`,
        method: 'post',
        headers: { ...formData.getHeaders() },
        data: formData
    });
});
