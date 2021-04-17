import {WAVEHEADER_HEIGHT} from '../actions/types';

export default (state = null, action) => {
    switch(action.type){
        case WAVEHEADER_HEIGHT:
            console.log("REDUCER WAVEHEADER_HEIGHT*******: ", action.payload)
            const headerHeight = action.payload.headerHeight;
            const screenHeight = action.payload.screenHeight;
            console.log("REDUCER SOLVED")
            return {...state, "headerHeight": headerHeight, screenHeight}
        default:
            return state;
    }
}