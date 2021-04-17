import {PREBID_TIME} from '../actions/types';

export default (state, action) => {
    switch(action.type){
        case PREBID_TIME:
            return {...state, preBid: action.payload}
        default:
            return {...state, preBid: {'fromTime': null, 'toTime': null}};
    }
}