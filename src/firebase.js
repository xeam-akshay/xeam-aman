import RNFirebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

// const configurationOptions = {
//   debug: true,
//   promptOnMissingPlayServices: true
// }

const androidCredentials = {
  clientId: "729528596235-60vuhdrrkh73i0tpobmeri4v6oq2vo00.apps.googleusercontent.com",
  appId: "1:729528596235:android:4fc2ab5883fe5642a7940e",
  apiKey: "AIzaSyC6LEdNt4kLlBx-ZZo-hAGmcVV6VadEy7I",
  databaseURL: "https://xenia-a8cbc.firebaseio.com",
  storageBucket: "xenia-a8cbc.appspot.com",
  messagingSenderId: "729528596235",
  projectId: "xenia-a8cbc",
};

// Your secondary Firebase project credentials for iOS...
const iosCredentials = {
  clientId: "729528596235-s03n25vtq9cbudksv4fgf9o5ldlf69nt.apps.googleusercontent.com",
  appId: "1:729528596235:ios:73393fd979e69f3ea7940e",
  apiKey: "AIzaSyC_7AHgklFbRu1msb0DHJR5JrCEIvqKnM4",
  databaseURL: "https://xenia-a8cbc.firebaseio.com",
  storageBucket: "xenia-a8cbc.appspot.com",
  messagingSenderId: "729528596235",
  projectId: "xenia-a8cbc",
};

// Select the relevant credentials
const credentials = Platform.select({
  android: androidCredentials,
  ios: iosCredentials,
});

const config = {
  name: "SECONDARY_APP",
};

let firebase = null;

if (!RNFirebase.apps.length) {
  firebase = RNFirebase.initializeApp(credentials, config)
  //console.log("FIREBASE INITIALIZE: ", firebase);
}else {
  firebase = RNFirebase.app(); // if already initialized, use that one
}

export default firebase;
