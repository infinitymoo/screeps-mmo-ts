"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.Observer = exports.EventManager = void 0;
//Library Imports
const _ = __importStar(require("lodash"));
//Application Imports
const def_response_codes_1 = require("./def.response-codes");
/**
* Provides Observer services to behaviour-driving objects through Events
*/
class EventManager {
    constructor() {
        EventManager.eventList = [];
        EventManager.observerList = [];
    }
    static getInstance(checkInternalOnly = false) {
        if (checkInternalOnly)
            this.checkInternalOnly = checkInternalOnly;
        if (!EventManager.instance)
            EventManager.instance = new EventManager();
        return EventManager.instance;
    }
    /**
    * UNIT TESTS ONLY - used to test list of events being populated
    * @return {Array<Event>} Brief description of the returning value here.
    */
    readEventList() {
        return EventManager.eventList;
    }
    /**
    * UNIT TESTS ONLY - used to test list of observers being populated
    * @return {Array<Observer>} Brief description of the returning value here.
    */
    readObserverList() {
        return EventManager.observerList;
    }
    /**
    * Registers an Event to be picked up by an Observer asynchronously.
    * @param {Event} event - Event Object as the key by which the Event will be recognized by its Observers
    * @return {number} EventEngine Response code result of Event registry.
    */
    event(event) {
        EventManager.eventList.push(event);
        let response = def_response_codes_1.EventEngine.SUCCESS_ASYNC; //`Observerless Event: ${event.eventReporterType} - ${event.eventReporterIdentifier}`;
        let callbackFunction;
        _.forEach(EventManager.observerList, (o) => {
            if (_.isEqual(o.eventName, event.eventName)) {
                response = def_response_codes_1.EventEngine.SUCCESS_SYNC; //`Observerful Event: ${event.eventReporterType} - ${event.eventReporterIdentifier}`;
                o.callbackFunction(event.callbackArgs);
                return false; //to break the foreach
            }
        });
        return response;
    }
    /**
    * Registers an Observer to be called back when an Event happens, asynchronously.
    * @param {Observer} observer - Observer Object as the key by which the Event will be recognized by its Observers
    * @return {number} EventEngine Response code result of Event registry.
    */
    observe(observer) {
        EventManager.observerList.push(observer);
        let response = def_response_codes_1.EventEngine.SUCCESS_ASYNC; //`Eventless Observer: ${observer.observerType} - ${observer.eventName}`;
        _.forEach(EventManager.eventList, (e) => {
            if (_.isEqual(e.eventName, observer.eventName)) {
                response = def_response_codes_1.EventEngine.SUCCESS_SYNC; //`Eventful Observer: ${observer.observerType} - ${observer.eventName}`;
                return false; //to break the foreach
            }
        });
        return response;
    }
}
exports.EventManager = EventManager;
//configuration parameters
EventManager.checkInternalOnly = false;
/**
* A behaviour object would register itself as an observer for an event being watched for
*/
class Observer {
    constructor(observerType, observerIdentifier, eventName, callbackFunction) {
        this.observerType = observerType;
        this.observerIdentifier = observerIdentifier;
        this.eventName = eventName;
        this.callbackFunction = callbackFunction;
    }
    ;
}
exports.Observer = Observer;
class Event {
    constructor(eventReporterType, eventReporterIdentifier, eventName, callbackArgs) {
        this.eventReporterType = eventReporterType;
        this.eventReporterIdentifier = eventReporterIdentifier;
        this.eventName = eventName;
        this.callbackArgs = callbackArgs;
    }
    ;
}
exports.Event = Event;
