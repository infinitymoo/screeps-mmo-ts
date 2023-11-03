"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creepRunner = exports.Goal = exports.Colony = exports.ColonyManager = void 0;
//App Imports
const app_event_manager_1 = require("./app.event-manager");
const def_customtypes_1 = require("./def.customtypes");
/**
* Grouping of rooms, creeps, and structures, that function as a colony unit
*/
class ColonyManager {
    constructor() {
    }
    static getInstance(checkInternalOnly = false) {
        if (checkInternalOnly)
            this.checkInternalOnly = checkInternalOnly;
        if (!ColonyManager.instance)
            ColonyManager.instance = new ColonyManager();
        if (!ColonyManager.instance.isInitialized()) {
            ColonyManager.instance.init();
        }
        return ColonyManager.instance;
    }
    isInitialized() {
        if (ColonyManager.observerList.length > 0)
            return true;
        else
            return false;
    }
    /**
    * Sets up the ColonyManager object for use, if its not initialized yet. Starts with observerList for now.
    */
    init() {
        let obs = new app_event_manager_1.Observer(`ColonyManager`, `init()`, `startColony`, this.startColony);
        let emResponse = app_event_manager_1.EventManager.getInstance().observe(obs);
        if (emResponse > 0)
            ColonyManager.observerList.push(obs);
        else
            throw (`EXCEPTION Colony Manager init() couldn't get a success message from EventManager.observe: ${JSON.stringify(emResponse)}`); //console.log(`Colony Manager init couldnt get a success message from eventManager.observe: ${JSON.stringify(emResponse)}`);
    }
    /**
    * UNIT TESTS ONLY - used to test list of colonies being populated
    * @return {Array<String>} Brief description of the returning value here.
    */
    readColonyList() {
        return ColonyManager.colonyList;
    }
    /**
    * UNIT TESTS ONLY - used to test list of colonies being populated
    * @return {Array<String>} Brief description of the returning value here.
    */
    readObserverList() {
        return ColonyManager.observerList;
    }
    //To Do
    startColony(roomName) {
        let newCol = new Colony(roomName);
        ColonyManager.colonyList.push(newCol);
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
        let sources = Game.rooms[roomName].find(FIND_SOURCES);
    }
    /**
    * TO DO
    * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
    * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
    * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
    */
    calculateWorkSpaces(workStation) {
        var stubbedWorkSpaces = [{ x: 1, y: 1 }];
        return stubbedWorkSpaces;
    }
    /**
    * TO DO
    * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
    * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
    * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
    */
    setColonyStations(workStations, roomName) {
    }
    /**
    * TO DO
    * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
    * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
    * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
    */
    readColonyStations(roomName) {
    }
    /**
    * Setup Energy Harvest Stations
    * @param {StationType} stationType - Position in the room given that the object is at, for the station map to be created around.
    * @param {RoomPosition} stationPosition - Name of the room to access from the Game object to get terrain.
    * @return {Station} Brief description of the returning value here.
    */
    setupStation(stationType, stationPosition) {
        // interface Station {
        //     type:StationType
        //     pos:Position,
        //     workSpaces:Array<Position>;
        // }
        //setup workspace spots that creeps could work from, e.g. harvest adj to source or upgrade/build from distance/range spots
        // - creeps book workspaces
        // - upgrader ramparts would be a special workspace
        // - 
        var stubbedStation = {
            type: def_customtypes_1.ENERGY_SOURCE,
            pos: {
                x: 25,
                y: 25
            },
            workSpaces: [{ x: 24, y: 24 }]
        };
        return stubbedStation;
    }
    /**
    * Implementation function for constructing a StationMap of a room terrain object e.g. Source or RoomController.
    * @param {RoomPosition} roomPos - Position in the room given that the object is at, for the station map to be created around.
    * @param {string} roomName - Name of the room to access from the Game object to get terrain.
    * @return {ReturnValueDataTypeHere} Brief description of the returning value here.
    */
    makeTerrainStationMap(roomPos, roomName) {
        //@ts-ignore
        let roomTerrain = Game.rooms[roomName].getTerrain();
        let loopPosition = { x: roomPos.x - 1, y: roomPos.y - 1 };
        let stationWorkSpaces = [];
        for (let iX = 0; iX < 3; iX++) {
            for (let iY = 0; iY < 3; iY++) {
                if (roomTerrain.get(loopPosition.x, loopPosition.y) != TERRAIN_MASK_WALL)
                    stationWorkSpaces.push(loopPosition);
                loopPosition.y++;
            }
            loopPosition.x++;
        }
        return stationWorkSpaces;
    }
}
exports.ColonyManager = ColonyManager;
//configuration parameters
ColonyManager.checkInternalOnly = false;
ColonyManager.colonyList = [];
ColonyManager.observerList = [];
class Colony {
    constructor(startRoom) {
        this.goalList = [
            new Goal('controllerLevel', 2)
        ];
        this.startRoom = startRoom;
        this.startRoomRead = startRoom;
    }
    ;
}
exports.Colony = Colony;
class Goal {
    constructor(property, value) {
        this.property = property;
        this.value = value;
    }
    ;
}
exports.Goal = Goal;
var creepRunner;
(function (creepRunner) {
    function run(creep) {
        // builder
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        // harvester
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        // upgrader
        if (creep.room.controller)
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
    }
    creepRunner.run = run;
    function decideHarvesterMode(creep) {
    }
})(creepRunner = exports.creepRunner || (exports.creepRunner = {}));
