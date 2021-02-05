"use strict";
exports.__esModule = true;
exports.toCamel = exports.is = void 0;
function is(obj, type) {
    var typeString = Object.prototype.toString.call(obj);
    return typeString.substring(8, typeString.length - 1).toLowerCase() === type;
}
exports.is = is;
function toCamel(str) {
    return str.slice(0, 1).toLowerCase() + str.slice(1);
}
exports.toCamel = toCamel;
