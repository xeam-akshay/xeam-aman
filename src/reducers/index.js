import {combineReducers} from 'redux';
import userObj from './PropReducer';
import drawer from './disableDrawer';
import heightData from './WaveHeaderHeight';
import file from './CameraFile';
import search from './SearchReducer';
import filter from './FilterReducer';
import timePicker from './CloseTimePicker';
import preBid from './prebid';
export default combineReducers({
    props: userObj,
    enableDrawer: drawer,
    waveHeaderHeight: heightData,
    cameraFile: file,
    inputText: search,
    filteredNames: filter,
    timePickerModal: timePicker,
    preBidTime: preBid
});