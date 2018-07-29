import * as os from 'os';
import * as path from 'path';

const platform = os.platform();
const arch = os.arch();

export const ipfsPath = path.join(
  __dirname,
  '..',
  '..',
  'bin',
  platform,
  arch,
  (platform === 'win32')? 'ipfs.exe': 'ipfs'
);