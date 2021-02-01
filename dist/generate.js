"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var fse = require("fs-extra");
var path = require("path");
var chalk = require("chalk");
var childProcess = require("child_process");
var readConfig_1 = require("./utils/readConfig");
/**
 * 获取proto文件相对根目录的=pathList
 * @param dirPath 当前目录的path
 * @param basePath 根目录path
 * @param fileRelativePathList 相对pathList
 */
function getProtobufFilesRelativePath(dirPath, basePath, fileRelativePathList) {
    var files = fse.readdirSync(dirPath, { encoding: 'utf-8' });
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var filePath = path.join(dirPath, file);
        if (fse.statSync(filePath).isDirectory()) {
            getProtobufFilesRelativePath(filePath, basePath, fileRelativePathList);
        }
        else {
            var relativePath = path.relative(basePath, filePath);
            fileRelativePathList.push(relativePath);
        }
    }
}
function generate(config) {
    return __awaiter(this, void 0, void 0, function () {
        var conf, rootPath, exist, paths, outputPath, command_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!config) return [3 /*break*/, 2];
                    return [4 /*yield*/, readConfig_1.readConfig().then(readConfig_1.checkConfig)];
                case 1:
                    conf = _a.sent();
                    config = conf;
                    _a.label = 2;
                case 2:
                    rootPath = path.resolve(process.cwd(), config.root);
                    exist = fse.existsSync(rootPath);
                    if (!exist) {
                        console.log(chalk.red(rootPath + " does not exist. check gpc-config.json and run command again."));
                        process.exit(1);
                    }
                    else {
                        paths = [];
                        getProtobufFilesRelativePath(rootPath, rootPath, paths);
                        outputPath = path.resolve(process.cwd(), config.output);
                        command_1 = "protoc --proto_path=. " + paths.join(' ') + " --grpc-web_out=import_style=typescript,mode=grpcwebtext:" + outputPath + " --js_out=import_style=commonjs,binary:" + outputPath;
                        try {
                            if (!fse.existsSync(outputPath)) {
                                fse.mkdirSync(outputPath);
                            }
                        }
                        catch (error) {
                            console.log(chalk.red(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Error happend when generate dir: ", ""], ["Error happend when generate dir: ", ""])), outputPath), error);
                            process.exit(1);
                        }
                        childProcess.exec(command_1, { cwd: path.resolve(process.cwd(), config.root) }, function (error) {
                            if (error) {
                                console.log(chalk.red('Error happend when run command: ', command_1, 'Error:', error.message));
                                process.exit(1);
                            }
                            else {
                                console.log(chalk.green('generate protobuf javascript file success!'));
                            }
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = generate;
var templateObject_1;
