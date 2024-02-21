import { AxiosUtil } from "zion-common-utils";

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
})
