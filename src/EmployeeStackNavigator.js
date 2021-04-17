import * as React from 'react';
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
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExpandableViewSeparate from '../src/ExpandableViewSeparate';
import Attendance from '../src/Attendance_first';
import EmployeeDrawerNavigator from './EmployeeDrawerNavigator';
import LoginPage from '../src/LoginPage';
import Welcomepage from '../src/Welcomepage';
import CameraPage from '../src/CameraPage';
import Drawer from '../src/drawer';
import DashBoard from '../src/DashBoard';
import Monthlyreport from '../src/Monthlyreport';
import ShowMonthlyReport from '../src/ShowMonthlyReport';
import Flat from '../src/flatlist';
import Checkoutpage from '../src/checkOutPage';
import Leaves from '../src/leaves';
import Task from '../src/Task';
import Permission from '../src/permissions';
import CustomSidebarMenu from '../src/CustomSideBarMenu';
import AttendanceDetail from '../src/attendance-detail';
import SelfAttendanceDetail from '../src/self_attendance_detail';
import App from '../App';
import Hay from '../src/hayPage';
import LeaveSection from '../src/LeaveSection';
import LogOutPage from '../src/LogOutPage';
import AppliedLeaveDetailPage from '../src/appliedLeaveDetailPage';
import Approve_leaves_detail_page from '../src/Approve_leaves_detail_page';
import ApplyLeave from '../src/Apply-Leave';
import Approve_leave from '../src/Approve_leave';
import taskWithComment from '../src/taskWithComment';
import add_task from '../src/Add task';
import task_self_team from '../src/assignTask_self_team';
import taskOverViewComment from '../src/task_overview_comment_screen';
import taskOverViewUpdate from '../src/task_overview_update_screen';
import taskOverViewHistory from '../src/task_overview_history_screen';
import taskOverViewComment_sec from '../src/task_overview_comment_screen_sec';
import taskOverViewUpdate_sec from '../src/task_overview_update_screen_sec';
import taskOverViewHistory_sec from '../src/task_overview_history_screen_sec';
import Create_Lead from '../src/create_lead';
import View_Lead from '../src/View_Lead';
import Leave_balance from '../src/Leave_balance';
import One from '../src/one';
 const Stack = createStackNavigator();
 const Open = createDrawerNavigator();


function getExpandableView(props){
  let customVar = {
  
    customVariable: 1
  }
 
    return (
        <ExpandableViewSeparate navObj={props.navigation} abc={customVar.customVariable}/>
      );
};
function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        {getExpandableView(props)}
        
      </DrawerContentScrollView>
    );
  }
  export default class MeriApp extends React.Component {
    toggleDrawer = () => {
      //Props to open/close the drawer
      const context=this;
       navigation.dispatch(DrawerActions.openDrawer());


    };
    
    render() {
      stacknai = () =>
        <Stack.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
       
        <Stack.Screen name="First" component={Welcomepage}
        options={({ navigation }) => ({
          headerLeft: (props) => {
            return(
            <View>


            </View>)
          }
        })}/>
         <Stack.Screen name="cameraPage" component={CameraPage} />
        </Stack.Navigator>


  return (

    <NavigationContainer>

    <Stack.Navigator >
    {/* screens */}
    <Stack.Screen name="login" component={LoginPage} />
    <Stack.Screen name="First" component={Welcomepage} />
    
    </Stack.Navigator>
    </NavigationContainer>
  );
}
}
