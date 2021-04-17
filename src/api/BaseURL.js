import {AsyncStorage} from 'react-native';

//////////////////////////////////////////////////////////////////////////////////////
//LIVE SERVER
export const login = 'http://www.erp.xeamventures.com/api/v1'

export const extractBaseURL = async() => AsyncStorage.getItem('receivedBaseURL');
//////////////////////////////////////////////////////////////////////////////////////


//==================================================================================//


/////////////////////////////////////////////////////////////////////////////////////
//TEST SERVER
//export const login = 'http://www.xeambpo.com/centralDb/api/v1';

//export const extractBaseURL = async() => AsyncStorage.getItem('receivedBaseURL');
/////////////////////////////////////////////////////////////////////////////////////