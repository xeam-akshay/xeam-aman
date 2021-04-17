import React, { Component } from 'react';
import {Text, View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import {getWidthnHeight} from './width';

const calculate = Dimensions.get('window')

class PlainHeader extends Component{
  state = {
    dimensions: undefined,
    title: undefined,
  }

  onLayout = (event) => {
    if(this.state.dimensions){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({dimensions: {width, height}})
  }

  secondLayout = (event) => {
    if(this.state.title){
      return;
    }
    let width = Math.round(event.nativeEvent.layout.width)
    let height = Math.round(event.nativeEvent.layout.height)
    let data = event.nativeEvent.layout
    this.setState({title: {width, height}})
  }

  fontSizeH3 = () => {
    const getWidth = calculate.width;
    let font_Size = null;
    if(getWidth < 360){
        font_Size = {fontSize: 14}
        return font_Size;
    } else {
        font_Size = {fontSize: 20}
        return font_Size;
    }
  }

  render() {
  const {title, width, onPress, headerHeight} = this.props;
  const {linearGradient, textBackground} = styles;
  let marginTop = null;
  let second = null;

  if(this.state.dimensions){
    marginTop = {marginTop: Math.round(this.state.dimensions.height/4)}
    console.log("MARGIN TOP: ", this.state.dimensions)
  }

  if(this.state.title){
    second = {marginTop: Math.round((-1) * (this.state.title.height/2))}
  }
  
  return (
    <View>
      <View style={[{borderColor: 'black', borderWidth: 0}, getWidthnHeight(100)]} onLayout={this.onLayout}>
        <View>  
          <LinearGradient 
            start={{x: -2.0, y: 1.5}} 
            end={{x:0.8, y: -2.0}} 
            colors={['#F71A1A', '#E1721D']} 
            style={[linearGradient, getWidthnHeight(100, 10), headerHeight]} 
            onLayout={this.onLayout} />
            <View style={[{position: 'absolute'}, marginTop]}>
                <TouchableOpacity  onPress={onPress}>
                  <Image
                    source={require('../../Image/left.png')}
                    style={{ width: 25, height: 25, marginLeft: 10}}
                  />
                </TouchableOpacity>
            </View>
        </View>
      </View>
      <View style={[textBackground, width, second]} onLayout={this.secondLayout}>
      {(this.state.title) ?
        <View style={{alignItems: 'center'}}>
          <LinearTextGradient
            style={[{ fontWeight: "bold", textAlign: 'center' }, width, this.fontSizeH3()]}
            locations={[0, 1]}
            colors={['#F71A1A', '#E1721D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
              <Text>{title}</Text>
          </LinearTextGradient>
        </View>
        : null
      }
      </View>
    </View>
  )};
};

const styles = {
  container: {
    shadowColor: 'black',
    elevation: 8,
    position: 'relative',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95,
    borderBottomLeftRadius:25,
    borderBottomRightRadius: 25
  },
  textBackground: {
    // flexDirection:'column',
    // alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'center', 
    marginTop: 0, 
    backgroundColor: 'white',
    width: 180,
    height: 40,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 10,
    //position: 'absolute',
  },
  imageStyle: {
    justifyContent: 'flex-start',
    position: 'absolute',
    marginTop: 25,
    marginLeft: 10,
    width: 70,
    height: 50
  },
  target321: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.12,
    width: 40,
    height: 40,
    marginTop: 15
  },
  target322: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.12,
    width: 30,
    height: 30,
    marginTop: 15
  },
  target641: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.11,
  },
  target642: {
    borderColor: 'black',
    borderWidth: 0,
    opacity: 0.11,
    width: 80,
    height: 80,
    marginTop: 15
  },
};

export {PlainHeader};
