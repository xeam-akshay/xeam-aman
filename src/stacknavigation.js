import * as React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  AppRegistry,
  Text,
  Dimensions,
  Picker
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpandableViewSeparate from './ExpandableViewSeparate';
import EmployeeDrawerNavigator from './EmployeeDrawerNavigator';
import LoginPage from './LoginPage';
import Welcomepage from './Dash Board/Welcomepage';

 const Stack = createStackNavigator();
 const Open = createDrawerNavigator();


function getExpandableView(props){
  let customVar = {
  
    customVariable: 1
  }
 
    return (
        <ExpandableViewSeparate navObj={props.navigation} abc={customVar.customVariable}/>
      );
};
function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        {getExpandableView(props)}
        
      </DrawerContentScrollView>
    );
  }
  export default class stack extends React.Component {
    toggleDrawer = () => {
      //Props to open/close the drawer
      const context=this;
       navigation.dispatch(DrawerActions.openDrawer());

    };
    render() {
      


  return (

    <NavigationContainer>

    <Stack.Navigator>
    {/* screens */}
    <Stack.Screen name="login" component={LoginPage} />
    <Stack.Screen name="First" component={Welcomepage} />
    
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}
}
