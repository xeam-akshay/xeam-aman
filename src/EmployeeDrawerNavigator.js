// import * as React from 'react';
// import {
//   AsyncStorage,
//   StyleSheet,
//   KeyboardAvoidingView,
//   View,
//   TextInput,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image,
//   AppRegistry,
//   Text,
//   Dimensions,
//   Picker
// } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { NavigationContainer,DrawerActions } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import ExpandableViewSeparate from './ExpandableViewSeparate';
// import Attendance from './Attendance_first';
// import LoginPage from './LoginPage';
// import Welcomepage from './Dash Board/Welcomepage';
// import CameraPage from './Attendance Module/CameraPage';
// import Drawer from './drawer';
// import DashBoard from './DashBoard';
// import Monthlyreport from './Attendance Management/My_Attendance';
// import ShowMonthlyReport from './ShowMonthlyReport';
// import Flat from './flatlist';
// import Checkoutpage from './Attendance Module/checkOutPage';
// import Leaves from './Attendance Management/Employee_Attendance';
// import Task from './Task Management/Task';
// import Permission from './permissions';
// import CustomSidebarMenu from './CustomSideBarMenu';
// import AttendanceDetail from './Attendance Management/Team_Attendance';
// import SelfAttendanceDetail from './self_attendance_detail';
// import App from '../App';
// import Hay from './hayPage';
// import LeaveSection from './Leave Management/Applied_Leave';
// import LogOutPage from './LogOutPage';
// import AppliedLeaveDetailPage from './Leave Management/appliedLeaveDetailPage';
// import Approve_leaves_detail_page from './Leave Management/Approve_leaves_detail_page';
// import ApplyLeave from './Leave Management/Apply-Leave';
// import Approve_leave from './Leave Management/Approve_leave';
// import taskWithComment from './Task Management/taskWithComment';
// import add_task from './Task Management/Add task';
// import task_self_team from './Task Management/assignTask_self_team';
// import taskOverViewComment from './Task Management/task_overview_comment_screen';
// import taskOverViewUpdate from './Task Management/task_overview_update_screen';
// import taskOverViewHistory from './Task Management/task_overview_history_screen';
// import taskOverViewComment_sec from './Task Management/task_overview_comment_screen_sec';
// import taskOverViewUpdate_sec from './Task Management/task_overview_update_screen_sec';
// import taskOverViewHistory_sec from './Task Management/task_overview_history_screen_sec';
// import TaskDateExtension from './Task Management/request date extension';
// import Create_Lead from './create_lead';
// import Lead_list from './Lead management/Leads list'
// import ListOfLead from './Lead management/List of leads'
// import View_lead from './Lead management/View lead';
// import CreateLead from './Lead management/CreateLead'
// import AssignedLeads from './Lead management/AssignedLeads'
// import ViewLead from './Lead management/ViewLead'
// import LeadComments from './Lead management/LeadComments'
// import LeadEdit from './Lead management/LeadEdit'
// import CreatedLeads from './Lead management/CreatedLeads'
// import RecommendedViewLead from './Lead management/RecommendedViewLead'
// import RecommendedLead from './Lead management/RecommendedLead'
// import UnassignedLeads from './Lead management/UnassignedLeads'
// import MDViewLead from './Lead management/MDViewLead'
// import Approval_date_Extension_List from './Task Management/Approval date Extension List';
// import Requested_date_Extension_List from './Task Management/Requested date extension list';
// import ChangeTaskList from './Task Management/Change task title'
// import Task_report from './Task Management/Task report';
// import Leave_balance from './Leave_balance';
// import One from './one';
// import AchievedTarget from './Target/AchievedTarget';
// import CreateTarget from './Target/CreateTarget';
// import Report from './Target/Report';
// import TeamReport from './Target/TeamReport';
// import EditTarget from './Target/EditTarget';
// import ClickPicture from '../src/Components/ClickPicture'
// import EditAchievedTarget from './Target/EditAchievedTarget';
// import LocationTracker from './Target/LocationTracker';
// import SavedLocations from './Target/SavedLocations';
// import AdminTracker from './Target/AdminTracker';
// import UnsavedTracks from './Target/UnsavedTracks';
// import TestScreen from './test/Test';

//  const Stack = createStackNavigator();
//  const Open = createDrawerNavigator();
//  let user = null;
//  let empCode = null;

// function getExpandableView(props){
//   let customVar = {
  
//     customVariable: 1
//   }
//     //console.log("*****KULBIR is TESTING: ", props)
     
//     getAsyncData((employer, code) => {
//       if(employer){
//         //console.log("BACK TO FUNCTION: ", employer)
//         user = employer;
//         empCode = code
//         //console.log("USER ACQUIRED: ", employer, "EMPCODE: ", empCode)
//       }
//     });

//     return (
//         <ExpandableViewSeparate navObj={props.navigation} abc={customVar.customVariable} employer={user} code={empCode}/>
//       );
// };

// const getAsyncData = async(callback) => {
//   const user_token = await AsyncStorage.getItem('user_token');
//   if(user_token){
//     console.log("USER_TOKEN: ", user_token)
//     const permissions_fir= JSON.parse(user_token);
//     //console.log("ASYNC DATA: ", permissions_fir.success.project)
//     //console.log("USER ID: ", permissions_fir.success.user.employee_code)
//     callback(permissions_fir.success.project, permissions_fir.success.user.employee_code)
//   }
// }

// function CustomDrawerContent(props) {
//     return (
//       <View>
//         {getExpandableView(props)}
//       </View>
//     );
//     {/*<DrawerContentScrollView {...props}>
//         {getExpandableView(props)}
//       </DrawerContentScrollView>*/}
//   }
//   export default class MeriApp extends React.Component {
    
//     render() {
      
//   return (

//     <NavigationContainer>

//     <Open.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
//     {/* screens */}
//     <Open.Screen name="login" component={LoginPage} />
//     <Open.Screen name="First" component={Welcomepage} />
//     <Open.Screen name="cameraPage" component={CameraPage} />
//     <Open.Screen name="MyAttendance" component={Monthlyreport} />
//     <Open.Screen name="ShowMonthlyReport" component={ShowMonthlyReport} />
//     <Open.Screen name="Flat" component={Flat} />
//     <Open.Screen name="CheckOut" component={Checkoutpage} />
//     <Open.Screen name="Permission" component={Permission} />
//     <Open.Screen name="CustomSidebarMenu" component={CustomSidebarMenu} />
//     <Open.Screen name="VerifyAttendance" component={Leaves} />
//     <Open.Screen name="SelfAttendanceDetail" component={SelfAttendanceDetail} />
//     <Open.Screen name="AppliedLeaveDetailPage" component={AppliedLeaveDetailPage} />
//     <Open.Screen name="Approve_leaves_detail_page" component={Approve_leaves_detail_page} />
//     <Open.Screen name="MyTask" component={Task} />
//     <Open.Screen name="CreatedTasks" component={task_self_team} />
//     <Open.Screen name="LogOutPage" component={LogOutPage} />
//     <Open.Screen name="AttendanceSheet" component={AttendanceDetail} />
//     <Open.Screen name="AppliedLeaves" component={LeaveSection} />
//     <Open.Screen name="ApprovesLeaves" component={Approve_leave} />
//     <Open.Screen name="ApplyForLeave" component={ApplyLeave} />
//     <Open.Screen name="taskWithComment" component={taskWithComment} />
//     <Open.Screen name="AddTask" component={add_task} />
//     <Open.Screen name="RequestDateExtension" component={TaskDateExtension} />
//     <Open.Screen name="ApproveDateExtensions" component={Approval_date_Extension_List} /> 
//     <Open.Screen name="RequestedDateExtension" component={Requested_date_Extension_List} />
//     <Open.Screen name="Change_task_list" component={ChangeTaskList} />
//     <Open.Screen name="TaskReport" component={Task_report} />
//     <Open.Screen name="taskOverViewComment" component={taskOverViewComment} />
//     <Open.Screen name="taskOverViewUpdate" component={taskOverViewUpdate} />
//     <Open.Screen name="taskOverViewHistory" component={taskOverViewHistory} />
//     <Open.Screen name="taskOverViewComment_sec" component={taskOverViewComment_sec} />
//     <Open.Screen name="taskOverViewUpdate_sec" component={taskOverViewUpdate_sec} />
//     <Open.Screen name="taskOverViewHistory_sec" component={taskOverViewHistory_sec} />
//     <Open.Screen name="Create_Lead" component={Create_Lead} />
//     <Open.Screen name="CreatedLeads" component={CreatedLeads} />
//     <Open.Screen name="AssignedLeads" component={AssignedLeads} />
//     <Open.Screen name="RecommendedLead" component={RecommendedLead} /> 
//     <Open.Screen name="MDViewLead" component={MDViewLead} />
//     <Open.Screen name="ViewLead" component={ViewLead} />
//     <Open.Screen name="Lead list" component={Lead_list} />
//     <Open.Screen name="List of lead" component={ListOfLead} />
//     <Open.Screen name="View_lead" component={View_lead} />
//     <Open.Screen name="LeadComments" component={LeadComments} />
//     <Open.Screen name="LeadEdit" component={LeadEdit} />
//     <Open.Screen name="CreateLead" component={CreateLead} />
//     <Open.Screen name="RecommendedViewLead" component={RecommendedViewLead} />
//     <Open.Screen name="UnassignedLeads" component={UnassignedLeads} />
//     <Open.Screen name="ExpandableViewSeparate" component={ExpandableViewSeparate} />
//     <Open.Screen name="Leave_balance" component={Leave_balance} />
//     <Open.Screen name="CreateTarget" component={CreateTarget} />
//     <Open.Screen name="EditTarget" component={EditTarget} />
//     <Open.Screen name="AchievedTarget" component={AchievedTarget} />
//     <Open.Screen name="EditAchievedTarget" component={EditAchievedTarget} />
//     <Open.Screen name="ReportLog" component={Report} />
//     <Open.Screen name="TeamReport" component={TeamReport} />
//     <Open.Screen name="ClickPicture" component={ClickPicture} />
//     <Open.Screen name="LocationTracker" component={LocationTracker} />
//     <Open.Screen name="SavedLocations" component={SavedLocations} />
//     <Open.Screen name="AdminTracker" component={AdminTracker} />
//     <Open.Screen name="UnsavedTracks" component={UnsavedTracks} />
//     <Open.Screen name="TestScreen" component={TestScreen} />
//     <Open.Screen name="One" component={One} />
    
    
//     </Open.Navigator>
//     </NavigationContainer>
//   );
// }
// }
