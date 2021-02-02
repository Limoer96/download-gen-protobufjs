"use strict";
exports.__esModule = true;
var readConfig_1 = require("./utils/readConfig");
var download = require("download-git-repo");
var chalk = require("chalk");
var fse = require("fs-extra");
var path = require("path");
var const_1 = require("./const");
function dowload() {
    return new Promise(function (resolve, reject) {
        readConfig_1.readConfig()
            .then(readConfig_1.checkConfig)
            .then(function (config) {
            if (!config) {
                process.exit(0);
                return;
            }
            download("" + config.url, const_1.tempFileName, { clone: true }, function (err) {
                if (err) {
                    console.log(chalk.red('download from origin repo failed！'));
                    process.exit(1);
                }
                else {
                    fse
                        .copy(path.join(const_1.tempFileName, config.sourcePath), path.resolve(process.cwd(), config.root))
                        .then(function () {
                        console.log(chalk.green('file saved at: ', path.resolve(process.cwd(), config.root)));
                        try {
                            fse.removeSync(const_1.tempFileName); // 删除clone下来的临时目录
                        }
                        catch (error) { }
                        resolve(config);
                    })["catch"](function (err) {
                        console.log(chalk.red(err));
                        reject('Error happend when save file.');
                    });
                }
            });
        });
    });
}
exports["default"] = dowload;
