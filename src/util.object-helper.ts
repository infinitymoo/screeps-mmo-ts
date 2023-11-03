export function stringifyMap(map:Map<string,any>) {
    let jsonObject:{[key:string]: any} = {};
    map.forEach((value:any, key:string) => {  
        jsonObject[key] = value  
    });
    return JSON.stringify( jsonObject );
}
