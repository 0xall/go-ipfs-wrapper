
const {spawn} = require('child_process').spawn;
const {IpfsProcess} = require('../dist');

describe("go-ipfs process", function() {

  // set timeout to 15 seconds because it generally takes over 2000ms to ready ipfs daemon.
  this.timeout(15000);

  it('should start ipfs process', done => {
    const p = new IpfsProcess('./.testipfs');
    p.on('start', () => {
      p.kill();
      done();
    });
    p.run();
  });
});