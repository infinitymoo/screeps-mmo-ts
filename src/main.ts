//import * as adhoc from "./adhoc";
//import * as dotenv from 'dotenv';
import { StateMachine } from './app.state-machine';
import './def.globals';

/*
// module.exports.loop = function () {
// }
*/



/** 
* Screeps Main Loop function
*/
function mainLoop(): void {
    //console.log(adhoc.helloWorld("test message"));

    //dotenv.config();

    let sm = StateMachine.getInstance();
    sm.loadState();

    //let cm = new ColonyManager();

    sm.saveState();
}

mainLoop();