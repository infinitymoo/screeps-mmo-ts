import * as _ from 'lodash';
import { stringifyMap } from './util.object-helper';

/**
* Encapsulates and controls the game's Memory object, while providing state machine behaviours to event-driven code
*/

interface Memory {
    stateMachine: {}
}

export class StateMachine {

    //configuration parameters
    private static checkInternalOnly:boolean = false

    //implementation parameters
    private static instance:StateMachine;

    private state: Map<string, StateContainer>;
    readonly stateContainerList: Array<string> = [
        'ColonyState',
        'ThreatState',
        'EventState',

        'CreepState',
        'SpawnState',
        'RoomState',
        'FlagState'
    ];

	private constructor() {
        this.state = new Map();
	}

    public static getInstance(checkInternalOnly:boolean = false):StateMachine {

        if( checkInternalOnly )
            this.checkInternalOnly = checkInternalOnly;

        if(!StateMachine.instance)
            StateMachine.instance = new StateMachine();

        if( !StateMachine.instance.isInitialized() ){
            StateMachine.instance.init();
        }

        return StateMachine.instance;
    }
    /** 
    * UNIT TESTS ONLY - reads private state
    * @return {Map<string, StateContainer>} Brief description of the returning value here.
    */    
    public readState():Map<string, StateContainer> {
        return StateMachine.instance.state;
    }

    /**
     * Getter $stateContainerList
     * @return {Array<string> }
     */
	public get $stateContainerList(): Array<string>  {
		return this.stateContainerList;
	}

    /** 
    * Checks whether the Screeps Memory object contains our previous state by checking if the different Memory properties we use, are defined
    * @param {boolean} checkInternalOnly optional parm - pass true into function if you only want to check StateMachine's variable, instead of game Memory
    * @return {boolean}
    */    
    protected isInitialized():boolean {
        
        let initState:boolean = true;

        if( StateMachine.checkInternalOnly )
            _.forEach(this.stateContainerList, (s) => {
                if( _.isUndefined(this.state.get(s)) ) {
                    initState = false;
                    return false; // have to return false to break the foreach loop
                }
            } );
        else {
            _.forEach(this.stateContainerList, (s) => { 
                // @ts-ignore
                if( _.isUndefined(Memory.stateMachine[s]) ) {
                    initState = false;
                    return false; // have to return false to break the foreach loop
                }
            } );
        }
        
        return initState;
    }

    /**
    * When our game loop finishes, we save our state to the game's Memory object for use next turn.
    */
    public saveState():void {
        _.forEach(this.stateContainerList, (s) => { 
            //@ts-ignore
            Memory.stateMachine[s] = stringifyMap(this.state);
        } );
    }

    /**
    * Before we can do anything in our game loop, we need to have our state machine ready - this loads the data to make it usable.
    * 
    * //TO DO see js code for main's tryInitSameMemory to avoid parsing Memory unless required for statemachine.
    */
    public loadState():void {
        _.forEach(this.stateContainerList, (s) => { 
            //@ts-ignore
            var stateContainerInstance:StateContainer = new StateContainer(Memory.stateMachine[s]);
            this.state.set(s, stateContainerInstance);
        } );
    }

    /**
    * Used when the game's Memory object doesn't contain any info. Populates the Memory object with our state machine data.
    * @return {stateMachineTemplate} returns the JSON object representing the state
    */
    public init():Map<string, StateContainer> {

        //initialize each of the objects by populating them
        _.forEach(this.stateContainerList, (s) => {
            var instance = Object.create(StateContainer.prototype);
            //instance.constructor.apply(instance); //gives type error with unit tests but since i don't do anything in their constructors, i'm avoiding calling it for now
            this.state.set(s, instance);
        });

        if(!StateMachine.checkInternalOnly) {
            //To Do - call or implement the statecontainer population

            //each one must be instantiated by calling its constructors
        }
        
        return this.state;
    }

}

export class StateContainer {
    protected state:Object;
    constructor(json:Object) { 
        this.state = json;
    }
}

export class ColonyState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class ThreatState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class EventState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class CreepState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class SpawnState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class RoomState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}

export class FlagState extends StateContainer {
    constructor(json:Object) { 
        super(json);
    }
}