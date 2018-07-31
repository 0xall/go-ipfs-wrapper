
# go-ipfs-wrapper

This helps to execute go-ipfs in javascript.

## Install

This is available through npm.

```
npm install go-ipfs-wrapper --save
```

## Usage

To execute go-ipfs,

```typescript
import { IpfsProcess } from 'go-ipfs-wrapper';

const ipfs = new IpfsProcess('./.ipfs');

ipfs.on('start', () => console.log('go-ipfs is started!'));
ipfs.on('error', (err) => console.error(err));
ipfs.on('exit', (code) => console.log(`exit go-ipfs with code ${code}`))

ipfs.run();
```

To interact with go-ipfs, use [js-ipfs-api](https://github.com/ipfs/js-ipfs-api). 
Even you already use js-ipfs module, you can easily change to go-ipfs since the interface
for interacting with go-ipfs or js-ipfs in javascript is the same.

```typescript
import { IpfsProcess } from 'go-ipfs-wrapper';
import * as IpfsAPI from 'ipfs-api';

const ipfs = new IpfsProcess('./ipfs');

ipfs.on('start', () => {
  // ipfs-api should be used after start event emitted
  const api = IpfsAPI('localhost', '5001', {protocol: 'http'});
  
  // push test file to the IPFS network.
  // (same interface with js-ipfs using ipfs-api module)
  api.files.add({
    path: '/test.txt',
    content: 'hello, world!'
  });
});
```


## License
MIT