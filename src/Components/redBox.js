import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import AnimatedInput from "react-native-animated-input";
import PropTypes from 'prop-types';

export default class GradientButton extends Component {
  constructor(props){
    super(props)
      this.state = {
        email:''
      }
  }

  static propTypes = {
    containerStyle: PropTypes.style,
    style: PropTypes.style,
    TextStyle: PropTypes.style,
    image:PropTypes.style,
    autoFocus: PropTypes.bool,
    editbale: PropTypes.bool,
    textColor: PropTypes.string,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    lable:PropTypes.string,
    title:PropTypes.string,
    onPress: PropTypes.func,
    clear: PropTypes.string,
    source: PropTypes.any.isRequired
  }

    render (){
      const {value, contentStyle = null, inputStyle = null} =this.props;
      return(
            <View style={[styles.box,this.props.style]}>
                <AnimatedInput
                    placeholder={this.props.placeholder}
                    errorText="Error"
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    styleLabel={{color: (value || value !== ' ')? '#E5214E' : 'grey',borderWidth: 0, borderColor: 'green'}}
                    // ref={this.props.clear}
                    styleBodyContent={styles.inputBox}
                    styleInput={[{borderWidth: 0, borderColor: 'red', fontSize: 14}, inputStyle]}
                    styleContent={[{borderWidth: 0, borderColor: 'blue'}, contentStyle]}
                />
            </View>
        
      );
    }
}

  const styles = StyleSheet.create({
    box:{
      borderWidth:1,
      borderColor:'grey',
      borderRadius:10,
    },
    inputBox:{
      //width:'90%',
      borderBottomWidth: 0,
    },
    image:{
      backgroundColor:'white'
    }
  });
