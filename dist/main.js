"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as adhoc from "./adhoc";
//import * as dotenv from 'dotenv';
const app_state_machine_1 = require("./app.state-machine");
require("./def.globals");
/*
// module.exports.loop = function () {
// }
*/
/**
* Screeps Main Loop function
*/
function mainLoop() {
    //console.log(adhoc.helloWorld("test message"));
    //dotenv.config();
    let sm = app_state_machine_1.StateMachine.getInstance();
    sm.loadState();
    //let cm = new ColonyManager();
    sm.saveState();
}
mainLoop();
