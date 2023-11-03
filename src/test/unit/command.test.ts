//Library Imports
import * as _ from 'lodash';
import 'mocha';
import { assert } from 'chai';
//import * as sinon from 'sinon';

//App Imports
import { Commander } from '../../app.commander';

describe(`Commander successfully kicks off startColony`, () => {
    
    it(`Gets Observerful response from Event Manager`, () => {
        let cResponse = Commander.startColony(`Room Test`);
        assert.equal(
            cResponse,
            `startColony Event successfully Observed`,
            `Commander startColony Event expected to immediately have been Observed: ${cResponse}`
        )
    })

    //sinon.restore();
});