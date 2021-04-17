import React, {Component} from 'react';
import {TouchableOpacity, View, Alert, StyleSheet, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { getWidthnHeight } from './width';
import {cameraFile} from '../../actions';

class Camera extends Component {
    constructor(props) {
    super(props);
    this.state = {
        takingPic: false,
        toggleCamera: false,
        };
    }

    takePicture = async () => {
        console.log("Touched Camera")
        const {imageQuality = null, width = null, height = null} = this.props;
        if (this.camera && !this.state.takingPic) {
    
          let options = {
            quality: (this.state.toggleCamera)? (imageQuality)? imageQuality : 0.25 : 0.50,
            fixOrientation: true,
            forceUpOrientation: true,
            width: (width)? width : 400,
            height: (height)? height : 500,
          };
          console.log("Camera Quality: ", options.quality, options.width, options.height)
          this.setState({takingPic: true});
    
          try {
            const data = await this.camera.takePictureAsync(options);
            //Alert.alert('Success', JSON.stringify(data));
            this.props.cameraFile(data)
            Actions.pop();
          } catch (err) {
            Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
            return;
          } finally {
            this.setState({takingPic: false});
          }
        }
      };

    render() {
        const {style} = this.props;
        console.log("CAMERA COMPONENT")
    return (
        <View style={{alignItems: 'center'}}>
                <RNCamera 
                ref={ref => {
                    this.camera = ref;
                }}
                captureAudio={false}
                style={[{borderWidth: 0, borderColor: 'white'},style]}
                type={(this.state.toggleCamera)? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}>
                <TouchableOpacity style={{marginLeft: 10, marginTop: 10, borderColor: 'white', borderWidth: 0, width: 40, height: 40}} onPress={() => Actions.pop()}>
                    <Image source={require('../../Image/back-button.png')}/>
                </TouchableOpacity>

                <View style={[{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}, style]}>
                    <TouchableOpacity style={[{alignItems: 'center', borderWidth: 0, borderColor: 'white', bottom: '15%'}, getWidthnHeight(20)]} onPress={this.takePicture.bind(this)}>
                        <Image source={require('../../Image/capture.png')} style={{width: 60, height: 60}}/>
                    </TouchableOpacity>
                </View>

                <View style={{marginLeft: 10, marginBottom: 0, borderWidth: 0, borderColor: 'white', width: 35, height: 32, bottom: '12%'}}>
                    <TouchableOpacity onPress={() => this.setState({toggleCamera: !this.state.toggleCamera})}>
                        <Image source={require('../../Image/switch.png')}/>
                    </TouchableOpacity>
                </View>
            </RNCamera>
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
         },
     });


const CameraComponent = connect(null, {cameraFile})(Camera);
export {CameraComponent as Camera};