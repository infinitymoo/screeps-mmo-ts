/** 
* Tests basic TS setup and variable passing.
* @param {string} var1 - variable being passed for testing.
* @return {string} first variable modified to complete test
*/
export const helloWorld = function(var1:string):string {
    let response = `hello world: ${var1} received`;
    // if( Game !== null )
    //     response += ` and can list game rooms ${JSON.stringify(Game.rooms)}`;
    return response;
}