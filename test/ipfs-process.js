
const {spawn} = require('child_process').spawn;
const {IpfsProcess} = require('../dist');
const path = require('path');
const os = require('os');
const fs = require('fs');
const should = require('chai').should();

describe("go-ipfs process", function() {

  // set timeout to 15 seconds because it generally takes over 2000ms to ready ipfs daemon.
  this.timeout(30000);

  it('should start ipfs process', done => {
    const p = new IpfsProcess('./.testipfs');
    p.on('start', () => {
      p.kill();
      done();
    });
    p.run();
  });

  it('should emit acquire lock event', done => {
    const p1 = new IpfsProcess('./.testipfs');
    p1.on('start', () => {
      const p2 = new IpfsProcess('./.testipfs');
      p2.on('error', err => {
        err.should.be.equals(IpfsProcess.ERROR.CANNOT_ACQUIRE_LOCK);
        p1.kill();
        p2.kill();
        done();
      });

      p2.run();
    });

    p1.run();
  });
});