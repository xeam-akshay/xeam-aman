//This is an example code for NavigationDrawer//
import React, { Component } from 'react';
//import react in our code.
import { View, Image, TouchableOpacity } from 'react-native';
// import all basic components

//For React Navigation 3+
//import {
//  createStackNavigator,
//  createDrawerNavigator,
//  createAppContainer,
//} from 'react-navigation';

//For React Navigation 4+
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { DrawerItems } from 'react-navigation-drawer';
import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
import Hay from './hayPage';
import Welcomepage from './Dash Board/Welcomepage';
// import CameraPage from '../src/CameraPage';
// import Screen3 from './src/pages/Screen3';
// import Login from './src/loginpage';

class NavigationDrawerStructure extends Component {
  static navigationOptions = {
     header: null,
  };
//   componentDidMount = () => {
//     const context=this;
// const userObj = JSON.parse(context.props.navigation.state.params.userObj);
// // const userName={fullname:userObj.success.user.employee.fullname}
// console.log(userObj.success.user.employee.fullname);
// };

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();


  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./Image/menu.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Hay,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#0080FF',
      },
      headerTintColor: '#fff',
    }),
  },
});
const SecondActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Second: {
    screen: Welcomepage,
    navigationOptions: ({ navigation }) => ({
      title: 'Demo Screen',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#0080FF',
      },
      headerTintColor: '#fff',
    }),
  },
});




const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Screen1: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Demo Screen 1',
    },
  },
  Screen2: {
    //Title
    screen: SecondActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Welcomepage',
    },
  },


});

export default createAppContainer(DrawerNavigatorExample);
