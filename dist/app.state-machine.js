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
exports.FlagState = exports.RoomState = exports.SpawnState = exports.CreepState = exports.EventState = exports.ThreatState = exports.ColonyState = exports.StateContainer = exports.StateMachine = void 0;
const _ = __importStar(require("lodash"));
const util_object_helper_1 = require("./util.object-helper");
class StateMachine {
    constructor() {
        this.stateContainerList = [
            'ColonyState',
            'ThreatState',
            'EventState',
            'CreepState',
            'SpawnState',
            'RoomState',
            'FlagState'
        ];
        this.state = new Map();
    }
    static getInstance(checkInternalOnly = false) {
        if (checkInternalOnly)
            this.checkInternalOnly = checkInternalOnly;
        if (!StateMachine.instance)
            StateMachine.instance = new StateMachine();
        if (!StateMachine.instance.isInitialized()) {
            StateMachine.instance.init();
        }
        return StateMachine.instance;
    }
    /**
    * UNIT TESTS ONLY - reads private state
    * @return {Map<string, StateContainer>} Brief description of the returning value here.
    */
    readState() {
        return StateMachine.instance.state;
    }
    /**
     * Getter $stateContainerList
     * @return {Array<string> }
     */
    get $stateContainerList() {
        return this.stateContainerList;
    }
    /**
    * Checks whether the Screeps Memory object contains our previous state by checking if the different Memory properties we use, are defined
    * @param {boolean} checkInternalOnly optional parm - pass true into function if you only want to check StateMachine's variable, instead of game Memory
    * @return {boolean}
    */
    isInitialized() {
        let initState = true;
        if (StateMachine.checkInternalOnly)
            _.forEach(this.stateContainerList, (s) => {
                if (_.isUndefined(this.state.get(s))) {
                    initState = false;
                    return false; // have to return false to break the foreach loop
                }
            });
        else {
            _.forEach(this.stateContainerList, (s) => {
                // @ts-ignore
                if (_.isUndefined(Memory.stateMachine[s])) {
                    initState = false;
                    return false; // have to return false to break the foreach loop
                }
            });
        }
        return initState;
    }
    /**
    * When our game loop finishes, we save our state to the game's Memory object for use next turn.
    */
    saveState() {
        _.forEach(this.stateContainerList, (s) => {
            //@ts-ignore
            Memory.stateMachine[s] = util_object_helper_1.stringifyMap(this.state);
        });
    }
    /**
    * Before we can do anything in our game loop, we need to have our state machine ready - this loads the data to make it usable.
    *
    * //TO DO see js code for main's tryInitSameMemory to avoid parsing Memory unless required for statemachine.
    */
    loadState() {
        _.forEach(this.stateContainerList, (s) => {
            //@ts-ignore
            var stateContainerInstance = new StateContainer(Memory.stateMachine[s]);
            this.state.set(s, stateContainerInstance);
        });
    }
    /**
    * Used when the game's Memory object doesn't contain any info. Populates the Memory object with our state machine data.
    * @return {stateMachineTemplate} returns the JSON object representing the state
    */
    init() {
        //initialize each of the objects by populating them
        _.forEach(this.stateContainerList, (s) => {
            var instance = Object.create(StateContainer.prototype);
            //instance.constructor.apply(instance); //gives type error with unit tests but since i don't do anything in their constructors, i'm avoiding calling it for now
            this.state.set(s, instance);
        });
        if (!StateMachine.checkInternalOnly) {
            //To Do - call or implement the statecontainer population
            //each one must be instantiated by calling its constructors
        }
        return this.state;
    }
}
exports.StateMachine = StateMachine;
//configuration parameters
StateMachine.checkInternalOnly = false;
class StateContainer {
    constructor(json) {
        this.state = json;
    }
}
exports.StateContainer = StateContainer;
class ColonyState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.ColonyState = ColonyState;
class ThreatState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.ThreatState = ThreatState;
class EventState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.EventState = EventState;
class CreepState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.CreepState = CreepState;
class SpawnState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.SpawnState = SpawnState;
class RoomState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.RoomState = RoomState;
class FlagState extends StateContainer {
    constructor(json) {
        super(json);
    }
}
exports.FlagState = FlagState;
