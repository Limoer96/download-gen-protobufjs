"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var chalk = require("chalk");
var fileCheck_1 = require("./utils/fileCheck");
var readConfig_1 = require("./utils/readConfig");
var fs = require("fs");
var path = require("path");
var common_1 = require("./utils/common");
var prettier = require("prettier");
var const_1 = require("./const");
function findClientFiles(sourcePath, filePathList) {
    var files = fs.readdirSync(sourcePath);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var absFilePath = path.resolve(sourcePath, file);
        if (fs.statSync(absFilePath).isDirectory()) {
            findClientFiles(absFilePath, filePathList);
        }
        else if (file.endsWith('ClientPb.ts')) {
            // 只加入Client Pb文件
            filePathList.push(absFilePath);
        }
    }
}
function formatToRelativePath(filePath, cwd) {
    var absPath = path.resolve(filePath);
    return './' + path.relative(cwd, absPath);
}
function genClientFileContent(files, clientWrapper) {
    var importStr = "import " + clientWrapper.name + " from \"" + formatToRelativePath(clientWrapper.path, const_1.clientFileTargetPath) + "\";";
    var contentStr = '';
    for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
        var file = files_2[_i];
        var _a = path.parse(file), name_1 = _a.name, ext = _a.ext;
        var clientName = name_1.slice(0, name_1.length - 2);
        var camelClientName = common_1.toCamel(clientName);
        var importPath = './' + path.relative(const_1.clientFileTargetPath, file.replace(ext, ''));
        importStr += "import {" + clientName + "} from '" + importPath + "';";
        contentStr += "export const " + camelClientName + " = " + clientWrapper.name + "<" + clientName + ">(" + clientName + ");";
    }
    return importStr + contentStr;
}
function formatAndWriteFile(content) {
    prettier
        .resolveConfig(path.resolve(process.cwd(), '.prettierrc'))
        .then(function (options) {
        fs.writeFileSync(path.join(const_1.clientFileTargetPath, const_1.clientFileName), prettier.format(content, __assign({ parser: 'typescript' }, options)));
    })["catch"](function (err) {
        console.log(chalk.yellow('warning: err happended when use local .prittierrc format file. use default options instead.'));
        fs.writeFileSync(path.join(const_1.clientFileTargetPath, const_1.clientFileName), prettier.format(content, { parser: 'typescript' }));
    });
}
function makeClientsFile() {
    return __awaiter(this, void 0, void 0, function () {
        var config, sourcePath, exist, clientFilePath, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readConfig_1.readConfig().then(readConfig_1.checkConfig)];
                case 1:
                    config = _a.sent();
                    sourcePath = path.resolve(process.cwd(), config.output);
                    return [4 /*yield*/, fileCheck_1.checkLocalJsProtoBufFile(sourcePath)];
                case 2:
                    exist = _a.sent();
                    if (!exist) {
                        console.log(chalk.red('Local js protobuf file does not exists.'));
                        return [2 /*return*/];
                    }
                    clientFilePath = [];
                    findClientFiles(sourcePath, clientFilePath);
                    if (clientFilePath.length === 0) {
                        console.log(chalk.yellow("no client file finded at: " + sourcePath + ", generate end."));
                        return [2 /*return*/];
                    }
                    if (!config.clientWrapper || !config.clientWrapper.path || !config.clientWrapper.name) {
                        console.log(chalk.red('no clientWrapper config finded, generate clients file abort.'));
                        return [2 /*return*/];
                    }
                    content = genClientFileContent(clientFilePath, config.clientWrapper);
                    try {
                        formatAndWriteFile(content);
                        console.log(chalk.green("generate clients file at: " + const_1.clientFileTargetPath + " success!"));
                    }
                    catch (error) {
                        console.log("error happend when write clients file, " + error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = makeClientsFile;
