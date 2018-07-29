"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var path = require("path");
var platform = os.platform();
var arch = os.arch();
exports.ipfsPath = path.join(__dirname, '..', 'bin', platform, arch, (platform === 'win32') ? 'ipfs.exe' : 'ipfs');
