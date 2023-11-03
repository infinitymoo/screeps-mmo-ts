"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commander = void 0;
//Library Imports
const lodash_1 = __importDefault(require("lodash"));
//Application Imports
const app_event_manager_1 = require("./app.event-manager");
const def_response_codes_1 = require("./def.response-codes");
/**
* Console interface for manually triggered events and behaviours
*/
class Commander {
    /**
    * Triggers a startColony Event for the Colony Manager
    * @param {string} roomName - Name of game room to start colony in.
    * @return {string} Response from Event Manager on event registration.
    */
    static startColony(roomName) {
        let response = app_event_manager_1.EventManager.getInstance().event(new app_event_manager_1.Event("Command Line", "Player", "startColony", roomName));
        let consoleOutput = ``;
        if (lodash_1.default.isEqual(response, def_response_codes_1.EventEngine.SUCCESS_SYNC)) //`Observerful Event: Colony Manager startColony`
            consoleOutput = `startColony Event successfully Observed`;
        else if (lodash_1.default.isEqual(response, def_response_codes_1.EventEngine.SUCCESS_ASYNC)) //`Observerless Event: Colony Manager startColony`
            consoleOutput = `startColony Event successfully Registered`;
        return Commander.endCommandExecution(consoleOutput);
    }
    /**
    * Pure - Any processes common to console commands to be executed here to avoid retyping of code across other functions
    * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
    * @param {string} consoleOutput - For now, only variable common to all commands - will write this value to console.
    * @return {string} Console Output.
    */
    static endCommandExecution(consoleOutput) {
        Commander.resetCommanderDefaults();
        if (consoleOutput.length > 0) {
            console.log(consoleOutput);
            return consoleOutput;
        }
        else
            return `no console output generated`;
    }
    //Anticipating defaults in future with OS cpu savings, but not sure what I would use this for meantime
    static resetCommanderDefaults() {
    }
}
exports.Commander = Commander;
