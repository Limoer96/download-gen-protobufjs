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
exports.readConfig = exports.checkConfig = void 0;
var fs = require("fs");
var fsp = require("fs/promises");
var inquirer = require("inquirer");
var chalk = require("chalk");
var prettier = require("prettier");
var const_1 = require("../const");
var common_1 = require("./common");
function checkConfigFile() {
    return new Promise(function (resolve) {
        var exist = fs.existsSync(const_1.configFilePath);
        if (exist) {
            resolve(true);
        }
        else {
            // 用户决定是否创建
            var question = {
                type: 'confirm',
                name: 'addConfig',
                message: chalk.yellow('Could not find configuration file.') +
                    '\n\n' +
                    'would you want to add default at: ' +
                    chalk.bold(const_1.configFilePath),
                "default": true
            };
            inquirer.prompt(question).then(function (answer) {
                if (!answer.addConfig) {
                    console.log(chalk.red('We need related configuration to run this tool. Please configure the necessary configuration before continuing.'));
                    process.exit(0);
                }
                fs.writeFileSync(const_1.configFilePath, prettier.format(JSON.stringify(const_1.configTemplate), { parser: 'json' }));
                console.log(chalk.green('generate config file success, edit it and run command again!'));
                resolve(false);
            });
        }
    });
}
function checkConfig(config) {
    if (!config || isAndEmpty(config, 'object', function (value) { return Object.keys(value).length === 0; })) {
        return null;
    }
    console.log("warning: " + chalk.yellow('Unconfigured items will use the default configuration'));
    return __assign(__assign({}, const_1.INIT_CONFIG), config);
}
exports.checkConfig = checkConfig;
function isAndEmpty(value, type, check) {
    return common_1.is(value, type) && check(value);
}
function readConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var continued, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkConfigFile()];
                case 1:
                    continued = _a.sent();
                    if (!continued) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, fsp.readFile(const_1.configFilePath, { encoding: 'utf-8' })];
                case 2:
                    file = _a.sent();
                    return [2 /*return*/, JSON.parse(file)];
            }
        });
    });
}
exports.readConfig = readConfig;
