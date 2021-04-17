import React, {Component} from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import {SegmentedControls} from 'react-native-radio-buttons';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import Base_url from './Base_url';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      update_comment: [],
      name: '',
      task_id: '',
      open: false,
      update: '',
    };
  }
  show_data() {
    const _this = this;
    _this.hideLoader();
    this.taskUpdate().done();
    this.value().done();
  }
  //   shouldComponentUpdate(nextProps,nextState){

  //       if(nextProps.route.params.id != this.props.route.params.id){
  //     this.taskUpdate().done();
  //     this.value().done();
  //       return true;
  //       }

  //     return false;
  // }

  hideLoader = () => {
    this.setState({loading: false});
  };

  showLoader = () => {
    this.setState({loading: true});
  };

  taskUpdate = async () => {
    const update = '5';
    this.setState({update: update});
    const context = this;
    const _this = this;
    this.showLoader();
    console.log('update_task');
    var user_token = await AsyncStorage.getItem('user_token');
    var permissions_fir = JSON.parse(user_token);
    var permissions_sec = permissions_fir.success.secret_token;
    var task_id = JSON.parse(context.props.route.params.id);
    console.log(task_id);
    var data = new FormData();
    data.append('task_id', task_id);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200) {
        _this.hideLoader();
        var json_obj = JSON.parse(xhr.responseText);
        var update_comment = json_obj.success.task.task_updates;
        console.log('update_comment', update_comment);
        context.setState({update_comment: update_comment});
      } else {
        // console.log(xhr.responseText)
        Alert.alert('No data found');
        _this.hideLoader();
      }
    });

    xhr.open('POST', 'http://erp.xeamventures.com/api/v1/task-detail');
    xhr.setRequestHeader('Authorization', 'Bearer ' + permissions_sec);
    xhr.send(data);
  };
  value = async () => {
    var value = await AsyncStorage.getItem('userObj');
    var user_token = await AsyncStorage.getItem('user_token');
    var permissions_fir = JSON.parse(user_token);
    var userObj = JSON.parse(value);
    const name = userObj.success.user.employee.fullname;
    this.setState({name: name});
    if (userObj !== null) {
      var profile_picture = {
        uri: userObj.success.user.employee.profile_picture,
      };
      this.setState({image: profile_picture});
    } else userObj === null;
  };
  back() {
    const context = this;
    context.props.navigation.navigate('Task');
  }
  render() {
    const context = this;
    const pic = this.state.image;

    return (
      <View
        style={{
          height: viewportHeight,
          width: viewportWidth,
          backgroundColor: 'white',
        }}>
        <View style={{backgroundColor: 'rgb(19,111,232)', height: '10%'}}>
          <View style={{left: '12%', top: '36%'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Task Update
            </Text>
          </View>
          <TouchableOpacity
            style={{right: '0%', top: '0%'}}
            onPress={() => this.back()}>
            {/*Donute Button Image */}
            <Image
              source={require('../src/Image/back.png')}
              style={{width: 25, height: 25, marginLeft: 10, top: 0}}
            />
          </TouchableOpacity>
        </View>
        <View style={{height: '85%'}}>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'transparent',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              margin: 10,
              height: '8%',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'black',
              // shadowOpacity: 0,
              //  shadowRadius: 20,
              elevation: 3,
            }}>
            <Text>View Task Update</Text>
            <TouchableOpacity
              style={{left: 40}}
              onPress={() => {
                this.show_data();
              }}>
              <Text
                style={{
                  backgroundColor: 'rgb(19,111,232)',
                  borderRadius: 5,
                  color: 'white',
                  paddingLeft: 5,
                  paddingRight: 5,
                }}>
                Show Data
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.loading ? (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '45%',
                backgroundColor: '#EFEFEF',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                height: '8%',
                shadowOffset: {width: 100, height: 100},
                shadowColor: '#330000',
                shadowOpacity: 0,
                shadowRadius: 5,
                elevation: 10,
                left: '25%',
                top: '25%',
              }}>
              <ActivityIndicator size="large" color="rgb(19,111,232)" />
              <Text style={{fontSize: 15, left: 10}}>Loading..</Text>
            </View>
          ) : null}

          {this.state.update_comment == '' ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                top: '50%',
              }}>
              <Text style={{fontSize: 18, color: '#adadad'}}>No data</Text>
            </View>
          ) : (
            <ScrollView>
              {this.state.update_comment.map(item => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Image
                        source={this.state.image}
                        style={{
                          left: '5%',
                          bottom: 0,
                          height: 40,
                          width: 40,
                          borderRadius: 75,
                          alignItems: 'center',
                          borderColor: 'transparent',
                          borderWidth: 1,
                          top: '25%',
                        }}
                      />
                    </View>
                    <View style={{width: '80%', left: '10%', top: '5%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'rgb(19,111,232)'}}>
                          {this.state.name}
                        </Text>
                        <Text style={{marginLeft: '45%'}}>
                          {item.created_at.substring(11, 16)}
                        </Text>
                      </View>
                      <View>
                        <Text>
                          {item.comment} {'\n'}
                          {'\n'}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </View>
    );
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
