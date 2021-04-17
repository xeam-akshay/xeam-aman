import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class ExampleApp extends PureComponent {

    static propTypes = {
        containerStyle: PropTypes.style,
        style: PropTypes.style,
        autoFocus: PropTypes.bool,
        editbale: PropTypes.bool,
        textColor: PropTypes.string,
        onChangeText: PropTypes.func,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        lable:PropTypes.string,
        title:PropTypes.string,
        onPress: PropTypes.func,
        source: PropTypes.node.isRequired
      }



    constructor() {
        super();
        this.state = {
          image:'',
          preview:'false',
          navigateComponent:"",
          type:''
        };
      }

      componentDidMount(){
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener("focus", () => {
            this.rootComponent()
         this.setState({preview:false})
        })
        
       }
      
       componentWillUnmount(){
        this._unsubscribe();
      }
rootComponent(){
    const context=this;
  var navigateComponent = (context.props.route.params.navigateComponent);
  var type = (context.props.route.params.type);
   this.setState({navigateComponent:navigateComponent})
   this.setState({type:type})
   console.log("type",type)
   console.log("navigateComponent",navigateComponent)
}
  render() {
      const _this=this;
      const typeCam = this.state.type;
    return (
      <View style={styles.container}>
          
           
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.typeCam}
          flashMode={RNCamera.Constants.FlashMode.off}
          
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => {this.takePicture(camera)}} style={styles.capture}>
        <Text style={{ fontSize: 14 }}> SNAP </Text>
      </TouchableOpacity>
              </View>
             
            );
          }}
        </RNCamera>
        {this.state.preview == true ? 
                   <View>
                  <Image source={{uri:this.state.image}} style={{height:'100%',width:'100%'}}/>
                  <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      
                      <TouchableOpacity style={{bottom:150}} onPress={()=>this.setState({preview:false})}>
                  <Image source={require('../Image/delete-512.png')} style={{height:60,width:60}}/> 
                  </TouchableOpacity>
                  <TouchableOpacity style={{bottom:150}} onPress={() =>this.props.navigation.navigate((this.state.navigateComponent),{image:this.state.image,status:true})}>
                  <Image source={require('../Image/checked-480.png')} style={{height:60,width:60}}/> 
                  </TouchableOpacity>
                  </View>
                  </View>
         :null  }
      </View>
    );
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: false,width: 1080,
        fixOrientation: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data);
    this.setState({image:data.uri})
    this.setState({preview:true})
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});