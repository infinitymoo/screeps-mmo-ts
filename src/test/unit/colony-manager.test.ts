//Library Imports
import * as _ from 'lodash';
import 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';

//App Imports
import { Observer,Event, EventManager } from '../../app.event-manager';
import { ColonyManager, Colony } from '../../app.colony-manager';
import { ENERGY_SOURCE, Station, Position } from '../../def.customtypes';


var colonyManager = ColonyManager.getInstance(true);
var eventManager = EventManager.getInstance(true);

suite(`Colony Manager Initialization`, () => {

    test(`Check if ColonyManager initializes`, () => {

        let oList:Array<Observer> = colonyManager.readObserverList();

        assert.ok(
            oList,
            `Colony List expected to be ok (truthy): ${JSON.stringify(oList)}`
        );

        assert.isAbove(
            oList.length,
            0,
            `Colony Observer List expected to have at least one item (length>0): ${JSON.stringify(oList)}`
        );
    });

    test(`Registers a startColony event`, () => {

        eventManager.event(new Event(`Unit Test`,`Colony Init`,`startColony`,`Room Test Name`));

        let colList:Array<Colony> = colonyManager.readColonyList();
        let colonyFound = false;

        _.forEach( colList, (colony,i) => {
            if( _.isEqual(colony.startRoomRead,`Room Test Name`) ) {
                colonyFound = true;
                return false; // breaks foreach loop early
            }
        })

        assert.isTrue(
            colonyFound,
            `Colony List expected to have Colony with startRoom with name Room Test Name : ${JSON.stringify(colList)}`
        );
    });
    
    //sinon.restore();
});

suite(`Colony Manager setup logic`, () => {

    //assume data state created with colony init is still in place

    test(`energy sources tracked`, () => {

        /*
        1. Get room sources - Implementation
        2. Find out where I can stand while harvesting them (workspaces) - Implementation
        3. Design a body for harvesting them, given my room's energy capacity - Pure
        4. Queue Spawning those creeps - Pure (if using internalOnly setting)
        5. Calculate transport capacity needed - Pure
        6. Design transport bodies for the same - Pure
        7. Queue spawning those creeps - Pure (if using internalOnly setting)
        */

        //1. Get room sources
        //This is an implementation function in Colony Manager so can't unit test without mocking game objects. 
        let source1:Source = { 
            id:'123',
            effects:[],
            pos: new RoomPosition(10,10,`Room Test Name`),
            energy:2000,
            energyCapacity:3000,
            ticksToRegeneration:200,
            prototype: Source.prototype,
            room: new Room('Room Test Name')
        }  

        let source2:Source = { 
            id:'123',
            effects:[],
            pos: new RoomPosition(20,20,`Room Test Name`),
            energy:2000,
            energyCapacity:3000,
            ticksToRegeneration:200,
            prototype: Source.prototype,
            room: new Room('Room Test Name')
        }

        let sources:Source[] = [source1,source2];

        //2. Find out where I can stand while harvesting them (workspaces)
        // same as 1. so mocking it here; ref makeTerrainStationMap
        let sourceStations:Array<Station> = [];
        
        _.forEach( sources, (s) => {
            let position:Position = {
                x:s.pos.x,
                y:s.pos.y
            };
            let station:Station = {
                type: ENERGY_SOURCE,
                pos: position,
                workSpaces: []
            };
            sourceStations.push(station);
        });

        _.forEach( sourceStations, (ss) => {
            let workSpacesCalculated:Array<Position> = colonyManager.calculateWorkSpaces(ss);
            ss.workSpaces = workSpacesCalculated;
        });        

        colonyManager.setColonyStations(sourceStations,`Room Test Name`);
        colonyManager.readColonyStations(`Room Test Name`);

    });

    // test(`harvester creep spawn preparation`, () => {

    // });

    // test(`harvesters queued for spawning`, () => {

    // });

    // test(`transport creep spawn preparation`, () => {

    // });

    // test(`transport queued for spawning`, () => {

    // });

    // test(`upgrader creep spawn preparation`, () => {

    // });

    // test(`upgrader queued for spawning`, () => {

    // });

    // test(`builder creep spawn preparation`, () => {

    // });

    // test(`builder queued for spawning`, () => {

    // });

    // test(``, () => {

    // });

    // test(``, () => {

    // });

});