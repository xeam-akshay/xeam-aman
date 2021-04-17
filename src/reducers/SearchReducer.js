import {SEARCH} from '../actions/types';

export default (state = {text: null}, action) => {
    switch(action.type){
        case SEARCH:
            console.log("SEARCH REDUCER*******: ", action.payload)
            return {...state, text: action.payload};
        default:
            return state;
    }
}