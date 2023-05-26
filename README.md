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
cmds # port: 7777

ctrl+c # end server 
```

### client request
```typescript
import axios from "axios";

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
