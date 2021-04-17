import {SEND_PROPS} from '../actions/types';

export default (state = {userObj: null}, action) => {
    switch(action.type){
        case SEND_PROPS:
            console.log("REDUCER SWITCH*******: ", action.payload)
            return {...state, userObj: action.payload};
        default:
            return state;
    }
}