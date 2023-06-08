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

### client request
```typescript
import axios from "axios";

const version = (await axios.request({
    url: `http://${ip}:7777/version`,
    method: 'get',
    timeout: 10e3,
})).data

const arch = (await axios.request({
    url: `http://${ip}:7777/arch`,
    method: 'get',
    timeout: 10e3,
})).data
console.log(arch); // arch = intel / arm

const os = (await axios.request({
    url: `http://${ip}:7777/os`,
    method: 'get',
    timeout: 10e3,
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
})).data;
console.log(data);

```
