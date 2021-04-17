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
import LoginPage from '../src/LoginPage';
import Welcomepage from '../src/Dash Board/Welcomepage';
import CameraPage from '../src/Attendance Module/CameraPage';
import Drawer from '../src/drawer';
import DashBoard from '../src/DashBoard';
import Monthlyreport from './Attendance Management/My_Attendance';
import ShowMonthlyReport from '../src/ShowMonthlyReport';
import Flat from '../src/flatlist';
import Checkoutpage from '../src/Attendance Module/checkOutPage';
import Leaves from './Attendance Management/Employee_Attendance';
import Task from '../src/Task';
import Permission from '../src/permissions';
import CustomSidebarMenu from '../src/CustomSideBarMenu';
import AttendanceDetail from './Attendance Management/Team_Attendance';
import SelfAttendanceDetail from '../src/self_attendance_detail';
import App from '../App';
import Hay from '../src/hayPage';
import LeaveSection from './Leave Management/Applied_Leave';
import LogOutPage from '../src/LogOutPage';
import AppliedLeaveDetailPage from '../src/appliedLeaveDetailPage';
import Approve_leaves_detail_page from '../src/Approve_leaves_detail_page';
import ApplyLeave from './Leave Management/Apply-Leave';
import Approve_leave from './Leave Management/Approve_leave';
import taskWithComment from '../src/taskWithComment';
import add_task from '../src/Task Management/Add task';
import task_self_team from '../src/assignTask_self_team';
import taskOverViewComment from '../src/task_overview_comment_screen';
import taskOverViewUpdate from '../src/task_overview_update_screen';
import taskOverViewHistory from '../src/task_overview_history_screen';
import taskOverViewComment_sec from '../src/task_overview_comment_screen_sec';
import taskOverViewUpdate_sec from '../src/task_overview_update_screen_sec';
import taskOverViewHistory_sec from '../src/task_overview_history_screen_sec';
import Create_Lead from './create_lead';
import Lead_list from './Lead management/Leads list'
import View_lead from './Lead management/View lead';
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

    <Open.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    {/* screens */}
    <Open.Screen name="login" component={LoginPage} />
    <Open.Screen name="First" component={Welcomepage} />
    <Open.Screen name="cameraPage" component={CameraPage} />
    <Open.Screen name="Third" component={Monthlyreport} />
    <Open.Screen name="ShowMonthlyReport" component={ShowMonthlyReport} />
    <Open.Screen name="Flat" component={Flat} />
    <Open.Screen name="CheckOut" component={Checkoutpage} />
    <Open.Screen name="Permission" component={Permission} />
    <Open.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
    <Open.Screen name="Leaves" component={Leaves} />
    <Open.Screen name="SelfAttendanceDetail" component={SelfAttendanceDetail} />
    <Open.Screen name="AppliedLeaveDetailPage" component={AppliedLeaveDetailPage} />
    <Open.Screen name="Approve_leaves_detail_page" component={Approve_leaves_detail_page} />
    <Open.Screen name="Task" component={Task} />
    <Open.Screen name="task_self_team" component={task_self_team} />
    <Open.Screen name="LogOutPage" component={LogOutPage} />
    <Open.Screen name="AttendanceDetail" component={AttendanceDetail} />
    <Open.Screen name="LeaveSection" component={LeaveSection} />
    <Open.Screen name="Approve_leave" component={Approve_leave} />
    <Open.Screen name="ApplyLeave" component={ApplyLeave} />
    <Open.Screen name="taskWithComment" component={taskWithComment} />
    <Open.Screen name="add_task" component={add_task} />
    <Open.Screen name="taskOverViewComment" component={taskOverViewComment} />
    <Open.Screen name="taskOverViewUpdate" component={taskOverViewUpdate} />
    <Open.Screen name="taskOverViewHistory" component={taskOverViewHistory} />
    <Open.Screen name="taskOverViewComment_sec" component={taskOverViewComment_sec} />
    <Open.Screen name="taskOverViewUpdate_sec" component={taskOverViewUpdate_sec} />
    <Open.Screen name="taskOverViewHistory_sec" component={taskOverViewHistory_sec} />
    <Open.Screen name="Create_Lead" component={Create_Lead} />
    <Open.Screen name="Lead list" component={Lead_list} />
    <Open.Screen name="View_lead" component={View_lead} />
    <Open.Screen name="ExpandableViewSeparate" component={ExpandableViewSeparate} />
    <Open.Screen name="Leave_balance" component={Leave_balance} />
    
    <Open.Screen name="One" component={One} />
    
    
    </Open.Navigator>
    </NavigationContainer>
  );
}
}
