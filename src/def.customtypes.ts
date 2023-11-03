/*
** CONSTANTS
*/

//StationTypes
export const ENERGY_SOURCE = 1;
export const ROOM_CONTROLLER = 2;
export const MINERAL_SOURCE = 3;

/*
** TYPES
*/

export type StationType = number;

/*
** INTERFACES
*/

/**
* INTERFACE Station - Data structure to track activity stations and spaces to work at for creeps
* @property {StationType} type - number constant; ENERGY_SOURCE | ROOM_CONTROLLER | MINERAL_SOURCE
* @property {Position} pos - station's location in its room {x:number,y:number}
* @property {Array<Position>} workSpaces - list of spots that creep may work from on the station [{x:number,y:number}]
*/
export interface Station {
    type:StationType
    pos:Position,
    workSpaces:Array<Position>;
}


export interface Position {
    x:number,
    y:number
}