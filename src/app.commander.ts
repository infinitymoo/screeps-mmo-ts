//Library Imports
import _ from 'lodash';

//Application Imports
import { EventManager, Event } from './app.event-manager'
import { EventEngine } from './def.response-codes'

/**
* Console interface for manually triggered events and behaviours 
*/
export abstract class Commander {

    /** 
    * Triggers a startColony Event for the Colony Manager
    * @param {string} roomName - Name of game room to start colony in.
    * @return {string} Response from Event Manager on event registration.
    */    
    public static startColony(roomName:string):string {
        let response = EventManager.getInstance().event(new Event("Command Line","Player","startColony",roomName));

        let consoleOutput:string = ``;
        if(_.isEqual(response,EventEngine.SUCCESS_SYNC)) //`Observerful Event: Colony Manager startColony`
            consoleOutput = `startColony Event successfully Observed`;
        else if(_.isEqual(response,EventEngine.SUCCESS_ASYNC)) //`Observerless Event: Colony Manager startColony`
            consoleOutput = `startColony Event successfully Registered`;
        
        return Commander.endCommandExecution(consoleOutput);
    }

    /** 
    * Pure - Any processes common to console commands to be executed here to avoid retyping of code across other functions
    * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
    * @param {string} consoleOutput - For now, only variable common to all commands - will write this value to console.
    * @return {string} Console Output.
    */    
    protected static endCommandExecution(consoleOutput:string):string {
        
        Commander.resetCommanderDefaults();

        if( consoleOutput.length > 0 ) {
            console.log(consoleOutput);
            return consoleOutput;
        }
        else
            return `no console output generated`;
    }

    //Anticipating defaults in future with OS cpu savings, but not sure what I would use this for meantime
    protected static resetCommanderDefaults() {
        
    }
}