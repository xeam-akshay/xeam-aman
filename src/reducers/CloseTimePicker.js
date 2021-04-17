import {TIME_PICKER} from '../actions/types';

export default (state, action) => {
    switch(action.type){
        case TIME_PICKER:
            console.log("****TIME PICKER REDUCER****: ", action.payload)
            return {...state, timePicker: action.payload}
        default:
            return {...state, timePicker: {'fromTime': null, 'toTime': null}};
    }
}