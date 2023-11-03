"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyMap = void 0;
function stringifyMap(map) {
    let jsonObject = {};
    map.forEach((value, key) => {
        jsonObject[key] = value;
    });
    return JSON.stringify(jsonObject);
}
exports.stringifyMap = stringifyMap;
