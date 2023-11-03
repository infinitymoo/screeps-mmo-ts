//Library Imports
import * as _ from 'lodash';
import 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';

//App Imports
import { StateMachine } from '../../app.state-machine';
//import '../mock/globals.mock'

describe(`StateMachine Initialization`, () => {

    var stateMachine = StateMachine.getInstance(true);

    beforeEach(() => {

    })

    it(`should have stateContainers in its state`, () => {

        assert.isAbove(
            stateMachine.stateContainerList.length,
            0
        );
        assert.containsAllDeepKeys(
            stateMachine.readState(),
            stateMachine.stateContainerList,
            `should have all the keys hardcorded in stateContainerList: ${JSON.stringify(stateMachine.readState())}`
        );

    })
});