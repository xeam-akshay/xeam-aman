import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {cameraFile} from '../actions';
import {Header, getWidthnHeight, fontSize, CameraModal} from '../KulbirComponents/common';

class TestScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openCamera: false,
            commonModal: false,
            image: false,
            data: null,
            filePath: null
            };
        }

    componentDidMount() {
      const {addListener} = this.props.navigation;
      //console.log("CAMERA: ", this.props.navigation.actions, "\n", "NAVIGATION: ", this.props.navigation, "\n")
      this._unsubscribe = addListener('didFocus', async() => {
        console.log("GAINED FOCUS")
        if(this.props.file.file){
          this.setState({image: true})
          this.setState({data: this.props.file}, () => {
            if(this.state.data){
              this.props.cameraFile(null)
            }
            console.log("FILE: ", this.state.data)
          })
        }
      })
      }
  
      UNSAFE_componentWillUnmount(){
        this._unsubscribe().remove();
      }

    onDecline(){
      this.setState({commonModal: false})
    }

    render(){
        console.log("GET WIDTH and HEIGHT: ", getWidthnHeight(100, 100));
        console.log("GET WIDTH: ", getWidthnHeight(100), "OR", getWidthnHeight(100, undefined));
        console.log("GET HEIGHT: ", getWidthnHeight(undefined, 100));
        console.log("GET FONTSIZE: ", fontSize())
        console.log("***CAMERA: ", this.props.file, this.state.image)
        const circleWidth = getWidthnHeight(50)
        const circleHeight = {height: circleWidth.width}
        return (
            <View>
            <Header title="Test Screen" images={false} width={[{width: 160}, getWidthnHeight(40)]} menu="white"/>
              <View style={{alignItems: 'center', marginVertical: 20}}>
              {(!this.state.image)?
                <View style={[{borderRadius: 200, backgroundColor: '#69726F', alignItems: 'center', justifyContent: 'center'}, circleWidth, circleHeight]}>
                  <TouchableOpacity onPress={() => Actions.camera()}>
                    <Image source={require('../Image/white-camera.png')} style={{width: 45, height: 45}}/>
                  </TouchableOpacity>
                </View>
                : 
                <View style={[{borderRadius: circleWidth.width, backgroundColor: '#69726F', alignItems: 'center', justifyContent: 'center'}, circleWidth, circleHeight]}>
                  <TouchableOpacity onPress={() => Actions.camera()}>
                    <Image source={{uri: `${this.state.data.file.uri}`}} style={[{borderRadius: circleWidth.width}, circleWidth, circleHeight]}/>
                  </TouchableOpacity>
                </View>
              }
              </View>
              <Text>KULBIR</Text>
                
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnAlignment: {
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'flex-end',
       alignItems: 'center',
       marginBottom: 20,
       borderWidth: 1,
       borderColor: 'red', 
       width: 80,
       height: 50
     },
 });

const mapStateToProps = (state) => {
  //console.log("***Welcome***MAP STATE TO PROPS: ", state.cameraFile)
  return {
    file: state.cameraFile
  }
}

export default connect(mapStateToProps, {cameraFile})(TestScreen);