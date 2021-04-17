import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableNativeFeedback
} from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import { Hoshi } from 'react-native-textinput-effects';
import time from '../src/Image/menu.png'
import LeftSide from '../src/Image/side.png';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
        Prospect_name:'',
        button_value:'',
    };
  }


  render (){
         
  return (
    <View>
       <View style={styles.card_view_thrd}>
       <Image source={LeftSide} style={{left:'60%',bottom:'0%',height:'100%',width:50,borderColor:'black',alignItems:'center'}}/>
       </View>
                
    </View>
    );
}

}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  card_view_thrd: {
      
    
    top:'0%',
    right:'0%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 0,

    backgroundColor:'#3280e4',
    width:'40%',
    height: '20%',
    // shadowOffset:{  width: 100,  height: 100,  },
    // shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
},
});
