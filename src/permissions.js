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
  Alert
} from 'react-native';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class Leaves extends Component {
  constructor(props){
        super(props)
            this.state={
                          successToken:'',
                          userName:'',
                          loading: false,
                          permissions:''
                        }
}
  static navigationOptions = {

                  };

componentDidMount(){

this.value().done();
}
value=async()=>{

  var user_token= await AsyncStorage.getItem('user_token');
  var permissions_fir= JSON.parse(user_token);
  var permissions_sec=permissions_fir.success.user.permissions;
  if(permissions_sec[5]){
  var date_one ="";
    for (i = 3; i < 4; i++) {
        date_one += permissions_sec[i].split('').join('')+'\n'+'\n';
    };
    this.setState({permissions:date_one});
  }else{
    var date_sec ='';
      for (i = 1; i < permissions_sec.length; i++) {
          date_sec += permissions_sec[i].split('').join('')+'\n'+'\n';
      };
      this.setState({permissions:date_sec});
  }

console.log(user_token);

}

renderField(){

}
render(){
  const {permissions} = this.state;
		return(
           <View style={{alignItems:'center',height:'20%',bottom:20,left:15}}>
             <Text style={{fontSize: 18,left:30,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>
                  {permissions}
             </Text>
           </View>

      );
    }
  }

  const styles = StyleSheet.create({



  });
