import {
    SEND_PROPS, DISABLE_DRAWER,
    WAVEHEADER_HEIGHT, CAMERA, 
    SEARCH, FILTERED_DATA,
    TIME_PICKER, PREBID_TIME
} from './types';

export const sendProps = (userObj) => {
    console.log("*****ACTION: ", userObj)
    return {
        type: SEND_PROPS,
        payload: userObj
    };
};

export const disableDrawer = (drawerState) => {
    console.log("*****DRAWER ACTION: ", drawerState)
    return {
        type: DISABLE_DRAWER,
        payload: drawerState
    };
};

export const waveHeaderHeight = ({headerHeight, screenHeight}) => {
    console.log("*****WAVEHEADER_HEIGHT ACTION: ", headerHeight, screenHeight)
    return {
        type: WAVEHEADER_HEIGHT,
        payload: {headerHeight, screenHeight}
    };
};

export const cameraFile = (data) => {
    console.log("*****CAMERA ACTION: ", data)
    return {
        type: CAMERA,
        payload: data
    };
};

export const searchText = (text) => {
    console.log("*****SEARCH TEXT ACTION: ", text)
    return {
        type: SEARCH,
        payload: text
    };
};

export const filteredData = (data) => {
    console.log("*****FILTERED DATA ACTION: ", data)
    return {
        type: FILTERED_DATA,
        payload: data
    };
};

export const show_HideTimePicker = (time) => {
    console.log("*****TIME PICKER ACTION: ", time)
    return {
        type: TIME_PICKER,
        payload: time
    };
};

export const prebidTime = (time) => {
    console.log("*****PREBID ACTION: ", time)
    return {
        type: PREBID_TIME,
        payload: time
    };
};
