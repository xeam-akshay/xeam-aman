  import React, {Component} from 'react';
  
  import {
    AsyncStorage,
    StyleSheet,
    KeyboardAvoidingView,
    View,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    AppRegistry,
    Text,
    Dimensions,
    Picker
  } from 'react-native';
  import {
    Card,
  } from 'react-native-card-view';
  import {createAppContainer,createSwitchNavigator} from 'react-navigation';
  import { createDrawerNavigator } from 'react-navigation-drawer';
  import ExpandableViewSeparate from './src/ExpandableViewSeparate';
  import { DrawerItems } from 'react-navigation-drawer';
  import {createStackNavigator,StackNavigator} from 'react-navigation-stack';
  import Attendance from './src/Attendance_first';
  import LoginPage from './src/LoginPage';
  import Welcomepage from './src/Dash Board/Welcomepage';
  import CameraPage from './src/Attendance Module/CameraPage';
  import Drawer from './src/drawer';
  import DashBoard from './src/DashBoard';
  import Monthlyreport from './src/Attendance Management/My_Attendance';
  import ShowMonthlyReport from './src/ShowMonthlyReport';
  import Flat from './src/flatlist';
  import Checkoutpage from './src/Attendance Module/checkOutPage';
  import Leaves from './src/Attendance Management/Employee_Attendance';
  import Task from './src/Task Management/Task';
  import Permission from './src/permissions';
  import CustomSidebarMenu from './src/CustomSideBarMenu';
  import AttendanceDetail from './src/Attendance Management/Team_Attendance';
  import SelfAttendanceDetail from './src/self_attendance_detail';
  import Hay from './src/hayPage';
  import LeaveSection from './src/Leave Management/Applied_Leave';
  import LogOutPage from './src/LogOutPage';
  import AppliedLeaveDetailPage from './src/Leave Management/appliedLeaveDetailPage';
  import ApplyLeave from './src/Leave Management/Apply-Leave';
  import App2 from './src/app2';
  import EmployeeDrawerNavigator from './src/EmployeeDrawerNavigator';
  import Logo from './src/Image/logo.png';
  import SideMenu from './src/SideMenu';
  // const MainNavigator = createStackNavigator({
  //   login: {screen: LoginPage},
  //   welcome: {screen: Welcomepage},
  //   cameraPage: {screen: CameraPage},
  //   monthlyreport: {screen: Monthlyreport},
  //   ShowMonthlyReport: {screen: ShowMonthlyReport},
  //   Flat: {screen: Flat},
  //   CheckOut: {screen: Checkoutpage},
  // });
  //
  // const App = createAppContainer(MainNavigator);
  //   export default App;

  class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer

    constructor(props){
    super(props)
    this.state={

                permissions:[],
                language_sec:[],
                }
           }

    componentDidMount(){
  const {permissions} = this.state;
  this.value().done();

  }

    value=async()=>{

      var user_token= await AsyncStorage.getItem('user_token');
      var permissions_fir= JSON.parse(user_token);
      var permissions_sec=permissions_fir.success.user.permissions;

      this.setState({permissions:permissions_sec});
    }
    toggleDrawer = () => {
      //Props to open/close the drawer
       this.props.navigationProps.toggleDrawer();

    };
    render() {
  const {permissions,language_sec} = this.state;
   const context=this;
      return (
        <View style={{ flexDirection: 'row',width:'100%'}}>

          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                      {/*Donute Button Image */}
                      <Image
                        source={require('./src/Image/menu.png')}
                        style={{ width: 35, height: 35, marginLeft: 10 }}
                      />
                    </TouchableOpacity>
        </View>
      );
    }
  }
  class Navi extends Component {
    //Structure for the navigatin Drawer

    render() {

      return (
        <View style={{ flexDirection: 'row',width:'100%'}}>

          <Text>hashf</Text>

        </View>
      );
    }
  }

  const FirstActivity_StackNavigator = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    login: {screen: LoginPage},
    First: {screen: Welcomepage},
    cameraPage: {screen: CameraPage},
    monthlyreport: {screen: Monthlyreport},
    ShowMonthlyReport: {screen: ShowMonthlyReport},
    Flat: {screen: Flat},
    CheckOut: {screen: Checkoutpage},
    Permission: {screen: Permission},
    CustomSidebarMenu: {screen: CustomSidebarMenu},
    Leaves: {screen: Leaves},
    SelfAttendanceDetail: {screen: SelfAttendanceDetail},
  AppliedLeaveDetailPage: {screen: AppliedLeaveDetailPage},
  LeaveSection: {screen: LeaveSection},
  Task: {screen: Task},
  LogOutPage: {screen: LogOutPage},

   
  });


  const Screen3_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here

    Third: {
      screen: Monthlyreport,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>My Attendance</Text></View>,

        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'200%'
                         },
      }),

    },
  });

  const Screen4_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    fourth: {
      screen: Leaves,
      navigationOptions: ({ navigation }) => ({

        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>Employee Attendance</Text></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'140%'
                         },
      }),
    },
  });

  const Screen5_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    fifth: {
      screen: AttendanceDetail,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>Team Attendance</Text></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'150%'
                         },
      }),
    },
  });
  const Screen6_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    sixth: {
      screen: LeaveSection,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>Applied Leaves List</Text></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'150%'
                         },
      }),
    },
  });
  const Screen7_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    seventh: {
      screen: ApplyLeave,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>Apply Leaves</Text></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#0080FF',
          borderBottomColor: '#b3b3b3',
          borderBottomWidth: 3,
          height:80,
          width:'90%',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
                           justifyContent:'center',
                           textAlign:'center',
                           fontWeight: 'bold',
                           width:'200%'
                         },
      }),
    },
  });
  const Screen8_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    eight: {
      screen: LogOutPage,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Image source={Logo} style={{height:50,width:200,marginTop:20,}}/></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'150%'
                         },
      }),
    },
  });

  const Screen9_StackNavigator = createStackNavigator({
    //All the screen from the Screen3 will be indexed here
    ninth: {
      screen: Task,
      navigationOptions: ({ navigation }) => ({
        title:null,
        headerBackground:<View style={{backgroundColor: '#0080FF',alignItems:'center',justifyContent:'center',height:80}}><Text style={{fontSize:25,color:'white',fontWeight: 'bold',}}>Task Manager</Text></View>,
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
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
                           width:'150%'
                         },
      }),
    },
  });
  const DrawerNavigatorExample = createDrawerNavigator({
    //Drawer Optons and indexing

    Screen1: {
      //Title

      screen: FirstActivity_StackNavigator,

      navigationOptions: {
        headerStyle: {
          backgroundColor: '#0080FF',
          width:'20%'
        },
        drawerLabel: ({ focused, tintColor }) => (
          <View style={{top:0}}>

             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Home</Text>

             <Image
               source={require('./src/Image/home.png')}
               style={{ width: 25, height: 25, left: 10,bottom:23 }}
             />
          </View>
        )
      },
    },

    Screen3: {
      //Title

      screen: Screen3_StackNavigator,
      navigationOptions: {
        drawerLabel: ({ focused, tintColor }) => (

          <View style={{top:0}}>
             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>My Attendance</Text>
             <Image
               source={require('./src/Image/attendance.png')}
               style={{ width: 28, height: 25, left: 10,bottom:23 }}
             />

          </View>
        )
      }
    },

    Screen4: {
      //Title
      screen: Screen4_StackNavigator,

      navigationOptions: {
        drawerLabel: ({ focused, tintColor }) => (
          <View style={{top:0}}>
             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Employee Attendance</Text>
             <Image
               source={require('./src/Image/department.png')}
               style={{ width: 30, height: 30, left: 10,bottom:23 }}
             />
          </View>
        )
      }
    },

    Screen5: {
      //Title
       title:<Navi/>,
      screen: Screen5_StackNavigator,
      navigationOptions: {
        drawerLabel: ({ focused, tintColor }) => (
          <View>
             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Team Attendance</Text>
             <Image
               source={require('./src/Image/partner.png')}
               style={{ width: 30, height: 30, left: 10,bottom:23 }}
             />
          </View>
        )
      }
    },
    Screen8: {
      //Title
       // title:<Navi/>,
      screen: Screen8_StackNavigator,
      navigationOptions: {
        drawerLabel: ({ focused, tintColor }) => (
          <View>
             <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,textShadowColor:'black',fontWeight: 'bold'}}>Log Out</Text>
             <Image
               source={require('./src/Image/log_out.png')}
               style={{ width: 25, height: 25, left: 10,bottom:23 }}
             />
          </View>
        )
      }

    },


   Screen6: {
     //Title

     screen: Screen6_StackNavigator,
     navigationOptions: {
       drawerLabel: ({ focused, tintColor }) => (
         <View style={{top:0}}>

            <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Applied Leaves</Text>
            <Image
              source={require('./src/Image/partner.png')}
              style={{ width: 30, height: 30, left: 10,bottom:23 }}
            />

         </View>
       )
     }
   },

  Screen7: {
    //Title

    screen: Screen7_StackNavigator,
    navigationOptions: {
      drawerLabel: ({ focused, tintColor }) => (
        <View style={{top:0}}>

           <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>Apply Leave</Text>
           <Image
             source={require('./src/Image/partner.png')}
             style={{ width: 30, height: 30, left: 10,bottom:23 }}
           />

        </View>
      )
    }
  },
  Screen9: {
    //Title

    screen: Screen9_StackNavigator,
    navigationOptions: {
      drawerLabel: ({ focused, tintColor }) => (
        <View style={{top:0}}>

           <Text  style={{top:13,fontSize: 18,left:35,color:'rgb(19,111,232)',margin:10,fontWeight: 'bold',}}>My Task</Text>
           <Image
             source={require('./src/Image/partner.png')}
             style={{ width: 30, height: 30, left: 10,bottom:23 }}
           />

        </View>
      )
    }
  },
  },
  {
    contentComponent: ExpandableViewSeparate,
    drawerWidth: Dimensions.get('window').width - 120,
  }
  // {
  //     //For the Custom sidebar menu we have to provide our CustomSidebarMenu
  //        contentComponent: CustomSidebarMenu,
  //
  //        drawerHeight:'20%'
  //     //Sidebar width
  //
  //   }

  );
  export default createAppContainer(DrawerNavigatorExample);
