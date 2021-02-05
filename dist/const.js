"use strict";
exports.__esModule = true;
exports.INIT_CONFIG = exports.configTemplate = exports.clientFileTargetPath = exports.configFilePath = exports.clientFileName = exports.tempFileName = void 0;
var path = require("path");
var os = require("os");
exports.tempFileName = os.tmpdir() + "/grpc-remote";
var fileName = 'gpc-config.json';
exports.clientFileName = 'clients.ts';
exports.configFilePath = path.resolve(process.cwd(), fileName);
exports.clientFileTargetPath = path.resolve(process.cwd(), 'src');
exports.configTemplate = {
    root: 'proto',
    output: 'src/proto',
    url: 'https://github.com/userName/repos.git',
    sourcePath: 'src/target/path'
};
exports.INIT_CONFIG = {
    root: 'proto',
    output: 'src/proto',
    url: 'https://gitee.com/fruits-chain/fruitschain-grpc.git',
    sourcePath: 'src'
};
