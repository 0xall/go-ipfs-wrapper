
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


## License
MIT