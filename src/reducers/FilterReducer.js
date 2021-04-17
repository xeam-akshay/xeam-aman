import {FILTERED_DATA} from '../actions/types';

export default (state = {filter: null}, action) => {
    switch(action.type){
        case FILTERED_DATA:
            console.log("FILTER REDUCER*******: ", action.payload)
            return {...state, filter: action.payload};
        default:
            return state;
    }
}