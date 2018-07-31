
const {spawn} = require('child_process').spawn;
const {IpfsProcess} = require('../dist');
const path = require('path');
const os = require('os');
const fs = require('fs');

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

  it('should change directory', done => {
  	const platform = os.platform();
  	fs.copyFileSync(
  		path.join(__dirname, '..', 'bin', os.platform(), os.arch(), (platform === 'win32')? 'ipfs.exe' : 'ipfs'),
		  path.join(__dirname, (platform === 'win32')?  'ipfs.exe' : 'ipfs')
	  );

    IpfsProcess.setIpfsPath(path.join(__dirname, 'ipfs'));
	  const p = new IpfsProcess('./.testipfs');
	  p.on('start', () => {
		  p.kill();

		  fs.unlinkSync(path.join(__dirname, (platform === 'win32')? 'ipfs.exe' : 'ipfs'));
		  done();
	  });
	  p.run();
  })
});