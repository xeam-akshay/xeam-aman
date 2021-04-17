import {DISABLE_DRAWER} from '../actions/types';

export default (state, action) => {
    switch(action.type){
        case DISABLE_DRAWER:
            console.log("****DISABLE DRAWER****: ", action.payload)
            return {...state, drawer: action.payload}
        default:
            return {...state, drawer: false};
    }
}