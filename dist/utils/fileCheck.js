"use strict";
exports.__esModule = true;
exports.checkLocalJsProtoBufFile = void 0;
var fse = require("fs-extra");
function checkLocalJsProtoBufFile(dirPath) {
    return new Promise(function (resolve, reject) {
        try {
            var exist = fse.existsSync(dirPath);
            if (exist) {
                return resolve(true);
            }
            return resolve(false);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.checkLocalJsProtoBufFile = checkLocalJsProtoBufFile;
