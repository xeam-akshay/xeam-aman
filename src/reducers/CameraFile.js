import {CAMERA} from '../actions/types';

export default (state = {file: null}, action) => {
    switch(action.type){
        case CAMERA:
            console.log("CAMERA REDUCER SWITCH*******: ", action.payload)
            return {...state, file: action.payload};
        default:
            return state;
    }
}