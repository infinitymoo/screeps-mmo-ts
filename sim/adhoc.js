"use strict";
exports.__esModule = true;
exports.helloWorld = void 0;
/**
* Tests basic TS setup and variable passing.
* @param {string} var1 - variable being passed for testing.
* @return {string} first variable modified to complete test
*/
var helloWorld = function (var1) {
    var response = "hello world: " + var1 + " received";
    // if( Game !== null )
    //     response += ` and can list game rooms ${JSON.stringify(Game.rooms)}`;
    return response;
};
exports.helloWorld = helloWorld;
