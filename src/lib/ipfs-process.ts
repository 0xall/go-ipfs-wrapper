import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';
import { ipfsPath } from "./ipfs-config";
import { EventEmitter } from 'events';


export class IpfsProcess extends EventEmitter {
  private _daemon: ChildProcess = null;
  private static IpfsExecutablePath: string = ipfsPath;

  constructor(private _ipfsPath: string) {
    super();
  }

  static setIpfsPath(path: string): void {
    this.IpfsExecutablePath = path;
  }

  run(): void {
    this.kill();

    this._init()
      .then(() => {
      this._daemon = spawn(IpfsProcess.IpfsExecutablePath, ['daemon'], { env: this._localEnv });

      this._daemon.on('exit', (code) => this.emit('exit', code));
      this._daemon.on('error', err => this.emit('error', err));

      // if the process prints "Daemon is ready", it's now ready to interact with ipfs.
      let out = '';
      this._daemon.stdout.on('data', data => {
        out = out.concat(data.toString());
        if (out.indexOf('Daemon is ready') > 0) {
          this._daemon.stdout.removeAllListeners('data');
          this.emit('start');
        }
      });
    })
      .catch(err => this.emit('error', err));
  }

  kill(): void {
    if (this._daemon) {
      this._daemon.kill();
      this._daemon = null;
    }
  }

  private _init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!fs.existsSync(this._ipfsPath)) {
        // if ipfs directory does not exists,
        // create a new ipfs directory
        const ipfsProc = spawn(IpfsProcess.IpfsExecutablePath, ['init'], { env: this._localEnv });

        ipfsProc.on('exit', code => {
          if (code === 0) {
            // if success to initialize
            resolve();
          } else {
            // if failed to initialize
            ipfsProc.stderr.on('data', data => reject(data.toString()));
          }
        });
      }
      else {
        // if ipfs directory already exists,
        // do nothing
        resolve();
      }
    });
  }

  private get _localEnv(): any {
    return {...process.env, IPFS_PATH: this._ipfsPath};
  }

}