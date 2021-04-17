import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Scene, Router, Drawer, Actions} from 'react-native-router-flux';
import LoginPage from './LoginPage';
import LogOutPage from './LogOutPage';
import WelcomePage from './Dash Board/Welcomepage';
import CameraPage from './Attendance Module/CameraPage';
import Checkoutpage from './Attendance Module/checkOutPage';
import ExpandableViewSeparate from './ExpandableViewSeparate';
import Monthlyreport from './Attendance Management/My_Attendance';
import AttendanceDetail from './Attendance Management/Team_Attendance';
import Leaves from './Attendance Management/Employee_Attendance';
import ApplyLeave from './Leave Management/Apply-Leave';
import LeaveSection from './Leave Management/Applied_Leave';
import AppliedLeaveDetailPage from './Leave Management/appliedLeaveDetailPage';
import Approve_leave from './Leave Management/Approve_leave';
import add_task from './Task Management/Add task';
import task_self_team from './Task Management/assignTask_self_team';
import Approval_date_Extension_List from './Task Management/Approval date Extension List';
import Task from './Task Management/Task';
import TaskDateExtension from './Task Management/request date extension';
import Requested_date_Extension_List from './Task Management/Requested date extension list';
import taskOverViewComment from './Task Management/task_overview_comment_screen';
import taskOverViewUpdate from './Task Management/task_overview_update_screen';
import taskOverViewHistory from './Task Management/task_overview_history_screen';
import taskOverViewComment_sec from './Task Management/task_overview_comment_screen_sec';
import taskOverViewUpdate_sec from './Task Management/task_overview_update_screen_sec';
import taskOverViewHistory_sec from './Task Management/task_overview_history_screen_sec';
import CreateNewLead from './Lead/CreateNewLead';
import CreatedLeads from './Lead/CreatedLeads';
import ViewLead from './Lead/ViewLead';
//import CreateLead from './Lead management/CreateLead';
//import CreatedLeads from './Lead management/CreatedLeads';
import ListOfLead from './Lead management/List of leads';
//import ViewLead from './Lead management/ViewLead';
import LeadComments from './Lead management/LeadComments';
import LeadEdit from './Lead management/LeadEdit';
import UnassignedLeads from './Lead management/UnassignedLeads';
import AssignedLeads from './Lead management/AssignedLeads';
import RecommendedLead from './Lead management/RecommendedLead';
import RecommendedViewLead from './Lead management/RecommendedViewLead';
import MDViewLead from './Lead management/MDViewLead';
import CreateTarget from './Target/CreateTarget';
import EditTarget from './Target/EditTarget';
import AchievedTarget from './Target/AchievedTarget';
import EditAchievedTarget from './Target/EditAchievedTarget';
import Report from './Target/Report';
import TeamReport from './Target/TeamReport';
import LocationTracker from './Target/LocationTracker';
import UnsavedTracks from './Target/UnsavedTracks';
import SavedLocations from './Target/SavedLocations';
import AdminTracker from './Target/AdminTracker';
import HolidaysList from './AartiFiles/Holidays/HolidaysList';
import SalarySlip from './AartiFiles/SalarySlip/SalarySlip';
import TestScreen from './test/Test';
import CameraScreen from './Attendance Module/CameraScreen';
import {getWidthnHeight} from './KulbirComponents/common';
import Pre_Approval_Form from './Manage-Travel/Pre-Approval-Form';
import Travel_Approvals from './Manage-Travel/Travel-Approvals';
import Claim_Requests from './Manage-Travel/Claim-Requests';
import View_Travel from './Manage-Travel/View-Travel';
import Claim_Form_Travel from './Manage-Travel/Claim-Form-Travel';
import View_claim from './Manage-Travel/View-claim';

class RouterComponent extends Component{
    render(){
    const {width} = getWidthnHeight(80);
    console.log("ROUTER DRAWER WIDTH: ", width)

    return (
        <Router>
            <Scene key="root" hideNavBar>
                <Scene key="auth" headerMode="none">
                    {/*===========LOGIN PAGE===========*/}
                    <Scene key="login" component={LoginPage} options={{swipeEnabled: false}}/>
                </Scene>
                
                {/*===========DRAWER MENU===========*/}
                <Drawer hideNavBar key="drawerMenu" drawerPosition="left" drawerWidth={width} contentComponent={ExpandableViewSeparate} >
                <Scene key="main" hideNavBar drawerLockMode='unlocked' >
                    

                    {/*===========WELCOME PAGE===========*/}
                    <Scene key="First" component={WelcomePage} initial={true} hideNavBar/>

                    {/*===========CHECK IN and CHECK OUT===========*/}
                    <Scene key="cameraPage" component={CameraPage} hideNavBar/>
                    <Scene key="CheckOut" component={Checkoutpage} hideNavBar/>

                    {/*===========ATTENDANCE MANAGEMENT===========*/}
                    <Scene key="MyAttendance" component={Monthlyreport} hideNavBar/>
                    <Scene key="AttendanceSheet" component={AttendanceDetail} hideNavBar/>
                    <Scene key="VerifyAttendance" component={Leaves} hideNavBar headerMode="none"/>

                    {/*===========CAMERA SCREEN===========*/}
                    <Scene key="camera" component={CameraScreen} hideNavBar hideNavBar headerMode="none"/>

                    {/*===========LEAVES MANAGEMENT===========*/}
                    <Scene key="ApplyForLeave" component={ApplyLeave} hideNavBar headerMode="none"/>
                    <Scene key="AppliedLeaves" component={LeaveSection} hideNavBar headerMode="none"/>
                    <Scene key="AppliedLeaveDetailPage" component={AppliedLeaveDetailPage} />
                    <Scene key="ApprovesLeaves" component={Approve_leave} hideNavBar headerMode="none"/>

                    {/*===========TASK MANAGEMENT===========*/}
                    <Scene key="AddTask" component={add_task} hideNavBar headerMode="none"/>
                    <Scene key="CreatedTasks" component={task_self_team} hideNavBar headerMode="none"/>
                    <Scene key="ApproveDateExtensions" component={Approval_date_Extension_List} hideNavBar headerMode="none"/>
                    <Scene key="MyTask" component={Task} hideNavBar headerMode="none"/> 
                    <Scene key="RequestDateExtension" component={TaskDateExtension} hideNavBar headerMode="none"/>
                    <Scene key="RequestedDateExtension" component={Requested_date_Extension_List} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewComment" component={taskOverViewComment} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewUpdate" component={taskOverViewUpdate} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewHistory" component={taskOverViewHistory} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewComment_sec" component={taskOverViewComment_sec} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewUpdate_sec" component={taskOverViewUpdate_sec} hideNavBar headerMode="none"/>
                    <Scene key="taskOverViewHistory_sec" component={taskOverViewHistory_sec} hideNavBar headerMode="none"/>

                    {/*===========NEW LEAD===========*/}
                    <Scene key="CreateNewLead" component={CreateNewLead} hideNavBar headerMode="none"/>
                    <Scene key="CreatedLeads" component={CreatedLeads} hideNavBar headerMode="none"/>
                    <Scene key="ViewLead" component={ViewLead} hideNavBar headerMode="none"/>

                    {/*===========LEAD MANAGEMENT===========*/}
                    {/* {<Scene key="CreateLead" component={CreateLead} hideNavBar headerMode="none"/>} */}
                    {/* {<Scene key="CreatedLeads" component={CreatedLeads} hideNavBar headerMode="none"/>} */}
                    <Scene key="List of lead" component={ListOfLead} hideNavBar headerMode="none"/>
                    {/* {<Scene key="ViewLead" component={ViewLead} hideNavBar headerMode="none"/>} */}
                    <Scene key="LeadComments" component={LeadComments} hideNavBar headerMode="none"/>
                    <Scene key="LeadEdit" component={LeadEdit} hideNavBar headerMode="none"/>
                    <Scene key="UnassignedLeads" component={UnassignedLeads} hideNavBar headerMode="none"/>
                    <Scene key="AssignedLeads" component={AssignedLeads} hideNavBar headerMode="none"/>
                    <Scene key="RecommendedLead" component={RecommendedLead} hideNavBar headerMode="none"/>
                    <Scene key="RecommendedViewLead" component={RecommendedViewLead} hideNavBar headerMode="none"/> 
                    <Scene key="MDViewLead" component={MDViewLead} hideNavBar headerMode="none"/>

                    {/*===========TARGET===========*/}
                    <Scene key="CreateTarget" component={CreateTarget} hideNavBar headerMode="none"/>
                    <Scene key="EditTarget" component={EditTarget} hideNavBar headerMode="none"/>
                    <Scene key="AchievedTarget" component={AchievedTarget} hideNavBar headerMode="none"/>
                    <Scene key="EditAchievedTarget" component={EditAchievedTarget} hideNavBar headerMode="none"/>
                    <Scene key="ReportLog" component={Report} hideNavBar headerMode="none"/>
                    <Scene key="TeamReport" component={TeamReport} hideNavBar headerMode="none"/>

                    {/*===========LOCATION TRACKER===========*/}
                    <Scene key="LocationTracker" component={LocationTracker} hideNavBar headerMode="none" />
                    <Scene key="UnsavedTracks" component={UnsavedTracks} hideNavBar headerMode="none"/>
                    <Scene key="SavedLocations" component={SavedLocations} hideNavBar headerMode="none"/>
                    <Scene key="AdminTracker" component={AdminTracker} hideNavBar headerMode="none"/>

                    {/*===========AARTI DRUGS HOLIDAYS LIST===========*/}
                    <Scene key="HolidaysList" component={HolidaysList} hideNavBar headerMode="none"/>

                    {/*===========AARTI DRUGS SALARY SLIP===========*/}
                    <Scene key="SalarySlip" component={SalarySlip} hideNavBar headerMode="none"/>

                    {/*===========TEST SCREEN===========*/}
                    <Scene key="TestScreen" component={TestScreen} />

                    {/*===========Manage Travel===========*/}
                    <Scene key="Pre_Approval_Form" component={Pre_Approval_Form} hideNavBar headerMode="none"/>
                    <Scene key="Travel_Approvals" component={Travel_Approvals} hideNavBar headerMode="none"/>
                    <Scene key="Claim_Requests" component={Claim_Requests} hideNavBar headerMode="none"/>
                    <Scene key="View_Travel" component={View_Travel} hideNavBar headerMode="none"/>
                    <Scene key="Claim_Form_Travel" component={Claim_Form_Travel} hideNavBar headerMode="none"/>
                    <Scene key="View_claim" component={View_claim} hideNavBar headerMode="none"/>
                    {/*===========LOGOUT PAGE===========*/}
                    <Scene key="LogOutPage" component={LogOutPage}/>
                </Scene>
                </Drawer>
            </Scene>
        </Router>
        );
    }
};

const mapStateToProps = (state) => {
    console.log("*****MAP STATE TO PROPS: ", state.props)
    return {data: state.props}
}

export default connect(mapStateToProps)(RouterComponent); 
//export default RouterComponent; 