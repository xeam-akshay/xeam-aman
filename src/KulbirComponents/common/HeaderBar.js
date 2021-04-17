import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Header} from 'react-native-elements';
import {MenuIcon, Title} from './HeaderComponents';

const HeaderBar = ({navigation, title}) => {
  //console.log(navigation)
    return (
        <Header
          leftComponent={<MenuIcon navigation={navigation}/>}
          centerComponent={<Title name={title}/>}
          rightComponent={null}
          containerStyle={{backgroundColor:'rgb(19,111,232)', marginTop: 6}}
        />
    );
}

export {HeaderBar};