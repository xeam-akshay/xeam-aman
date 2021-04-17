import React, { Component } from 'react';
import {
    View,
  } from 'react-native';
  import App from '../App'
import App_sec from '../src/app2';
export default class name extends Component{
    render(){
        if(true){
          return(
            <App/>
          )
        }else{
          return(
            <App_sec/>
          )
        }

    }
}
