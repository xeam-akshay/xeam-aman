import React from 'react';
import {

  FlatList,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import Base_url from './Base_url';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export default class showmonthlyreport extends React.Component {
  static navigationOptions = {
                              title: "Monthly Report",
                              headerStyle: {
                              backgroundColor: '#0080FF',
                              borderBottomColor: '#b3b3b3',
                              borderBottomWidth: 3,
                              height:80,
                            },
                              headerTintColor: '#fff',
                              headerTitleStyle: {
                              justifyContent:'center',
                              textAlign:'center',
                              fontWeight: 'bold',
                              width:'70%',
                            },
                          };

  constructor(props) {
                        super(props)
                        this.state = {
                                        abc:[],
                                      };
                      }



  render() {
          // const {status} = this.state;
          const {navigate} = this.props.navigation;
          const context=this;
          const card = {card: {width: viewportWidth, height: viewportHeight}};
          var abc = JSON.parse(context.props.navigation.state.params.abc);
          var data= abc.success.user.monthly_data;
          var data_one= abc.success.user.monthly_data;
          var profile_picture={uri:abc.success.user.employee.profile_picture};
          console.log(abc.success.user.employee.fullname)
          // var length=2;


    var date ="";
      for (i = 0; i < data.length; i++) {
          date += data[i].on_date.split('').join('')+'\n'+'\n';
      };
          var status ="";
            for (i = 0; i < data_one.length; i++) {
                status += data_one[i].status.split().join('')+'\n'+'\n';

            };

              var first_punch ="";
                for (i = 0; i < data.length; i++) {
                    first_punch += data[i].first_punch.split().join('')+'\n'+'\n';
                };
                      var last_punch ="";
                        for (i = 0; i < data.length; i++) {
                            last_punch += data[i].last_punch.split().join('')+'\n'+'\n';
                        };


    return (
      <Card>
            <CardImage>
            <Image source={profile_picture} style={{bottom:0,height:viewportHeight/7,width:viewportWidth/4,borderRadius:75,borderColor:'black',alignItems:'center'}}/>
            </CardImage>
            <Text style={{fontSize:20, color: 'black',bottom:'5%',alignItems: 'center',textAlignVertical:'center',textAlign:'right'}}>{abc.success.user.employee.fullname}</Text>
            <View style={styles.drowline}>
            </View>
            <View style={styles.card_view}>
            <Text style={{color:'#fcfeff',right:5}}>Monthly Days Details</Text>
            </View>
            <View style={styles.CardView}>
            <View style={{marginTop:'2%',marginBottom:'2%',backgroundColor:'#cdcfd1',height:'15%',width:'100%',borderRadius: 0}}>
            <Text style={{top:'30%',left:'5%',fontSize:14,fontWeight: 'bold',textAlign:'justify',height:viewportHeight/40,}}>Date</Text>
            <Text style={{bottom:'5%',left:'30%',fontSize:14,fontWeight: 'bold',textAlign:'justify',height:viewportHeight/40,}}>Status</Text>
            <Text style={{bottom:'35%',left:'50%',fontSize:14,fontWeight: 'bold',textAlign:'justify',height:viewportHeight/40,}}>First Punch</Text>
            <Text style={{bottom:'70%',left:'75%',fontSize:14,fontWeight: 'bold',textAlign:'justify',height:viewportHeight/40,}}>Last Punch</Text>
            </View>

<ScrollView contentContainerStyle={{flexGrow:1}}style={{width:viewportWidth,height:0}}>
            <View style={{left:10}}>
                  <Text>{date}{'\n'}</Text>
                  </View>
                        <View style={{left:'30%',bottom:'25.1%'}}>
                            <Text>{status}{'\n'}</Text>
                                </View>
                                    <View style={{left:'51%',bottom:'50.1%'}}>
                                    <Text>{first_punch}{'\n'}</Text>
                                </View>
                        <View style={{left:'76%',bottom:'75.3%'}}>
                  <Text>{last_punch}</Text>
            </View>
      </ScrollView>
    </View>
</Card>
                  );
            }
        }
const styles = StyleSheet.create({
  button: {
            marginBottom:0,
            color: '#DCE4EF',
            paddingTop:10,
            paddingBottom:10,
            paddingLeft:20,
            paddingRight:20,
            backgroundColor:'rgb(19,111,232)',
            borderRadius:10,
            borderWidth: 1,
            borderColor: 'rgb(0,0,0)'
          },
  CardView: {
              marginTop:0,
              flex:0,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 0,
              borderTopWidth: 1.5,
              borderBottomWidth:1.5,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              borderColor: 'rgb(19,111,232)',
              width:viewportWidth,
              height: '60%',
              // shadowOffset:{  width: 100,  height: 100,  },
              // shadowColor: '#330000',
              shadowOpacity: 0,
              // shadowRadius: 0,
              // elevation: 5,
            },
  card_view: {
              marginBottom:'2%',
              right:'31%',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomEndRadius: 150,
              borderTopWidth: 1.5,
              borderBottomWidth:1,
              borderRightWidth:1.5,
              borderLeftWidth:1.5,
              borderColor: 'rgb(19,111,232)',
              backgroundColor:'rgb(19,111,232)',
              width:'40%',
              height: '7%',
              // shadowOffset:{  width: 100,  height: 100,  },
              // shadowColor: '#330000',
              shadowOpacity: 0,
              // shadowRadius: 0,
               elevation: 5,
             },
  drowline: {
              bottom:10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:'#cdcfd1',
              width:'100%',
              height: '0.1%',
              // shadowOffset:{  width: 100,  height: 100,  },
              // shadowColor: '#330000',
              shadowOpacity: 0,
              // shadowRadius: 0,
              elevation: 1,
            },
  info: {
              flex:2,
              flexDirection:'column',
              marginLeft: 0,
            },
    title: {
              flex:2,
              textAlign:'justify',
              width:100,
              fontSize: 14,
            },
});
