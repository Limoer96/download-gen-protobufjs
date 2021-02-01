"use strict";
exports.__esModule = true;
var download_1 = require("./download");
var generate_1 = require("./generate");
var commander_1 = require("commander");
var program = new commander_1.Command();
program.version('0.0.1');
program.description('download and generate JavaScript protobuf code.');
program
    .allowUnknownOption()
    .option('-i, --init', 'download and generate JavaScript protobuf code.')
    .option('-g, --generate', 'generate JavaScript protobuf code based on local protobuf files.');
program.parse(process.argv);
var options = program.opts();
if (options.init) {
    download_1["default"]().then(function (config) {
        generate_1["default"](config);
    });
}
if (options.generate) {
    // 仅生成文件
    generate_1["default"]();
}
/**
 * 1. 读取本地配置
 * 2. 下载远程 protobuf文件，并根据配置进行存储
 * 3. 根据配置生成`protoc相关命令`
 * 4. 执行命令，生成JS文件
 * 5. 生成默认导出的clients文件（可选）
 */
