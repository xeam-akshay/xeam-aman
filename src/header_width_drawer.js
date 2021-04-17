import React, { Component } from 'react';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image
} from 'react-native';

export default class Header_Drawer extends Component {
  static navigationOptions = {
      // headerBackground:<View style={{alignItems:'center',justifyContent:'center'}}><Image source={Logo} style={{height:30,width:120,marginTop:20,}}/></View>,

                  };

        constructor(props){
              super(props)
                  this.state={
                                successToken:'',
                                userName:'',
                                loading: false,
                                device:'',
                                deviceVersion:''
                              }
  }
    render(){
      const context=this;

        return (

          <TouchableOpacity style={{right:'30%',top:'20%'}} onPress={() => context.props.navigation.toggleDrawer()}>
                      {/*Donute Button Image */}
                      <Image
                        source={require('../src/Image/menu.png')}
                        style={{ width: 35, height: 35, marginLeft: 10,top:0 }}
                      />
                    </TouchableOpacity>

      )
    }
}
