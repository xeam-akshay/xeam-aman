import React, { Component } from 'react';
import { StyleSheet, View, Button, Image,Text,TouchableWithoutFeedback } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Base_url from '../src/Base_url';
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }
value(){
  console.log("asfdklajflkadjfklajdlkjakjal")
}
  render() {
  const options = [
    "Option 1",
    "Option 2"
  ];

  function setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  }

  function renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold'} : {};

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

  function renderContainer(optionNodes){
    return <View>{optionNodes}</View>;
  }

  return (
    <View style={{margin: 20,top:'30%'}}>
    <SegmentedControls
          tint={'#f80046'}
          selectedTint= {'white'}
          backTint= {'#1e2126'}
          options={ options }
          onPress={()=>this.value}
          allowFontScaling={ false } // default: true
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedOption }
          optionStyle={{fontFamily: 'AvenirNext-Medium'}}
          optionContainerStyle={{flex: 1}}
/>
      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
    </View>);
}

}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
});
