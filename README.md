# Cmd-Server

## Introduction
use http to execute cmd on your remote machine

### Requirement
```
nodejs
```

### Installation
```bash
npm install -g zion-cmd-server
```

### server start / stop
```bash
sudo cmds # port: 7777 mac needs sudo

ctrl+c # end server 
```

```bash
sudo cmds --port 4396 # custom server port 
```

```bash 
sudo cmds --passwd 123456 # custom password, you can add it in request method
```

### client request
```typescript
import axios from "axios";

const version = (await axios.request({
    url: `http://${ip}:7777/version`,
    method: 'get',
    timeout: 10e3,
    params: {
        passwd: '123456'
    }
})).data

const arch = (await axios.request({
    url: `http://${ip}:7777/arch`,
    method: 'get',
    timeout: 10e3,
    params: {
        passwd: '123456'
    }
})).data
console.log(arch); // arch = intel / arm

const os = (await axios.request({
    url: `http://${ip}:7777/os`,
    method: 'get',
    timeout: 10e3,
    params: {
        passwd: '123456'
    }
})).data
console.log(os); // os = win / mac / linux

const data = (await axios.request({
    url: `http://${ip}:7777/cmd`,
    method: 'post',
    timeout: 10e3,
    data: {
        cmd: `ls`,
        timeout: 10e3
    },
    params: {
        passwd: '123456'
    }
})).data;
console.log(data);

import * as FormData from "form-data";

const filePath = `/Users/xxxxx/xxxxx/xxxxx.zip`;
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

```
