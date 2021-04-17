import React from 'react';
import {
          AsyncStorage,
        Dimensions,
        FlatList,
        Alert,
        PermissionsAndroid,
        ActivityIndicator,
        Image,
        StyleSheet,
        Text,
        TouchableOpacity,
        View,
        KeyboardAvoidingView,
        ImageBackground,
        ScrollView,
        } from 'react-native';
        
 // import {ListView} from 'deprecated-react-native-listview';
import ImagePicker from 'react-native-image-picker';
import Base_url from './Base_url';
import Button from 'react-native-button';
import {
          Card,
          CardImage,
          CardTitle,
          CardContent,
          CardAction,
        } from 'react-native-card-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import DatePicker from 'react-native-datepicker';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import Monthlyreport from './Attendance Management/My_Attendance';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class monthlyreport extends React.Component {
  static navigationOptions = {

    headerLeft: null,
    headerStyle: {
                  backgroundColor: '#0080FF',
                  borderBottomColor: '#b3b3b3',
                  borderBottomWidth: 3,
                  height:80,
                  },
   headerTintColor: '#fff',
   headerTitleStyle: {
                      justifyContent:'center',
                      textAlign:'center',
                      fontWeight: 'bold',
                      width:viewportWidth/1.1,
                    },
  };


  render() {
const card = {card: {width:viewportWidth, height:viewportHeight,}};
const context=this;
//  var lmb = JSON.parse(context.props.navigation.state.params.response);
// console.log(lmb);
    return (

         <View style={styles.pagecomponent}>
         <Monthlyreport/>
      </View>
    );
}
}

const styles = StyleSheet.create({
  button: {
zIndex: 100,

    color: '#DCE4EF',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgb(19,111,232)',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 0,
  },
  CardView: {
    marginTop:200,
    flex:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'rgb(0,0,0)',
    width:viewportWidth/1.03,
    height: viewportHeight / 1.5,
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  pagecomponent: {
    marginTop:10,
    flex:0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f0efed',
    borderRadius: 10,
    borderTopWidth: 1.5,
    borderBottomWidth:1.5,
    borderRightWidth:1.5,
    borderLeftWidth:1.5,
    borderColor: 'transparent',
    width:viewportWidth/1,
    // height: '30%',
    // shadowOffset:{  width: 100,  height: 100,  },
    shadowColor: '#330000',
    shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width:viewportWidth,
    height:viewportHeight
  },
  info: {
    width:'20%',
        flexGrow: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 15,

    },
  // commentbox: {
  //   widht:20,
  //   height:10,
  //   margin:4,
  //   shadowOffset:{  width: 100,  height: 100,  },
  //   shadowColor: '#330000',
  //   shadowOpacity: 0,
  //   shadowRadius: 5,
  //   elevation: 10,
  // },

});
