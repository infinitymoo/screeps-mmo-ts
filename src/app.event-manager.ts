//Library Imports
import * as _ from 'lodash';

//Application Imports
import { EventEngine } from './def.response-codes';

/**
* Provides Observer services to behaviour-driving objects through Events
*/
export class EventManager {

    //configuration parameters
    private static checkInternalOnly:boolean = false

    //implementation parameters
    protected static instance:EventManager;

    protected static eventList:Array<Event>;
    protected static observerList:Array<Observer>;

    private constructor() {
        EventManager.eventList = [];
        EventManager.observerList = [];
    }

    public static getInstance(checkInternalOnly:boolean = false):EventManager {

        if( checkInternalOnly )
            this.checkInternalOnly = checkInternalOnly;

        if(!EventManager.instance)
            EventManager.instance = new EventManager();

        return EventManager.instance;
    }

    /** 
    * UNIT TESTS ONLY - used to test list of events being populated
    * @return {Array<Event>} Brief description of the returning value here.
    */
    public readEventList():Array<Event> {
        return EventManager.eventList;
    }

    /** 
    * UNIT TESTS ONLY - used to test list of observers being populated
    * @return {Array<Observer>} Brief description of the returning value here.
    */
    public readObserverList():Array<Observer> {
        return EventManager.observerList;
    }

    /** 
    * Registers an Event to be picked up by an Observer asynchronously.
    * @param {Event} event - Event Object as the key by which the Event will be recognized by its Observers
    * @return {number} EventEngine Response code result of Event registry.
    */    
    public event(event:Event):number {
        EventManager.eventList.push(event);

        let response = EventEngine.SUCCESS_ASYNC;//`Observerless Event: ${event.eventReporterType} - ${event.eventReporterIdentifier}`;
        let callbackFunction;
        
        _.forEach( EventManager.observerList, (o) => {
            if( _.isEqual( o.eventName, event.eventName) ) {
                response = EventEngine.SUCCESS_SYNC;//`Observerful Event: ${event.eventReporterType} - ${event.eventReporterIdentifier}`;
                o.callbackFunction(event.callbackArgs);
                return false; //to break the foreach
            }
        } )

        return response;
    }


    /** 
    * Registers an Observer to be called back when an Event happens, asynchronously.
    * @param {Observer} observer - Observer Object as the key by which the Event will be recognized by its Observers
    * @return {number} EventEngine Response code result of Event registry.
    */   
    public observe(observer:Observer):number {
        EventManager.observerList.push(observer);

        let response = EventEngine.SUCCESS_ASYNC;//`Eventless Observer: ${observer.observerType} - ${observer.eventName}`;
        
        _.forEach( EventManager.eventList, (e) => {
            if( _.isEqual( e.eventName, observer.eventName) ) {
                response = EventEngine.SUCCESS_SYNC;//`Eventful Observer: ${observer.observerType} - ${observer.eventName}`;
                return false; //to break the foreach
            }
        } )

        return response;
    }
}

/**
* A behaviour object would register itself as an observer for an event being watched for
*/
export class Observer {
    observerType:string;
    observerIdentifier:string;
    eventName:string;
    callbackFunction:any; //no idea how to type functions lol

    constructor( observerType:string, observerIdentifier:string, eventName:string, callbackFunction:any ) {
        this.observerType = observerType;
        this.observerIdentifier = observerIdentifier; 
        this.eventName = eventName;
        this.callbackFunction = callbackFunction;
    };
}

export class Event {
    eventReporterType:string;
    eventReporterIdentifier:string;
    eventName:string;
    callbackArgs:any;

    constructor( eventReporterType:string, eventReporterIdentifier:string, eventName:string, callbackArgs:any ) {
        this.eventReporterType = eventReporterType;
        this.eventReporterIdentifier = eventReporterIdentifier;
        this.eventName = eventName;
        this.callbackArgs = callbackArgs;
    };
}
