//Library Imports
import * as _ from 'lodash';
import 'mocha';
import { assert,expect } from 'chai';
import * as sinon from 'sinon';

//App Imports
import { Observer, Event, EventManager } from '../../app.event-manager';

var eventManager = EventManager.getInstance(true);

describe(`Register an Observer and trigger callback on Event`, () => {

    //Setup
    let callbackTester = function (parm:string) {
        assert.equal(
            parm,
            'testObserveEventParm',
            `callback expected receive testObserveEventParm as parameter value: ${JSON.stringify(parm)}`
        );
    }
    eventManager.observe(new Observer('Unit Test','Register Observer','testObserveEvent',callbackTester))
    let oList:Array<Observer> = eventManager.readObserverList();

    //Assertions
    it(`Find created Observer`, () => {

        let observerFound = false;

        _.forEach( oList, (observer,i) => {
            if( _.isEqual(observer.eventName,`testObserveEvent`) ) {
                observerFound = true;
                return false; // breaks foreach loop early
            }
        })

        assert.isTrue(
            observerFound,
            `EventManager expected to have Obsever for testObserveEvent: ${JSON.stringify(oList)}`
        );
    });

    it(`Setup Event, callback parm check`, () => {
        eventManager.event(new Event('Unit Test','Setup Event',`testObserveEvent`,'testObserveEventParm')) // see Setup section above for the assert triggered
    });
    
    let eList:Array<Event> = eventManager.readEventList();

    it(`Find created Event`, () => {

        let eventFound = false;

        _.forEach( eList, (event,i) => {
            if( _.isEqual(event.eventName,`testObserveEvent`) ) {
                eventFound = true;
                return false; // breaks foreach loop early
            }
        })

        assert.isTrue(
            eventFound,
            `EventManager expected to have Event for testObserveEvent: ${JSON.stringify(eList)}`
        );
    });
    
    //sinon.restore();

});


// TO DO
/*
describe(`Event Manager only allows valid Observers and Events to be registered`, () => {

    //To think through - what constitutes invalid observers/events, or what situations do I need to avoid?

    it(`should not register identical observers to avoid multiple triggers of same event to same instance`, () => {

    })
})
*/