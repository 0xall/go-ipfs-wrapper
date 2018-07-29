"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var child_process_1 = require("child_process");
var ipfs_config_1 = require("./ipfs-config");
var events_1 = require("events");
var IpfsProcess = /** @class */ (function (_super) {
    __extends(IpfsProcess, _super);
    function IpfsProcess(_ipfsPath) {
        var _this = _super.call(this) || this;
        _this._ipfsPath = _ipfsPath;
        _this._daemon = null;
        return _this;
    }
    IpfsProcess.prototype.run = function () {
        var _this = this;
        if (this._daemon) {
            this._daemon.kill();
            this._daemon = null;
        }
        this._init()
            .then(function () {
            _this._daemon = child_process_1.spawn(ipfs_config_1.ipfsPath, ['daemon'], { env: _this._localEnv });
            _this._daemon.on('exit', function (code) { return _this.emit('exit', code); });
            _this._daemon.on('error', function (err) { return _this.emit('error', err); });
            setImmediate(function () { return _this.emit('start'); });
        })
            .catch(function (err) { return _this.emit('error', err); });
    };
    IpfsProcess.prototype._init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!fs.existsSync(_this._ipfsPath)) {
                // if ipfs directory does not exists,
                // create a new ipfs directory
                console.log(_this._localEnv);
                var ipfsProc_1 = child_process_1.spawn(ipfs_config_1.ipfsPath, ['init'], { env: _this._localEnv });
                ipfsProc_1.on('exit', function (code) {
                    if (code === 0) {
                        // if success to initialize
                        resolve();
                    }
                    else {
                        // if failed to initialize
                        ipfsProc_1.stderr.on('data', function (data) { return reject(data.toString()); });
                    }
                });
            }
            else {
                // if ipfs directory already exists,
                // do nothing
                resolve();
            }
        });
    };
    Object.defineProperty(IpfsProcess.prototype, "_localEnv", {
        get: function () {
            return __assign({}, process.env, { IPFS_PATH: this._ipfsPath });
        },
        enumerable: true,
        configurable: true
    });
    return IpfsProcess;
}(events_1.EventEmitter));
exports.IpfsProcess = IpfsProcess;
