import React, {Component} from 'react';

import {StyleSheet, View, TextInput, Image ,Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const BACKGROUND = 'rgb(19,111,232)';



const Morph = ({ children }) =>{
    return(
    <View style={styles.morph}>{children}</View>
    )
}


export default class one extends Component {

  render() {
    return (
      <View style={styles.baseView}>
          <Morph>
       <Text>Naveen</Text>
       </Morph>
        
       <Morph>
       <Text>Subhash</Text>
       </Morph>

       <Morph>
       <Text>Jarwal</Text>
       </Morph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    morph:{
        backgroundColor: BACKGROUND,
        margin:5
    },
    baseView:{
       flex:1,
       flexDirection:'column',
       alignItems:'center',
       justifyContent:'center' ,
       
    }
  
});
